import { Minus } from 'phosphor-react'

import HR from '../../components/hr'

export default {
  title: 'Newsletter',
  name: 'newsletter',
  type: 'object',
  icon: Minus,
  fields: [
    {
      type: 'string',
      name: 'newsletter',
      inputComponent: HR,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Newsletter',
      }
    },
  },
}
