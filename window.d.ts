declare global {
  interface Window {
    disqus_config: any
    DISQUS: any
  }
}

export const disqus_config = window.disqus_config
