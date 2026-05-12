import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ASSETS_DIR = path.join(ROOT, 'src', 'assets')
const SKIP_DIRS = ['design'] // reference images, not shipped
const SKIP_FILES = ['LOGO.png'] // small, lossless logo

const MAX_WIDTH = 1920
const JPEG_QUALITY = 78
const PNG_QUALITY = 80

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    if (e.isDirectory()) {
      if (SKIP_DIRS.includes(e.name)) continue
      files.push(...await walk(path.join(dir, e.name)))
    } else if (/\.(png|jpe?g)$/i.test(e.name) && !SKIP_FILES.includes(e.name)) {
      files.push(path.join(dir, e.name))
    }
  }
  return files
}

async function compressImage(file) {
  const ext = path.extname(file).toLowerCase()
  const input = await fs.readFile(file)
  const before = input.length

  let pipeline = sharp(input).resize({
    width: MAX_WIDTH,
    withoutEnlargement: true,
    fit: 'inside',
  })

  if (ext === '.png') {
    pipeline = pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  }

  const output = await pipeline.toBuffer()
  const rel = path.relative(ROOT, file).replace(/\\/g, '/')

  if (output.length < before * 0.95) {
    await fs.writeFile(file, output)
    const savedKB = ((before - output.length) / 1024).toFixed(0)
    const pct = ((1 - output.length / before) * 100).toFixed(0)
    console.log(`✓ ${rel}: ${(before/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB (-${pct}%, saved ${savedKB}KB)`)
    return before - output.length
  } else {
    console.log(`· ${rel}: skip (already small enough)`)
    return 0
  }
}

const files = await walk(ASSETS_DIR)
console.log(`Found ${files.length} images to check...\n`)

let totalSaved = 0
for (const f of files) {
  try {
    totalSaved += await compressImage(f)
  } catch (err) {
    console.error(`✗ ${path.relative(ROOT, f)}: ${err.message}`)
  }
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`)
