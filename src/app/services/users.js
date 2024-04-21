import { postRequest } from "./_base.js";

export const fetchLogin = async function (username, password) {
  let data = {
    username,
    password,
  };

  let result = await postRequest("users/login", data);

  return result.data;
};
