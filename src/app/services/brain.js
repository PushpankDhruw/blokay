import { postRequest } from "./_base.js";

let token = null;
if (typeof window != "undefined") {
  token = window.localStorage.getItem("token");
}
export const brainGet = async function ({ neuronId = null, neuronKey = null }) {
  let data = {
    neuronId,
    neuronKey,
  };

  let result = await postRequest("brain/get", data, { token });

  return result.data;
};

export const viewGet = async function (slug) {
  let data = {
    slug,
  };

  let result = await postRequest("brain/views/get", data, { token });

  return result.data;
};

export const saveView = async function (form) {
  let data = {
    ...form,
  };

  let result = await postRequest("brain/views/save", data, { token });

  return result.data;
};

export const addView = async function (form) {
  let data = {
    ...form,
  };

  let result = await postRequest("brain/views/add", data, { token });

  return result.data;
};

export const newNeuron = async function (form) {
  let data = {
    ...form,
  };

  let result = await postRequest("brain/newNeuron", data, { token });

  return result.data.Neuron;
};

export const updateNeuron = async function (form) {
  let data = {
    ...form,
  };

  let result = await postRequest("brain/updateNeuron", data, { token });

  return result.data.Result;
};

export const rewriteFn = async function (form) {
  let data = {
    ...form,
  };

  let result = await postRequest("brain/rewriteFn", data, { token });

  return result.data.Result;
};

export const getNeuronAdmin = async function (neuronId) {
  let data = {
    neuronId,
  };

  let result = await postRequest("brain/admin-get", data, { token });

  return result.data.Neuron;
};

export const viewList = async function () {
  let data = {};

  let result = await postRequest("brain/views/list", data, { token });

  return result.data;
};

export const brainList = async function (group) {
  let data = {
    group,
  };

  let result = await postRequest("brain/list", data, { token });

  return result.data;
};

export const brainExec = async function (form) {
  let data = {
    ...form,
  };

  let result = await postRequest("brain/exec", data, { token });

  return result.data;
};
