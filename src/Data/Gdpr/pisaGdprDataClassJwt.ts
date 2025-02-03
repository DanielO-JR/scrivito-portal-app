import { provideDataClass } from 'scrivito'
import { handleJwtError, pisaConfigJwt } from '../pisaClientJwt'

export const pisaGdprDataClassJwt = provideDataClass('Gdpr', {
  connection: {
    index: async () => {
      return await indexGdpr()
    },

    update: async (id, data) => {
      return await updateGdpr(id, data)
    },
  },

  attributes: {
    name: 'string',
    description: 'string',
    active: 'boolean',
  },
})

async function indexGdpr() {
  const config = await pisaConfigJwt('gdpr')
  if (config == null) {
    return {
      results: [],
    }
  }
  const response = await fetch(config.url, { headers: config.headers })

  if (!response.ok) {
    handleJwtError(response)
    return {
      results: [],
    }
  }

  const jsonData = await response.json()
  return jsonData
}

async function updateGdpr(id: string, data: unknown) {
  const config = await pisaConfigJwt('gdpr/' + id)
  if (config == null) {
    return {
      results: [],
    }
  }
  const headers = { ...config.headers, 'Content-Type': 'application/json' }
  const response = await fetch(config.url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    handleJwtError(response)
    return {}
  }

  const jsonData = await response.json()
  return jsonData
}
