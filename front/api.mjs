export const getFromApi = async (x) => {
  const res = await fetch(`/rest/${x}`);
  if (res.status !== 200) throw new Error(`fetch(/rest/${x}) failed: ${res.status}`);
  return res.json();
};
