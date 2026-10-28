import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Icon } from './components/Illustrations'
import { Home, About, Privacy, Safety } from './pages'

const navigation = [['/', 'Home'], ['/about', 'About'], ['/privacy', 'Privacy'], ['/safety', 'Safety']]
const titles = { '/': 'Care for your postpartum journey', '/about': 'About our beginning', '/privacy': 'Your privacy', '/safety': 'Safety & care' }
const currentYear = new Date().getFullYear()

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="SachiArambh home">
      <span className="brand-symbol"><Icon name="leaf" size={27} /></span>
      <span>Sachi<span className="brand-light">Arambh</span><small>A LITTLE CLARITY. A NEW BEGINNING.</small></span>
    </Link>
  )
}

function Header() {
  const location = useLocation()
  const [menu, setMenu] = useState({ key: location.key, open: false })
  const open = menu.key === location.key && menu.open
  const setOpen = (next) => setMenu({ key: location.key, open: next })
  const toggle = useRef(null)

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
    }}>
      <div className="container header-inner">
        <Brand />
        <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav id="main-navigation" className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          {navigation.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          <Link className="button button-small" to="/#choose-path">Find your next step <Icon name="arrow" size={17} /></Link>
        </nav>
      </div>
    </header>
  )
}

function RouteEffects() {
  const { pathname, hash } = useLocation()
  const previousPath = useRef(pathname)

  useEffect(() => {
    document.title = `${titles[pathname] || 'Home'} | SachiArambh`
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      target?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      target?.focus({ preventScroll: true })
    } else if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
    previousPath.current = pathname
  }, [pathname, hash])
  return null
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div><Brand /><p>From confusion to the right next step.</p><span className="footer-note">Thoughtfully designed for the fourth trimester and beyond.</span></div>
        <div className="footer-links"><span className="eyebrow">A little more clarity</span>
          <nav aria-label="Footer navigation">{navigation.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}</nav>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {currentYear} SachiArambh. Made with care.</span>
        <span>Education, not diagnosis. Always human care first.</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteEffects />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
