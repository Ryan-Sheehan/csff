export default {
  title: 'About Popup Settings',
  name: 'aboutSettings',
  type: 'document',
  fields: [
    {
      title: 'Enable About Popup?',
      name: 'enabled',
      type: 'boolean',
    },
    {
      title: 'Message',
      name: 'message',
      type: 'simplePortableText',
      rows: 2,
      description: 'About',
      hidden: ({ parent }) => !parent.enabled,
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'About Popup Settings',
      }
    },
  },
}
