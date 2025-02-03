import { provideDataItem } from 'scrivito'
import { handleJwtError, pisaConfigJwt } from '../pisaClientJwt'

/**
 * The default user data object.
 */
const defaultUserData = {
  company: '',
  email: '',
  familyName: '',
  givenName: '',
  jrUserId: '',
  name: '',
  phoneNumber: '',
  picture: '',
  salesUserId: '',
  salutation: '',
  serviceUserId: '',
  pisaUserId: '',
}

export const CurrentUserDataItemJwt = provideDataItem('CurrentUser', {
  attributes: {
    company: 'string',
    email: 'string',
    familyName: 'string',
    givenName: 'string',
    jrUserId: 'string',
    name: 'string',
    phoneNumber: 'string',
    picture: 'string',
    salesUserId: ['reference', { to: 'User' }],
    salutation: 'string',
    serviceUserId: ['reference', { to: 'User' }],
  },

  connection: {
    async get() {
      return await getUser()
    },
  },
})

async function getUser() {
  const config = await pisaConfigJwt('whoami')
  if (!config) {
    return defaultUserData
  }
  const response = await fetch(config.url, { headers: config.headers })

  if (!response.ok) {
    handleJwtError(response)
    return defaultUserData
  }

  const jsonData = await response.json()
  return { ...defaultUserData, ...jsonData }
}
