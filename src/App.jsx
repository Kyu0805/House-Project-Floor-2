import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi2'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import Timeline from './components/Timeline'
import Gallery from './components/Gallery'
import Lightbox from './components/Lightbox'
import DayInfo from './components/DayInfo'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { useProgressData } from './hooks/useProgressData'

function EmptyState({ error }) {
  return <main className="mx-auto max-w-2xl px-5 pb-16 sm:px-8"><div className="surface p-8 text-center sm:p-12"><p className="text-lg font-bold text-slate-800 dark:text-white">Belum ada data perkembangan</p><p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{error || 'Tambahkan baris pertama pada public/data/progress.csv untuk memulai dokumentasi.'}</p></div></main>
}

export default function App() {
  const { data, loading, error } = useProgressData()
  const [selectedDay, setSelectedDay] = useState(null)
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [showTop, setShowTop] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches))

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); localStorage.theme = darkMode ? 'dark' : 'light' }, [darkMode])
  useEffect(() => { if (data.length && selectedDay === null) setSelectedDay(data[data.length - 1].day) }, [data, selectedDay])
  useEffect(() => { const onScroll = () => setShowTop(window.scrollY > 450); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])

  const activeIndex = useMemo(() => data.findIndex((item) => String(item.day) === String(selectedDay)), [data, selectedDay])
  const activeProgress = activeIndex >= 0 ? data[activeIndex] : null
  const selectDay = (day) => { setSelectedDay(day); document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header darkMode={darkMode} onToggleTheme={() => setDarkMode((current) => !current)} />
      {loading ? <main className="mx-auto max-w-6xl px-5 pb-16 sm:px-8"><div className="surface h-52 animate-pulse bg-slate-100 dark:bg-slate-900" /></main> : !activeProgress ? <EmptyState error={error} /> : <main className="mx-auto max-w-6xl px-5 pb-16 sm:px-8"><FilterBar activeFilter={filter} onChange={setFilter} /><div className="mt-5"><Timeline days={data} selectedDay={selectedDay} onSelect={selectDay} /></div><div id="gallery" className="scroll-mt-5"><Gallery filter={filter} day={activeProgress.day} onOpen={setLightbox} /></div><DayInfo progress={activeProgress} /><Navigation previous={data[activeIndex - 1]} next={data[activeIndex + 1]} onPrevious={() => selectDay(data[activeIndex - 1].day)} onNext={() => selectDay(data[activeIndex + 1].day)} /><Footer /></main>}
      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
      <AnimatePresence>{showTop && <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-30 grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/25 transition hover:-translate-y-1 hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950" aria-label="Kembali ke atas"><HiArrowUp className="h-5 w-5" /></motion.button>}</AnimatePresence>
    </div>
  )
}
