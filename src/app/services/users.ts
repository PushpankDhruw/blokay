import { postRequest } from "./_base";

export const fetchLogin = async function (username: string, password: string) {
  let data = {
    username,
    password,
  };

  let result = await postRequest("users/login", data);

  return result.data;
};
