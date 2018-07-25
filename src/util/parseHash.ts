interface HashObject {
  [key: string]: any
}

export default function parseHash(): HashObject {
  const hash = (location.hash || '').replace(/^#/, '')
  if (hash) {
    try {
      const obj = JSON.parse(decodeURIComponent(hash))
      return obj || {}
    } catch {
      try {
        const obj = JSON.parse(hash)
        return obj || {}
      } catch {
        return {}
      }
    }
  }
  return {}
}
