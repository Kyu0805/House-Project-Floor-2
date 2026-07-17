import { motion } from 'framer-motion'
import { HiMoon, HiSun } from 'react-icons/hi2'

export default function Header({ darkMode, onToggleTheme }) {
  return (
    <header className="relative overflow-hidden px-5 pb-8 pt-7 sm:px-8 sm:pb-12 sm:pt-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_50%_-15%,rgba(186,230,253,0.9),transparent_58%)] dark:bg-[radial-gradient(circle_at_50%_-15%,rgba(14,116,144,0.28),transparent_58%)]" />
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-5">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="section-label">Catatan Perjalanan</p>
          <h1 className="max-w-3xl font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-5xl dark:text-white">
            <span className="mr-2 inline-block">🏠</span>Pembangunan Rumah Lantai 2
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">Dokumentasi proses pembangunan rumah dari awal hingga selesai.</p>
        </motion.div>
        <button type="button" onClick={onToggleTheme} aria-label={darkMode ? 'Gunakan mode terang' : 'Gunakan mode gelap'} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-sky-600 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:text-sky-300">
          {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  )
}
