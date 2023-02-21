import { List } from 'phosphor-react'

export const menusMenu = (S) =>
  S.listItem()
    .title('Menus')
    .child(S.documentTypeList('menu').title('Menus'))
    .icon(List)
