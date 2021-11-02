function transformName(name) {
  const transformed = name.split('').map((el, idx) => {
    if (idx === 0 || idx === 1 || idx === name.length - 1) {
      return el
    }
    return '*'
  })
  return transformed.join('')
}

export default function (name) {
  const splitted = name.split(' ')
  const hint = []
  splitted.forEach((el) => {
    const transformed = transformName(el)
    hint.push(transformed)
  })
  return hint.join(' ')
}
