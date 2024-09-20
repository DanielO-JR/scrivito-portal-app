import { provideDataClass } from 'scrivito'

export const EmptyDataAttributes = provideDataClass('EmptyDataAttributes', {
  connection: {
    async index() {
      return {
        results: ['1'],
      }
    },
    async get() {
      return {
        my_boolean: '',
        my_boolean_null: null,
        my_date: '',
        my_date_null: null,
        my_enum: '',
        my_enum_null: null,
        my_number: '',
        my_number_null: null,
        my_reference: '',
        my_reference_null: null,
        my_string: '',
        my_string_null: null,
      }
    },
  },
  attributes: {
    my_boolean: 'boolean',
    my_boolean_null: 'boolean',
    my_date: 'date',
    my_date_null: 'date',
    my_enum: ['enum', { values: ['value1', 'value2'] }],
    my_enum_null: ['enum', { values: ['value1', 'value2'] }],
    my_number: 'number',
    my_number_null: 'number',
    my_reference: ['reference', { to: 'User' }],
    my_reference_null: ['reference', { to: 'User' }],
    my_string: 'string',
    my_string_null: 'string',
  },
})
