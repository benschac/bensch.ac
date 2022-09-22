export const isoDate = (date?: string) => (date ? new Date(date).toISOString() : '')
export const getCurrentFullYear = () => new Date().getFullYear()
