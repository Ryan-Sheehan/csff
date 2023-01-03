import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'hsf0v5zr',
    dataset: 'production',
  },
  server: {
    hostname: 'localhost',
    port: 3333,
  },
})
