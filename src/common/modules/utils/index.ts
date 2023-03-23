export async function fetcher(url: string) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('fetcher', error)
    return false;
  }
}

export function sanitize(v) {
  function sanitize(v) {
    if (v instanceof Object) {
      for (var key in v) {
        if (/^\$/.test(key)) {
          delete v[key];
        } else {
          sanitize(v[key]);
        }
      }
    }
    return v;
  };
  module.exports = sanitize;
}