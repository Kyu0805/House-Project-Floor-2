import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { dayNumber } from '../utils/formatters'

export default function Timeline({ days, selectedDay, onSelect }) {
  const activeRef = useRef(null)
  useEffect(() => { activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }) }, [selectedDay])

  return (
    <section aria-label="Timeline pembangunan" className="surface overflow-hidden p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between px-1">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Timeline pembangunan</p>
        <p className="text-xs text-slate-400">Geser untuk melihat hari lain</p>
      </div>
      <div className="relative overflow-x-auto pb-2 [scrollbar-width:thin]">
        <div className="absolute left-5 right-5 top-8 h-px bg-slate-200 dark:bg-slate-700" />
        <div className="relative flex min-w-max gap-3 px-1">
          {days.map((item) => {
            const isActive = String(item.day) === String(selectedDay)
            return (
              <button key={item.day} ref={isActive ? activeRef : null} type="button" onClick={() => onSelect(item.day)} className="group flex w-[76px] flex-col items-center gap-2 rounded-2xl p-1 text-center outline-none focus-visible:ring-2 focus-visible:ring-sky-400" aria-current={isActive ? 'date' : undefined}>
                <motion.span layout className={`grid h-9 w-9 place-items-center rounded-full border-4 text-[0.65rem] font-bold transition ${isActive ? 'border-sky-100 bg-sky-600 text-white shadow-lg shadow-sky-500/25 dark:border-sky-950' : 'border-white bg-slate-100 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 dark:border-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-sky-500/15'}`}>{String(item.day).padStart(2, '0')}</motion.span>
                <span className={`whitespace-nowrap text-[0.67rem] font-bold uppercase tracking-wide ${isActive ? 'text-sky-700 dark:text-sky-300' : 'text-slate-400 dark:text-slate-500'}`}>Day {dayNumber(item.day)}</span>
              </button>
            )
          })}
          <div className="flex w-[70px] flex-col items-center gap-2 p-1 text-center">
            <span className="grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-slate-900 text-xs text-white dark:border-slate-900 dark:bg-slate-100 dark:text-slate-900">✓</span>
            <span className="text-[0.67rem] font-bold uppercase tracking-wide text-slate-400">Finish</span>
          </div>
        </div>
      </div>
    </section>
  )
}
