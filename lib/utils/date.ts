export const isoDate = (date?: string) => new Date(date ?? undefined).toISOString()
export const getCurrentFullYear = () => new Date().getFullYear()
