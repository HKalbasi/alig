export const getFromApi = async (x) => {
  const res = await fetch(`/rest/${x}`);
  return res.json();
}