const minMax = new RegExp(/(\()(?:[a-z][a-z]+)(-)((?:[a-z][a-z]+))?(-)?((?:[a-z][a-z]+))(:)(\s?)(\d+)((?:[a-z][a-z]+))\)/)
const orientation = new RegExp(/(\()(orientation)(:)(\s?)((?:[a-z][a-z]+))(\))/)

export default function (query) {
  return query === 'all' || minMax.test(query) || orientation.test(query)
}
