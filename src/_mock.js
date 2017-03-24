export const translate = (input) => input
export const t = (input) => input
export const tNumber = (input) => input

export function tPlural (messages, options) {
  if (options.count === 1) {
    return messages.one
  }

  return messages.many
}

export function tDate (date) {
  return date.toString()
}
