// Document types
import page from './documents/page'
import section from './documents/section'

import generalSettings from './documents/settings-general'
import headerSettings from './documents/settings-header'
import footerSettings from './documents/settings-footer'
import seoSettings from './documents/settings-seo'
import aboutSettings from './documents/settings-about'

import menu from './documents/menu'
import redirect from './documents/redirect'

// Module types
import grid from './modules/grid'
import hero from './modules/hero'
import marquee from './modules/marquee'
import dividerPhoto from './modules/divider-photo'

// Object types
import gridColumn from './objects/grid-column'
import gridSize from './objects/grid-size'
import seo from './objects/seo'

import navDropdown from './objects/nav-dropdown'
import navPage from './objects/nav-page'
import navLink from './objects/nav-link'
import socialLink from './objects/social-link'
import horizontalRule from './objects/horizontal-rule'

import simplePortableText from './objects/portable-simple'
import complexPortableText from './objects/portable-complex'

import freeform from './objects/freeform'
import accordions from './objects/accordions'
import accordion from './objects/accordion'

/*  ------------------------------------------ */
/*  Your Schema documents / modules / objects
/*  ------------------------------------------ */
export default [
  /* ----------------- */
  /* 1: Document types */
  page,
  section,

  generalSettings,
  headerSettings,
  footerSettings,
  seoSettings,
  aboutSettings,
  menu,
  redirect,

  /* --------------- */
  /* 2: Module types */
  grid,
  hero,
  marquee,
  dividerPhoto,

  /* ----------------------- */
  /* 3: Generic Object types */
  gridColumn,
  gridSize,
  seo,

  navDropdown,
  navPage,
  navLink,
  socialLink,
  horizontalRule,

  simplePortableText,
  complexPortableText,

  freeform,
  accordions,
  accordion,
]
