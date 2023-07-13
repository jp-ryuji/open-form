export const QUESTION_TYPE_TEXT = {
  short: 'short',
  long: 'long',
}

export const QUESTION_TYPE_MULTIPLE_OPTIONS = {
  radio: 'radio',
  checkbox: 'checkbox',
  pulldown: 'pulldown',
}

export const QUESTION_TYPE = {
  ...QUESTION_TYPE_TEXT,
  ...QUESTION_TYPE_MULTIPLE_OPTIONS,
}
