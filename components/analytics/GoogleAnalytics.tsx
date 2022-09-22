import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const GAScript = () => {
  const { analytics } = siteMetadata
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${analytics.googleAnalyticsId}`}
      />

      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${analytics.googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
        `}
      </Script>
    </>
  )
}

export default GAScript

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
// export const logEvent = (action, category, label, value) => {
//   window.gtag?.('event', action, {
//     event_category: category,
//     event_label: label,
//     value: value,
//   })
// }
