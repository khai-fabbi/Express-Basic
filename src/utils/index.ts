import _ from 'lodash'

export function pickFields<T>(fields: (keyof T)[], obj: T): Partial<T> {
  return _.pick(obj, fields)
}
