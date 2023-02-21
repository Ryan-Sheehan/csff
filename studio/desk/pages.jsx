import React from 'react'
import sanityClient from '../client'
import { Card, Stack, Text } from '@sanity/ui'
import {IntentButton, ToolLink} from 'sanity'
import { House, Browser, ShoppingCart, WarningOctagon } from 'phosphor-react'

import { standardViews } from './previews/standard'

const EmptyNotice = ({ title, type, link, linkTitle }) => {
  if (!title || !type || !link || !linkTitle) return null

  return (
    <Card padding={4}>
      <Card padding={[5]} radius={2} shadow={1} tone="critical">
        <Stack space={[3]}>
          <Text align="center" size={[2]} weight="semibold">
            The {title} has not been set.
          </Text>
          <Text align="center" size={[2]}>
            Set your {title} from the {linkTitle}
          </Text>
        </Stack>
      </Card>

      <Stack padding={3} space={[3]}>
        <Text align="center" muted size={[1]}>
          Don't have a {type} yet?{' '}
          <IntentButton intent="create" params={{ type }}>
            Create one now
          </IntentButton>
        </Text>
      </Stack>
    </Card>
  )
}

// Extract our home page
const currentHomePage = (S) =>
  S.listItem()
    .title('Home Page')
    .icon(House)
    .child(async () => {
      const data = await sanityClient.fetch(`
      *[_type == "generalSettings"][0]{
        home->{_id}
      }
    `)

      if (!data?.home)
        return S.component(() => (
          <EmptyNotice
            title="Home Page"
            type="page"
            link="settings;general"
            linkTitle="General Settings"
          />
        )).title('Home Page')

      return S.document()
        .id(data.home._id)
        .schemaType('page')
        .views(() => standardViews(S))
    })

// Extract our error page
const currentErrorPage = (S) =>
  S.listItem()
    .title('Error Page')
    .icon(WarningOctagon)
    .child(async () => {
      const data = await sanityClient.fetch(`
      *[_type == "generalSettings"][0]{
        error->{_id}
      }
    `)

      if (!data?.error)
        return S.component(() => (
          <EmptyNotice
            title="Error Page"
            type="page"
            link="settings;general"
            linkTitle="General Settings"
          />
        )).title('Error Page')

      return S.document()
        .id(data.error._id)
        .schemaType('page')
        .views(() => standardViews(S))
    })

export const pagesMenu = (S) =>
  S.listItem()
    .title('Pages')
    .id('pages')
    .child(
      S.list()
        .title('Pages')
        .items([
          currentHomePage(S),
          currentErrorPage(S),
          S.listItem()
            .title('Other Pages')
            .schemaType('page')
            .child(
              S.documentTypeList('page')
                .title('Other Pages')
                .filter(
                  `_type == "page" && !(_id in [
                  *[_type == "generalSettings"][0].home._ref,
                  *[_type == "generalSettings"][0].error._ref,
                ]) && !(_id in path("drafts.**"))`
                )
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('page')
                    .views(() => standardViews(S))
                )
                .canHandleIntent(
                  (intent, { type }) =>
                    ['create', 'edit'].includes(intent) && type === 'page'
                )
            ),
          S.divider(),
          S.listItem()
            .title('Reusable Sections')
            .schemaType('section')
            .child(
              S.documentTypeList('section')
                .title('Reusable Sections')
                .child((documentId) =>
                  S.document()
                    .documentId(documentId)
                    .schemaType('section')
                    .views(() => standardViews(S))
                )
                .canHandleIntent(
                  (intent, { type }) =>
                    ['create', 'edit'].includes(intent) && type === 'section'
                )
            ),
        ])
    )
    .icon(Browser)
