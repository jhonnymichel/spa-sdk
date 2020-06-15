import { useRouter } from 'next/router'
import NextLink from 'next/link'
import classNames from 'classnames'

function Link(props: { href: string; children: React.ReactNode }): JSX.Element {
  const { href, children } = props
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <NextLink href={href}>
      <a
        className={classNames('inline-block py-4 px-6 border-b-2 text-gray-700', {
          'font-bold border-blue-700': isActive,
          'border-transparent': !isActive,
        })}
      >
        {children}
      </a>
    </NextLink>
  )
}

function Navbar(): JSX.Element {
  return (
    <nav className="border-b border-gray-500 bg-white">
      <Link href="/">counter</Link>
      <Link href="/todos">todo list</Link>
    </nav>
  )
}

export default Navbar
