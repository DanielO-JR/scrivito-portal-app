import {
  currentLanguage,
  DataClass,
  load,
  Obj,
  provideDataClass,
  urlFor,
} from 'scrivito'
import { snakeCase } from 'lodash-es'
import { searchLocalStorageDataConnections } from '../../localStorageDataConnection'
import { ensureString } from '../../../utils/ensureString'

export function localStorageGlobalResultDataClass(): DataClass {
  return provideDataClass('GlobalResult', {
    attributes: async () => {
      const lang = await load(currentLanguage)

      return {
        title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
        entity: ['string', { title: lang === 'de' ? 'Entität' : 'Entity' }],
        url: ['string', { title: 'URL' }],
      }
    },
    connection: {
      async index(params) {
        const search = params.search()
        if (!search) return { results: [], count: 0 }

        const classNames = [
          'Ticket',
          'Event',
          'Quote',
          'Order',
          'ServiceObject',
          'Document',
          'Contract',
        ]

        const rawResults = searchLocalStorageDataConnections(search, classNames)

        const results = await Promise.all(
          rawResults.map(async ({ _id, className: entity, rawItem }) => {
            const title =
              ensureString(rawItem.title) || ensureString(rawItem.keyword)

            return { _id, entity, title, url: await calculateUrl(_id, entity) }
          }),
        )

        return { results, count: results.length }
      },
    },
  })
}

async function calculateUrl(_id: string, className: string): Promise<string> {
  const detailsPage = await load(() =>
    Obj.where('_dataParam', 'equals', className).first(),
  )
  return detailsPage
    ? urlFor(detailsPage, { query: `${snakeCase(className)}_id=${_id}` })
    : ''
}
