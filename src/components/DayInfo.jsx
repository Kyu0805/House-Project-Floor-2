import { motion } from 'framer-motion'
import { HiCalendarDays, HiCheckBadge, HiWrenchScrewdriver } from 'react-icons/hi2'
import { dayNumber, statusTone } from '../utils/formatters'

export default function DayInfo({ progress }) {
  return (
    <motion.section key={progress.day} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="surface mt-8 overflow-hidden">
      <div className="grid lg:grid-cols-[0.88fr_1.5fr]">
        <div className="border-b border-slate-100 bg-sky-50/75 p-6 sm:p-8 lg:border-b-0 lg:border-r dark:border-white/10 dark:bg-sky-500/10"><p className="section-label">Catatan Hari</p><p className="font-serif text-5xl font-bold tracking-tight text-slate-900 dark:text-white">{dayNumber(progress.day)}</p><p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">Day {progress.day}</p></div>
        <div className="p-6 sm:p-8"><div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-2"><HiCalendarDays className="h-4 w-4 text-sky-500" />{progress.date}</span><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusTone(progress.status)}`}><HiCheckBadge className="h-4 w-4" />{progress.status}</span></div><h2 className="mt-5 flex items-start gap-3 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white"><HiWrenchScrewdriver className="mt-1 h-5 w-5 shrink-0 text-sky-500" />{progress.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">{progress.note || 'Belum ada catatan untuk pekerjaan hari ini.'}</p></div>
      </div>
    </motion.section>
  )
}
