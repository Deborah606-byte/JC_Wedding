import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const isOpen = index !== null && index !== undefined

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-5 right-5 lg:top-8 lg:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-[#FFFFFF] flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 lg:top-10 lg:left-10 text-[#FFFFFF]/70 text-[11px] tracking-[0.25em] uppercase font-medium">
            {index + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev() }}
              className="absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-[#FFFFFF] flex items-center justify-center transition-colors"
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          )}

          {/* Image */}
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={images[index].src}
            alt={images[index].alt || ''}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl"
          />

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext() }}
              className="absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-[#FFFFFF] flex items-center justify-center transition-colors"
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Convenient hook for managing lightbox state
import { useState, useCallback } from 'react'

export function useLightbox(images) {
  const [index, setIndex] = useState(null)
  const open = useCallback((i) => setIndex(i), [])
  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  return { index, open, close, prev, next }
}
