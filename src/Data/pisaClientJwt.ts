import { toast } from 'react-toastify'
import { pisaConfig } from './pisaClient'

const JwtTokenName = 'token'

/**
 * Returns the pisaConfig with the JWT token if present.
 *
 * @param subPath the subPath to append to the pisaUrl
 * @returns the pisaConfig with the JWT token if present
 * */
export async function pisaConfigJwt(subPath: string) {
  if (!isJwtTokenProvided()) {
    return null
  }

  const pisaConfigData = await pisaConfig(subPath)
  if (pisaConfigData == null) {
    toast.error('Please configure a pisaUrl on the default homepage.')
    return null
  }
  const authToken = getJwtToken()

  // add authorization header if token is present
  if (authToken) {
    pisaConfigData.headers.Authorization = `JWT ${authToken}`
  }

  return pisaConfigData
}

/**
 * Checks if a JWT token is present in the URL's query parameter.
 *
 * @returns true if a JWT token is present, otherwise false
 */
export function isJwtTokenProvided() {
  return getJwtToken() !== null
}

/**
 * Retrieves the JWT token from the URL's query parameter.
 *
 * @returns the JWT token if it's valid, otherwise null
 */
function getJwtToken() {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get(JwtTokenName)

  const regEx = new RegExp('[0-9a-zA-Z]+\\.[0-9a-zA-Z]+\\.[0-9a-zA-Z-_]+')

  /// write message to console if there is token but it is invalid
  if (token && !regEx.test(token)) {
    console.error('Invalid JWT token:', token)
  }

  return token && regEx.test(token) ? token : null
}

export function handleJwtError(response: Response) {
  toast.error('JWT error! ' + response.status + ' ' + response.statusText)

  // const JwtErrorRedirect = '/jwt-error'
  // window.location.href = JwtErrorRedirect
}
