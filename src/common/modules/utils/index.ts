export async function fetcher(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('fetcher', error)
    return error;
  }
}