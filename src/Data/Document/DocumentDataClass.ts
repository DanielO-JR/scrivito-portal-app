import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Document = provideDataClass(
  'Document',
  (async () => {
    const restApi = await pisaConfig('document')
    if (!restApi) {
      return (await import('./documentParamsFallback')).documentParamsFallback()
    }

    return { restApi }
  })(),
)
