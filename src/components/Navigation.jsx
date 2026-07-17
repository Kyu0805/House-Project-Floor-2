import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'

export default function Navigation({ previous, next, onPrevious, onNext }) {
  return (
    <nav aria-label="Pindah hari" className="mt-5 flex items-center justify-between gap-3">
      <button type="button" onClick={onPrevious} disabled={!previous} className="inline-flex min-h-12 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-sky-500/40 dark:hover:text-sky-300"><HiArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Hari Sebelumnya</span><span className="sm:hidden">Sebelumnya</span></button>
      <p className="hidden text-center text-xs font-medium text-slate-400 sm:block">Gunakan timeline atau tombol navigasi</p>
      <button type="button" onClick={onNext} disabled={!next} className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"><span className="hidden sm:inline">Hari Berikutnya</span><span className="sm:hidden">Berikutnya</span><HiArrowRight className="h-4 w-4" /></button>
    </nav>
  )
}
