import siteMetadata from '@/data/siteMetadata'

export const isoDate = (date?: string) => (date ? new Date(date).toISOString() : '')
export const currentIsoDate = () => new Date().toISOString()
export const getCurrentFullYear = () => new Date().getFullYear()
const { locale } = siteMetadata

export const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(locale, options)

  return now
}
