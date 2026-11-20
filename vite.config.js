import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Vite's static server sends *.gz files with "Content-Encoding: gzip", so the
// browser silently decompresses the pygbag archive and pygbag's tarfile
// (mode "r:gz") fails to open it. Serve .tar.gz files as raw bytes instead.
function rawTarGz(req, res, next) {
  if (req.url?.split('?')[0].endsWith('.tar.gz')) {
    // Always send a fresh 200: a 304 would let the browser reuse a copy it
    // cached earlier with the old "Content-Encoding: gzip" header.
    delete req.headers['if-none-match']
    delete req.headers['if-modified-since']
    const writeHead = res.writeHead.bind(res)
    res.writeHead = (code, headers) => {
      if (headers) delete headers['Content-Encoding']
      res.removeHeader('Content-Encoding')
      return writeHead(code, { ...headers, 'Content-Type': 'application/gzip' })
    }
  }
  next()
}

const pygbagArchives = {
  name: 'pygbag-raw-tar-gz',
  configureServer: (server) => { server.middlewares.use(rawTarGz) },
  configurePreviewServer: (server) => { server.middlewares.use(rawTarGz) },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pygbagArchives],
})
