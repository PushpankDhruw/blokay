import { postRequest } from "./_base";

let token: string | null = null;
if (typeof window != "undefined") {
  token = window.localStorage.getItem("token");
}

export const fetchLogin = async function (username: string, password: string) {
  let data = {
    username,
    password,
  };

  let result = await postRequest("auth/login", data);

  return result.data;
};

export const fetchRegister = async function (form: any) {
  let data = {
    ...form,
  };

  let result = await postRequest("auth/register", data);

  return result.data;
};
