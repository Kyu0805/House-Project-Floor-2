import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiXMark } from 'react-icons/hi2'

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      {image && <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }} role="dialog" aria-modal="true" aria-label={`Foto ${image.label}`}>
        <motion.img src={image.source} alt={`${image.label}, Day ${image.day}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: 'spring', stiffness: 240, damping: 25 }} className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">{image.label} · Day {String(image.day).padStart(3, '0')}</div>
        <button type="button" onClick={onClose} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white" aria-label="Tutup foto"><HiXMark className="h-6 w-6" /></button>
      </motion.div>}
    </AnimatePresence>
  )
}
