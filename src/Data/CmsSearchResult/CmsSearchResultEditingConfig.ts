import { provideEditingConfig } from 'scrivito'
import { CmsSearchResult } from './CmsSearchResultDataClass'

provideEditingConfig(CmsSearchResult, {
  attributes: {
    image: { title: 'image' },
  },
})
