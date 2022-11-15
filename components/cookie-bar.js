import React, { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import Cookies from 'js-cookie'

import { useHasMounted } from '@lib/helpers'
import BlockContent from '@components/block-content'

import CustomLink from '@components/link'

const barAnim = {
  show: {
    y: '0%',
    transition: {
      duration: 0.6,
      delay: 0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  hide: {
    y: '50%',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const AboutPopup = React.memo(({ data = {} }) => {
  const { enabled, message, link } = data
  const [open, setOpen] = useState(false)
  const togglePopup = () => setOpen(!open)

  if (!enabled) return null

  const hasMounted = useHasMounted()

  if (!hasMounted || !message) return null

  return (
    <FocusTrap focusTrapOptions={{ allowOutsideClick: true }}>
      <m.div
        initial="hide"
        animate={open ? 'show' : 'hide'}
        exit="hide"
        variants={barAnim}
        role="dialog"
        aria-live="polite"
        className="cookie-bar"
      >
        <div className="cookie-bar--content is-inverted">
          <div className="cookie-bar--message">
            <BlockContent blocks={message} />
          </div>

          <div className="cookie-bar--actions">
            {link && (
              <CustomLink
                className="btn is-text"
                link={{ ...{ page: link }, ...{ title: 'Learn More' } }}
              />
            )}
            <button onClick={() => togglePopup()} className="btn is-primary">
              {open ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
      </m.div>
    </FocusTrap>
  )
})

export default AboutPopup
