import rootApi from "./api";

interface IVersion {
  androidVersion: string;
  iosVersion: string;
}

const path = {
  getTemperature: "/weather/temperature",
  getPM25: "/weather/pm25"
};

const getTemperature = async (params: {region: string}) => {
  return await rootApi<IVersion>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.getTemperature,
      method: "get",
      params: params
    },
  );
};

const getPM25 = async (params: {region: string}) => {
  return await rootApi<{pm2_5: number}>(
    {
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      url: path.getPM25,
      method: "get",
      params: params
    },
  );
};

export {
  getPM25, getTemperature
};

