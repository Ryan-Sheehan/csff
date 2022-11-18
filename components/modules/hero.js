import React, { useRef } from 'react'

import BlockContent from '@components/block-content'
import VideoLoop from '@components/vimeo-loop'
import Photo from '@components/photo'
import { useInView, m } from 'framer-motion'

const Hero = ({ data = {} }) => {
  const { content, bgType, photos, video } = data

  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="hero">
      {content && (
        <m.div
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hero--overlay"
        >
          <div className="hero--content">
            <BlockContent blocks={content} />
          </div>
        </m.div>
      )}

      {bgType === 'video' && (
        <>
          <div className="hero--bg is-desktop">
            <VideoLoop title={video.title} id={video.id} />
          </div>
          <div className="hero--bg is-mobile">
            <VideoLoop title={video.title} id={video.id} />
          </div>
        </>
      )}

      {bgType === 'photo' && (
        <>
          {photos?.desktopPhoto && (
            <Photo
              photo={photos.desktopPhoto}
              width={1600}
              srcSizes={[800, 1000, 1200, 1600]}
              sizes="100vw"
              layout="fill"
              className="hero--bg is-desktop"
            />
          )}
          {photos?.mobilePhoto && (
            <Photo
              photo={photos.mobilePhoto}
              width={800}
              sizes="100vw"
              layout="fill"
              className="hero--bg is-mobile"
            />
          )}
        </>
      )}
    </section>
  )
}

export default Hero
