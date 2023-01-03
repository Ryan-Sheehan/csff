import { WarningCircle } from 'phosphor-react'

export default {
  title: 'Header Settings',
  name: 'headerSettings',
  type: 'document',
  fieldsets: [
    {
      title: 'Desktop',
      name: 'desktop',
      description: 'Navigation settings for desktop view',
      options: { collapsed: false },
    },
    {
      title: 'Mobile',
      name: 'mobile',
      description: 'Navigation settings for mobile view',
      options: { collapsed: false },
    },
  ],
  fields: [
    {
      title: 'Desktop Menu (Left)',
      name: 'menuDesktopLeft',
      type: 'reference',
      to: [{ type: 'menu' }],
      fieldset: 'desktop',
    },
    {
      title: 'Desktop Menu (Right)',
      name: 'menuDesktopRight',
      type: 'reference',
      to: [{ type: 'menu' }],
      fieldset: 'desktop',
    },
    {
      title: 'Mobile Menu (Primary)',
      name: 'menuMobilePrimary',
      type: 'reference',
      to: [{ type: 'menu' }],
      fieldset: 'mobile',
    },
    {
      title: 'Mobile Menu (Secondary)',
      name: 'menuMobileSecondary',
      type: 'reference',
      to: [{ type: 'menu' }],
      fieldset: 'mobile',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Settings',
      }
    },
  },
}
