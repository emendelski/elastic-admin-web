// https://en.wikipedia.org/wiki/Byte
const unit = 'SI'
const unitSymbol = {
  IEC: ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
  SI: ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
}

export default function humanSize(bytes: number): string {
  if (bytes <= 0) {
    return '0'
  }
  const s = unitSymbol[unit];
  const e = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), s.length - 1)
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(e > 0 ? 2 : 0) + ' ' + s[e]
}
