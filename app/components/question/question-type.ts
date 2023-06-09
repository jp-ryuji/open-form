export const questionTypeText = {
  short: 'short',
  long: 'long',
}

export const questionTypeMultipleOptions = {
  radio: 'radio',
  checkbox: 'checkbox',
  pulldown: 'pulldown',
}

export const questionType = {
  ...questionTypeText,
  ...questionTypeMultipleOptions,
}
