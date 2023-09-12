import { provideWidgetClass } from 'scrivito'

export const YoutubeVideoWidget = provideWidgetClass('YoutubeVideoWidget', {
  attributes: {
    youtubeVideoId: 'string',
    aspectRatio: [
      'enum',
      { values: ['21:9', '16:9', '4:3', '1:1', '3:4', '9:16'] },
    ],
  },
})
