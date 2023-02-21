import { ArrowBendRightDown, WarningCircle } from 'phosphor-react'

export default {
  title: 'Dropdown',
  name: 'navDropdown',
  type: 'object',
  icon: ArrowBendRightDown,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Text to Display',
    },
    {
      title: 'Dropdown Items',
      name: 'dropdownItems',
      type: 'array',
      of: [{ type: 'navPage' }, { type: 'navLink' }],
    },
    {
      name: 'featuredNote',
      type: 'note',
      options: {
        icon: WarningCircle,
        headline: 'Gotcha',
        message: `Featured products are only for menus that appear in desktop "mega-navs".`,
        tone: 'caution',
      },
    },
  ],
}
