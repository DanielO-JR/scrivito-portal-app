import { pisaClient, pisaUrl } from '../Data/pisaClient'
import { FullDataBinary } from './dataBinaryToUrl'

export async function pisaDataBinaryToUrl(
  binary: FullDataBinary,
): Promise<{ url: string; maxAge: number }> {
  const dataBinaryClient = await pisaClient('binary-access-token')
  const accessTokens = await dataBinaryClient.get(binary._id)
  if (!isAccessToken(accessTokens)) {
    throw new Error(`Unexpected result: ${JSON.stringify(accessTokens)}`)
  }

  return {
    url: (await pisaUrl()) + accessTokens.accessToken,
    maxAge: accessTokens.maxAge,
  }
}

interface AccessToken {
  accessToken: string
  maxAge: number
}

function isAccessToken(item: unknown): item is AccessToken {
  if (!item) return false
  if (typeof item !== 'object') return false

  const accessToken = item as AccessToken
  return (
    typeof accessToken.accessToken === 'string' &&
    typeof accessToken.maxAge === 'number'
  )
}
