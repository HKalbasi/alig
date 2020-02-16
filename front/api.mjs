export const getFromApi = async (x) => {
  const jwt = localStorage.getItem('jwt');
  const res = jwt === undefined
    ? await fetch(`/rest/${x}`)
    : await fetch(`/rest/${x}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  if (res.status !== 200) throw new Error(`fetch(/rest/${x}) failed: ${res.status}`);
  return res.json();
};
