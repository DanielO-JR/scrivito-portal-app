import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { isJwtTokenProvided } from '../pisaClientJwt'
import { pisaGdprDataClassJwt } from './pisaGdprDataClassJwt'

export const Gdpr = isJwtTokenProvided()
  ? pisaGdprDataClassJwt
  : provideDataClass(
      'Gdpr',
      (async () => {
        const restApi = await pisaConfig('gdpr')
        if (!restApi) {
          return (await import('./gdprParamsFallback')).gdprParamsFallback()
        }

        return { restApi }
      })(),
    )
