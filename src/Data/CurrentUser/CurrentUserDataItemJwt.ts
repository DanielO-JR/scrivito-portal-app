import { provideDataItem } from 'scrivito'
import { fetchData } from '../pisaClientJwt'

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
  const jsonData = await fetchData('whoami') || {}
  return { ...defaultUserData, ...jsonData }
}
