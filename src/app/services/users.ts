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

  let result = await postRequest("users/login", data);

  return result.data;
};

export const fetchUsers = async function () {
  let data = {};

  let result = await postRequest("users/list", data, { token });

  return result.data;
};
