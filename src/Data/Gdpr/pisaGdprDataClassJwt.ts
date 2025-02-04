import { provideDataClass } from 'scrivito'
import { fetchData } from '../pisaClientJwt'

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
  const jsonData = await fetchData('gdpr') || {
    results: [],
  }
  return jsonData
}

async function updateGdpr(id: string, data: unknown) {
  const jsonData =await fetchData('gdpr/' + id, 'PATCH', {'Content-Type': 'application/json' }, data as Record<string, unknown>) || {}
  return jsonData
}
