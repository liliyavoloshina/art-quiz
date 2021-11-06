const getData = async (type) => {
  const res = await fetch(`/data/${type}.json`)
  const data = await res.json()
  return data
}

export default getData
