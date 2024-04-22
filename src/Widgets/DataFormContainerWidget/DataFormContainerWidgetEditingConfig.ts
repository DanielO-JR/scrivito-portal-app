import { provideEditingConfig } from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { DataFormInputFieldWidget } from '../DataFormInputFieldWidget/DataFormInputFieldWidgetClass'
import { DataFormSubmitButtonWidget } from '../DataFormSubmitButtonWidget/DataFormSubmitButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormContainerWidget, {
  title: 'Data Form',
  thumbnail: Thumbnail,
  attributes: {
    redirectAfterSubmit: {
      title: 'Redirect after submit?',
      description:
        'Redirects to the details page of this data item after create/update.',
    },
    submitOnChange: {
      title: 'Submit on change?',
      description: 'Automatically submits the form when any input changes.',
    },
    submittedMessage: {
      title: 'Submitted message',
      description: 'After submitting the form, the user will see this message.',
    },
    failedMessage: {
      title: 'Message shown if the form submission failed',
    },
    hiddenFields: {
      title: 'Hidden fields',
    },
  },
  properties: [
    'redirectAfterSubmit',
    'submittedMessage',
    'failedMessage',
    'submitOnChange',
  ],
  propertiesGroups: [
    {
      title: 'Hidden fields',
      key: 'DataFormContainerWidgetHiddenFields',
      properties: ['hiddenFields'],
    },
  ],
  initialContent: {
    content: [
      new DataFormInputFieldWidget({}),
      new DataFormSubmitButtonWidget({}),
    ],
    failedMessage: 'We’re sorry for the inconvenience.',
    redirectAfterSubmit: true,
  },
})
