import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { getCurrentFullYear } from '@/lib/utils/date'

export default function Footer() {
  const { email, github, youtube, linkedin, twitter, author, title } = siteMetadata
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
          <SocialIcon kind="github" href={github} size={6} />
          <SocialIcon kind="linkedin" href={linkedin} size={6} />
          <SocialIcon kind="twitter" href={twitter} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{`© ${getCurrentFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
