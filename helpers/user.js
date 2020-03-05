import * as R from 'ramda'

export const hideUserSensitiveProps = R.ifElse(
  R.isNil,
  R.always({}),
  R.pick(['_id', 'name', 'email']))
