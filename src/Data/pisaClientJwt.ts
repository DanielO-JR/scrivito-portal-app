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

export async function fetchData(
  endPoint: string,
  method: string = 'GET',
  additionalHeaders: Record<string, string> = {},
  body?: Record<string, unknown>,
) {
  const config = await pisaConfigJwt(endPoint)
  if (!config) {
    console.error('Connection to Pisa cannot be established.')
    return null
  }
  try {
    const response = await fetch(config.url, {
      method,
      headers: { ...config.headers, ...additionalHeaders },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (response.ok) {
      return await response.json()
    }
    await handleJwtError(response)
  } catch (error) {
    console.error('No data received!', error)
  }
  return null
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
    console.error('Invalid page parameters')
  }

  return token && regEx.test(token) ? token : null
}

async function handleJwtError(response: Response | null | Error) {
  let errorDetails = 'An error occurred: '
  if (response instanceof Response) {
    try {
      const errorData = await response.json()
      errorDetails = JSON.stringify(errorData, null, 2)
    } catch (error) {
      console.error('Error:', error)
    }
  } else if (response instanceof Error) {
    errorDetails = response.message
  }
  console.error('An error occurred', errorDetails)

  replaceContent(
    '.card-body',
    '<h1 style="color:red!important">Something went wrong!</h1><div class=\'error-details\'>Please follow instructions in the email.</div>',
  )

  const styles = {
    'body .container > :not(.card) *, body .container > :not(.card) a': {
      color: 'transparent',
      'text-shadow': '0 0 5px rgba(0,0,0,0.5)',
    },
  }

  addCssToHead(styles)
}

function replaceContent(selector: string, content: string) {
  const element = document.querySelector(selector)
  if (element) {
    element.innerHTML = content
  }
}

function addCssToHead(styles: { [key: string]: { [key: string]: string } }) {
  // Convert JSON to CSS string
  let css = ''
  for (const selector in styles) {
    css += `${selector} { `
    for (const prop in styles[selector]) {
      const value = styles[selector][prop]
      if (value) {
        css += `${prop}: ${value}; `
      }
    }
    css += '} '
  }

  // Create a <style> element and append the CSS
  const styleElement = document.createElement('style')
  styleElement.textContent = css
  document.head.appendChild(styleElement)
}
