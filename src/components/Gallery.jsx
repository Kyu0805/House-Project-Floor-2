import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiCamera, HiPhoto } from 'react-icons/hi2'
import { CATEGORIES, imagePath } from '../utils/formatters'

function PhotoCard({ category, day, onOpen }) {
  const [state, setState] = useState('loading')
  const source = imagePath(category.id, day)
  const available = state === 'loaded'

  return (
    <motion.article layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.28 }} className="group relative min-w-0 overflow-hidden rounded-[1.6rem] bg-slate-100 shadow-card dark:bg-slate-800">
      <div className="relative aspect-[4/3] overflow-hidden">
        {state !== 'error' && <img src={source} alt={`${category.label}, Day ${day}`} loading="lazy" onLoad={() => setState('loaded')} onError={() => setState('error')} className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.035] ${available ? 'opacity-100' : 'opacity-0'}`} />}
        <AnimatePresence>
          {!available && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-100 to-slate-200 px-5 text-center dark:from-slate-800 dark:to-slate-900">
            {state === 'loading' ? <span className="h-8 w-8 animate-pulse rounded-full bg-slate-300 dark:bg-slate-700" aria-label="Memuat foto" /> : <div><span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/80 text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500"><HiCamera className="h-5 w-5" /></span><p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Belum ada dokumentasi.</p></div>}
          </motion.div>}
        </AnimatePresence>
        {available && <button type="button" onClick={() => onOpen({ source, label: category.label, day })} aria-label={`Buka foto ${category.label}`} className="absolute inset-0 grid place-items-center bg-slate-950/0 opacity-0 transition duration-300 group-hover:bg-slate-950/25 group-hover:opacity-100 focus:opacity-100 focus-visible:outline-none"><span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-slate-800 shadow-lg"><HiPhoto className="h-5 w-5" /></span></button>}
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between bg-gradient-to-t from-slate-950/65 to-transparent px-5 pb-4 pt-12 text-white"><p className="text-sm font-bold">{category.label}</p><p className="text-xs font-medium text-white/80">Day {String(day).padStart(3, '0')}</p></div>
    </motion.article>
  )
}

export default function Gallery({ filter, day, onOpen }) {
  const items = filter === 'all' ? CATEGORIES : CATEGORIES.filter((category) => category.id === filter)
  return (
    <section aria-label="Galeri dokumentasi" className="mt-8">
      <div className="mb-4 flex items-end justify-between gap-4"><div><p className="section-label">Dokumentasi Visual</p><h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Sudut pembangunan hari ini</h2></div><p className="hidden text-sm text-slate-400 sm:block">Klik foto untuk memperbesar</p></div>
      <motion.div layout className={`grid gap-4 sm:gap-5 ${items.length === 1 ? 'max-w-3xl grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}><AnimatePresence mode="popLayout">{items.map((category) => <PhotoCard key={`${category.id}-${day}`} category={category} day={day} onOpen={onOpen} />)}</AnimatePresence></motion.div>
    </section>
  )
}
