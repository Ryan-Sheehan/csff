
import {
  Gear,
  PaintBucket,
  NavigationArrow,
  AnchorSimple,
  GlobeSimple,
  Shuffle,
  Question,
} from 'phosphor-react'

export const settingsMenu = (S) => S.listItem()
  .title('Settings')
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('General')
          .child(
            S.editor()
              .id('generalSettings')
              .schemaType('generalSettings')
              .documentId('generalSettings')
          )
          .icon(Gear),
        S.divider(),

        S.listItem()
          .title('Header')
          .child(
            S.editor()
              .id('headerSettings')
              .schemaType('headerSettings')
              .documentId('headerSettings')
          )
          .icon(NavigationArrow),
        S.listItem()
          .title('Footer')
          .child(
            S.editor()
              .id('footerSettings')
              .schemaType('footerSettings')
              .documentId('footerSettings')
          )
          .icon(AnchorSimple),
        S.divider(),
        S.listItem()
          .title('About Popup')
          .child(
            S.editor()
              .id('aboutSettings')
              .schemaType('aboutSettings')
              .documentId('aboutSettings')
          )
          .icon(Question),
        S.divider(),
        S.listItem()
          .title('Default SEO / Share')
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          )
          .icon(GlobeSimple),
        S.listItem()
          .title('Redirects')
          .child(S.documentTypeList('redirect').title('Redirects'))
          .icon(Shuffle),
      ])
  )
  .icon(Gear)
