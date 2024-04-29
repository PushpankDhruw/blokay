import { postRequest } from "./_base";

let token: string | null = null;
if (typeof window != "undefined") {
  token = window.localStorage.getItem("token");
}

export const fetchUsers = async function () {
  let data = {};

  let result = await postRequest("users/list", data, { token });

  return result.data;
};

export const fetchUser = async function (userId: number) {
  let data = { userId };

  let result = await postRequest("users/get", data, { token });

  return result.data;
};

export const fetchAddUser = async function (form: any) {
  let data = { ...form };

  let result = await postRequest("users/add", data, { token });

  return result.data;
};

export const fetchUpdateUser = async function (form: any) {
  let data = { ...form };

  let result = await postRequest("users/edit", data, { token });

  return result.data;
};
