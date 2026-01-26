import rootApi from "./api";

interface IVersion {
  androidVersion: string;
  iosVersion: string;
}

const path = {
  getVersion: "/auth/rapp-version",
};

const getVersion = async () => {
  return await rootApi<IVersion>(
    {
      url: path.getVersion,
      baseURL: process.env.EXPO_PUBLIC_BASE_URL + '/api',
      method: "get",
    },
  );
};

export {
    getVersion
};

