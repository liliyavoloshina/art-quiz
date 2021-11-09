const getData = async (type, lang) => {
  const res = await fetch(`/data/${type}-${lang}.json`)
  const data = await res.json()
  return data
}

export default getData
