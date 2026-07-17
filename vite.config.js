import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1]
const owner = process.env.GITHUB_REPOSITORY?.split('/')[0]
const githubPagesBase = repository && repository !== `${owner}.github.io` ? `/${repository}/` : '/'

export default defineConfig({
  plugins: [react()],
  // The workflow infers the project-site path. Override with VITE_BASE_PATH if needed.
  base: process.env.VITE_BASE_PATH || githubPagesBase,
})
