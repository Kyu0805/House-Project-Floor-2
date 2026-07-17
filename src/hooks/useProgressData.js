import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { publicAsset } from '../utils/formatters'

export function useProgressData() {
  const [state, setState] = useState({ data: [], loading: true, error: null })

  useEffect(() => {
    let active = true
    fetch(publicAsset('/data/progress.csv'))
      .then((response) => {
        if (!response.ok) throw new Error('Data progress tidak dapat dimuat.')
        return response.text()
      })
      .then((csv) => {
        const result = Papa.parse(csv, { header: true, skipEmptyLines: true, transform: (value) => value.trim() })
        const data = result.data
          .filter((item) => item.day && !Number.isNaN(Number(item.day)))
          .sort((a, b) => Number(a.day) - Number(b.day))
        if (active) setState({ data, loading: false, error: null })
      })
      .catch((loadError) => { if (active) setState({ data: [], loading: false, error: loadError.message }) })
    return () => { active = false }
  }, [])

  return state
}
