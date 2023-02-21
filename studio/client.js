import sanityClient from '@sanity/client'
const client = sanityClient({
  projectId: 'hsf0v5zr',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
})

export default client
