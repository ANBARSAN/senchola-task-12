import axios from "axios";

const baseUrlA = "https://64159af08b5d06e4a7b2ae3f.mockapi.io/"
// 22 remove callback only return respone 
export const makeRequest = (method, endpoint, data) => { 
  return axios({
    method: method,
    url: `${baseUrlA}${endpoint}`,
    data: data,
  })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

