/* eslint-disable @typescript-eslint/no-explicit-any */
import GA from './GoogleAnalytics'
import Plausible from './Plausible'
import SimpleAnalytics from './SimpleAnalytics'
import Umami from './Umami'
import siteMetadata from '@/data/siteMetadata'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    plausible?: (...args: any[]) => void
    sa_event?: (...args: any[]) => void
  }
}

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  const {
    analytics: { plausibleDataDomain, simpleAnalytics, umamiWebsiteId, googleAnalyticsId },
  } = siteMetadata
  return (
    <>
      {isProduction && plausibleDataDomain && <Plausible />}
      {isProduction && simpleAnalytics && <SimpleAnalytics />}
      {isProduction && umamiWebsiteId && <Umami />}
      {isProduction && googleAnalyticsId && <GA />}
    </>
  )
}

export default Analytics
