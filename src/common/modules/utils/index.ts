export async function fetcher(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('fetched', data)
    return data;
  } catch (error) {
    console.error('fetcher', error)
    return false;
  }
}