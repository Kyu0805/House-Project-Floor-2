import { motion } from 'framer-motion'
import { CATEGORIES } from '../utils/formatters'

const filters = [{ id: 'all', label: 'Semua' }, ...CATEGORIES]

export default function FilterBar({ activeFilter, onChange }) {
  return (
    <nav aria-label="Filter sudut dokumentasi" className="-mx-1 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2 rounded-2xl border border-slate-200/80 bg-white/70 p-1.5 dark:border-white/10 dark:bg-slate-900/60">
        {filters.map((filter) => {
          const selected = activeFilter === filter.id
          return (
            <button key={filter.id} type="button" onClick={() => onChange(filter.id)} className={`relative rounded-xl px-4 py-2.5 text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-sky-400 ${selected ? 'text-sky-700 dark:text-sky-200' : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100'}`}>
              {selected && <motion.span layoutId="active-filter" className="absolute inset-0 rounded-xl bg-sky-100 shadow-sm dark:bg-sky-500/20" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative z-10 whitespace-nowrap">{filter.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
