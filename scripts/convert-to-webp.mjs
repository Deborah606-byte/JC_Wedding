import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ASSETS_DIR = path.join(ROOT, 'src', 'assets')
const SKIP_DIRS = ['design']
const SKIP_FILES = ['LOGO.png']

const MAX_WIDTH = 1920
const WEBP_QUALITY = 80

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

async function convertToWebp(file) {
  const input = await fs.readFile(file)
  const before = input.length
  const dest = file.replace(/\.(png|jpe?g)$/i, '.webp')

  const output = await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: WEBP_QUALITY, effort: 6 })
    .toBuffer()

  await fs.writeFile(dest, output)
  await fs.unlink(file)

  const rel = path.relative(ROOT, dest).replace(/\\/g, '/')
  const pct = ((1 - output.length / before) * 100).toFixed(0)
  console.log(`✓ ${rel}: ${(before/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB (-${pct}%)`)
  return before - output.length
}

const files = await walk(ASSETS_DIR)
console.log(`Found ${files.length} images to convert to WebP...\n`)

let totalSaved = 0
for (const f of files) {
  try {
    totalSaved += await convertToWebp(f)
  } catch (err) {
    console.error(`✗ ${path.relative(ROOT, f)}: ${err.message}`)
  }
}

console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`)
