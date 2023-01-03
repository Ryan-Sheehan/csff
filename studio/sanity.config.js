// sanity.config.js
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schemas/schema'
import deskStructure from './deskStructure'
import { Logo } from './branding/Logo'

export default defineConfig({
  title: 'eukaryotic',
  projectId: 'hsf0v5zr',
  dataset: 'production',
  plugins: [deskTool({ structure: deskStructure })],
  schema: {
    types: schemas,
  },
  studio: {
    components: {
      logo: Logo,
    },
  },
})
