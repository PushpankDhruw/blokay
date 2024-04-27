import { postRequest } from "./_base";

let token: string | null = null;
if (typeof window != "undefined") {
  token = window.localStorage.getItem("token");
}

export const fetchDatasources = async function () {
  let data = {};

  let result = await postRequest("datasources/list", data, { token });

  return result.data;
};

export const fetchUpdateDatasources = async function (form = {}) {
  let data = { ...form };

  let result = await postRequest("datasources/update", data, { token });

  return result.data;
};

export const fetchCreateDatasource = async function (form = {}) {
  let data = { ...form };

  let result = await postRequest("datasources/create", data, { token });

  return result.data;
};
