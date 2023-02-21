import React, { useState, useRef, useEffect } from 'react'
import { m } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { useInView } from 'react-cool-inview'
import { useRect } from '@reach/rect'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'

import { isBrowser } from '@lib/helpers'

import {
  useSiteContext,
  useToggleMegaNav,
  useToggleCart,
  useCartCount,
} from '@lib/context'

import Menu from '@components/menu'
import MegaNavigation from '@components/menu-mega-nav'
import Icon from '@components/icon'
import { introAnimDuration } from '@lib/animate'

const Header = ({ data = {}, isTransparent, onSetup = () => {} }) => {
  if (!data) return null
  // expand our header data
  const {
    menuDesktopLeft,
    menuDesktopRight,
    menuMobilePrimary,
    menuMobileSecondary,
  } = data

  const { hasSeenIntroAnimation } = useSiteContext()

  // setup states
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(null)
  const { observe, inView: observerIsVisible } = useInView()
  const headerRef = useRef()
  const headerRect = useRect(headerRef)
  const router = useRouter()
  const [isIntro, setIsIntro] = useState(true)

  // setup menu toggle event
  const toggleMobileNav = (state) => {
    setMobileNavOpen(state)

    if (isBrowser) {
      document.body.classList.toggle('overflow-hidden', state)
    }
  }

  // context helpers
  const { meganav } = useSiteContext()
  const toggleMegaNav = useToggleMegaNav()

  useEffect(() => {
    if (headerRect) {
      setHeaderHeight(headerRect.height)
    }
  }, [headerRect])

  useEffect(() => {
    onSetup({ height: headerHeight })
  }, [headerHeight])

  useEffect(() => {
    setTimeout(() => {
      setIsIntro(false)
    }, introAnimDuration)
  }, [])
  console.log('hasSeenIntroAnimation', hasSeenIntroAnimation)

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to Content
      </a>

      <header
        className={cx('header', {
          'is-overlay': isTransparent,
          'is-white': isTransparent && !meganav.isOpen && observerIsVisible,
          'has-bg': !observerIsVisible,
        })}
      >
        <div ref={headerRef} className="header--outer">
          <m.div
            transition={{ duration: 0.8, delay: 2.4 }}
            initial={{
              height: hasSeenIntroAnimation ? 'auto' : 'calc(100vh + 1px)',
            }}
            animate={{
              height: 'auto',
            }}
            className="header--inner"
          >
            <div className="header--content">
              <m.div
                transition={{ duration: 0.8, delay: 2.4 }}
                initial={{ scale: hasSeenIntroAnimation ? 1 : 2 }}
                animate={{ scale: 1 }}
                className="logo"
              >
                {router.pathname === '/' ? (
                  <button
                    className="logo--link"
                    aria-label="Go Home"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Icon
                      name="Canal Street Film Festival Logo"
                      id="header"
                      viewBox="0 0 980 300"
                      animate={!hasSeenIntroAnimation}
                    />
                  </button>
                ) : (
                  <Link href="/" scroll={false}>
                    <a className="logo--link" aria-label="Go Home">
                      <Icon
                        name="Canal Street Film Festival Logo"
                        id="header"
                        viewBox="0 0 980 300"
                        animate={!hasSeenIntroAnimation}
                      />
                    </a>
                  </Link>
                )}
              </m.div>

              <nav className="main-navigation" role="navigation">
                {/* Mobile Header Menu */}
                {menuMobilePrimary?.items && (
                  <div id="mobile-nav" className="main-navigation--mobile">
                    <FocusTrap active={isMobileNavOpen}>
                      <div>
                        <button
                          onClick={() => toggleMobileNav(!isMobileNavOpen)}
                          className={cx('menu-toggle', {
                            'is-open': isMobileNavOpen,
                          })}
                          aria-expanded={isMobileNavOpen}
                          aria-controls="mobile-nav"
                          aria-label="Toggle Menu"
                        >
                          <span className="hamburger">
                            <span className="hamburger--icon"></span>
                          </span>
                        </button>
                        <m.div
                          initial="hide"
                          animate={isMobileNavOpen ? 'show' : 'hide'}
                          variants={{
                            show: {
                              x: '0%',
                            },
                            hide: {
                              x: '-100%',
                            },
                          }}
                          transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="menu-mobile"
                        >
                          <div className="menu-mobile--inner">
                            <div className="menu-mobile--primary">
                              {menuMobilePrimary?.items && (
                                <Menu
                                  items={menuMobilePrimary.items}
                                  onClick={() => toggleMobileNav(false)}
                                />
                              )}
                            </div>

                            <div className="menu-mobile--secondary">
                              {menuMobileSecondary?.items && (
                                <Menu
                                  items={menuMobileSecondary.items}
                                  onClick={() => toggleMobileNav(false)}
                                />
                              )}
                            </div>
                          </div>
                        </m.div>

                        <div
                          className={cx('menu-mobile--backdrop', {
                            'is-active': isMobileNavOpen,
                          })}
                          onClick={() => toggleMobileNav(false)}
                        />
                      </div>
                    </FocusTrap>
                  </div>
                )}

                {/* Desktop Header Menu */}
                <div className="main-navigation--desktop">
                  <div className="menu-left">
                    {menuDesktopLeft?.items && (
                      <Menu
                        items={menuDesktopLeft.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                  </div>

                  <div className="menu-right">
                    {menuDesktopRight?.items && (
                      <Menu
                        items={menuDesktopRight.items}
                        onClick={() => toggleMegaNav(false)}
                        useMegaNav
                      />
                    )}
                  </div>
                </div>
              </nav>
            </div>

            <div
              className={cx('header--border', {
                'is-hidden': meganav.isOpen,
              })}
            />
          </m.div>

          <MegaNavigation
            items={[
              ...(menuDesktopLeft?.items || []),
              ...(menuDesktopRight?.items || []),
            ]}
            headerHeight={
              isTransparent && observerIsVisible ? headerHeight : false
            }
          />
        </div>
      </header>

      <span ref={observe} className="header--observer" />
    </>
  )
}

const HeaderBackdrop = ({ isActive, onClick }) => {
  return (
    <div
      className={cx('header--backdrop', {
        'is-active': isActive,
      })}
      onClick={onClick}
    />
  )
}

export default Header
