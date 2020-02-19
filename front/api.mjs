export const getFromApi = async (x, body = {}) => {
  const jwt = localStorage.getItem('jwt');
  const headersWithoutAuth = {
    'Content-Type': 'application/json',
  };
  const headers = jwt === undefined ? headersWithoutAuth : {
    ...headersWithoutAuth,
    Authorization: `Bearer ${jwt}`,
  };
  const params = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  };
  const res = await fetch(`/rest/${x}`, params);
  if (res.status !== 200) throw new Error(`fetch(/rest/${x}) failed: ${res.status}`);
  return res.json();
};
