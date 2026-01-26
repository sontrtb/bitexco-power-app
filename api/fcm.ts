import rootApi from "./api";

interface IFcmData {
  fcmToken: string;
  deviceType: string;
  deviceName: string;
  deviceId: string;
}

const path = {
  fcmRegister: "/fcm/register",
  fcmUnregister: "/fcm/unregister"
};

const fcmRegister = async (data: IFcmData) => {
  return await rootApi(
    {
      url: path.fcmRegister,
      method: "post",
      data: data
    },
  );
};

const fcmUnregister = async (data: IFcmData) => {
  return await rootApi(
    {
      url: path.fcmUnregister,
      method: "post",
      data: data
    },
  );
};

export {
  fcmRegister,
  fcmUnregister
};

