import { Obj, createRestApiClient, currentLanguage, load } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

type PisaReqHeaders = {
  'Accept-Language': string
  Authorization?: string
}

export async function pisaUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  if (!isHomepage(defaultRoot)) return never()

  return defaultRoot.get('pisaUrl') || null
}

export async function pisaClient(subPath: string) {
  const config = await pisaConfig(subPath)
  if (!config) return null

  const { url, headers } = config

  return createRestApiClient(url, { headers })
}

export async function pisaConfig(subPath: string) {
  const baseUrl = await pisaUrl()
  if (!baseUrl) return null

  return {
    url: `${baseUrl}/${subPath}`,
    headers: {
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
    } as PisaReqHeaders,
  }
}

function never() {
  return new Promise<never>(() => {})
}
