export default async (type, lang) => {
  const res = await fetch(`/data/${type}-${lang}.json`)
  const data = await res.json()
  return data
}
