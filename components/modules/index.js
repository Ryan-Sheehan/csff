import React from 'react'

import Grid from './grid'
import Hero from './hero'
import Marquee from './marquee'
import DividerPhoto from './divider-photo'

export const Module = ({
  index,
  data,
  product,
  activeVariant,
  onVariantChange,
}) => {
  if (!data) return null

  switch (data._type) {
    case 'grid':
      return <Grid index={index} data={data} />
    case 'hero':
      return <Hero index={index} data={data} />
    case 'marquee':
      return <Marquee index={index} data={data} />
    case 'dividerPhoto':
      return <DividerPhoto index={index} data={data} />
    default:
      return null
  }
}
