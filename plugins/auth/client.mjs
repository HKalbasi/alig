/* eslint-disable immutable/no-mutation */
export const getToken = async () => {
  const div = document.createElement('div');
  div.style = `
  background: rgb(0,0,0,.29);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  `;
  const dialog = document.createElement('div');
  dialog.style = `
  position: absolute;
  height: 50%;
  width: 50%;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  `;
  let mode = 'jwt';
  const header = document.createElement('h4');
  header.innerText = 'Sign in';
  header.className = 'ui top attached header center';
  dialog.appendChild(header);
  const form = document.createElement('div');
  form.className = 'ui attached segment form';
  const label = document.createElement('label');
  form.appendChild(label);
  const input = document.createElement('input');
  input.type = 'text';
  form.appendChild(input);
  const button = document.createElement('button');
  button.className = 'ui green button';
  form.appendChild(button);
  const swich = document.createElement('button');
  swich.className = 'ui purple button';
  form.appendChild(swich);
  dialog.appendChild(form);
  div.appendChild(dialog);
  document.body.appendChild(div);
  const setMode = (newMode) => {
    mode = newMode;
    if (mode === 'jwt') {
      button.innerText = 'Submit';
      swich.innerText = 'I have no token';
      label.innerText = 'Paste your token here: ';
      input.value = '';
      input.placeholder = 'xxx.yyy.zzz';
    } else {
      button.innerText = 'Send email';
      swich.innerText = 'I have token';
      label.innerText = 'Enter your name and email: ';
      input.value = '';
      input.placeholder = 'example<alpha@beta.com>';
    }
  };
  setMode(mode);
  swich.onclick = () => {
    if (mode === 'jwt') mode = 'email';
    else mode = 'jwt';
    setMode(mode);
  };
  return new Promise((res) => {
    button.onclick = async () => {
      if (mode === 'jwt') {
        document.body.removeChild(div);
        res({
          success: true,
          token: input.value,
          data: {
            name: 'hamid@boz',
            email: 'boz',
          },
        });
      } else {
        const [name, rest] = input.value.split('<');
        const [email] = rest.split('>');
        await fetch("/auth/email", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
          }),
        });
        setMode('jwt');
      }
    };
  });
};
