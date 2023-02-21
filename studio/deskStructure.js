import { settingsMenu } from './desk/settings'
import { pagesMenu } from './desk/pages'
import { menusMenu } from './desk/menus'

const hiddenDocTypes = (listItem) =>
  ![
    'page',
    'section',

    'generalSettings',
    'headerSettings',
    'footerSettings',
    'aboutSettings',
    'seoSettings',

    'menu',
    'siteSettings',
    'redirect',
    'media.tag', // for media plugin
  ].includes(listItem.getId())

export default (S) =>
  S.list()
    .title('Website')
    .items([
      pagesMenu(S),
      S.divider(),
      menusMenu(S),
      S.divider(),
      settingsMenu(S),

      // Filter out docs already defined above
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
