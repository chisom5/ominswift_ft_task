import axios from "axios";

export const authHttpRequest = async (
  url,
  data = {},
  method,
  params = {}
) => {
  const res = await axios({
    url,
    method,
    data,
    params,
    headers: {
      Accept: "application/json, text/plain */*",
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const makeHttpRequest = async (
  url,
  data = {},
  method,
  params = {}
) => {
  

  const res = await axios({
    url,
    data,
    method,
    params,
    headers: {
      Accept: "application/json, text/plain */*",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${activeUser.data.token}`,
      Pragma: "no-cache",
    },
  });
  return res;
};

export const makeFormDataHttpRequest = async (
  url,
  data = {},
  method,
  params = {}
) => {
 

  const res = await axios({
    url,
    data,
    method,
    params,
    headers: {
      "Content-Type": "multipart/form-data",
      Pragma: "no-cache",
    },
  });
  return res;
};

