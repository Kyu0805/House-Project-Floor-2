export const CATEGORIES = [
  { id: 'depan', label: 'Tampak Depan' },
  { id: 'samping', label: 'Tampak Samping' },
  { id: 'belakang', label: 'Tampak Belakang' },
  { id: 'lantai2', label: 'Lantai 2' },
]

export const dayNumber = (day) => String(day).padStart(3, '0')
export const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
export const imagePath = (category, day) => publicAsset(`/images/${category}/${dayNumber(day)}.jpg`)

export function statusTone(status = '') {
  const value = status.toLowerCase()
  if (value.includes('selesai')) return 'bg-emerald-50 text-emerald-700 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20'
  if (value.includes('berjalan')) return 'bg-sky-50 text-sky-700 ring-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20'
  return 'bg-amber-50 text-amber-700 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20'
}
