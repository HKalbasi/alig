export const getFromApi = async (x) => {
  const res = await fetch(`/rest/${x}`);
  if (res.status !== 200) throw new Error(`fetch failed: ${res.status}`);
  return res.json();
}