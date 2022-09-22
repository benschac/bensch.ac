import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { ReactNode } from 'react'
import Image from 'next/image'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const { headerTitle } = siteMetadata
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <nav>
            <Link href="/" aria-label={headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3 flex items-center">
                  <Image
                    className="rounded-full"
                    src="/static/images/ben.png"
                    width={32}
                    height={32}
                  />
                </div>
                {typeof headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">{headerTitle}</div>
                ) : (
                  headerTitle
                )}
              </div>
            </Link>
          </nav>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
