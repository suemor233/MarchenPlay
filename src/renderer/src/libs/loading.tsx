export async function RootLoader() {
  const data = await fetch('https://server.suemor.com/api/v2')
  return data.json()
}
