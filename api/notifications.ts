import rootApi from "./api";

export interface INotification {
  id: number;
  residentId: number;
  code: string;
  title: string;
  content: string;
  detailContent: string; // HTML string
  thumbnail: string;
  locationId: number | null;
  attachment: string;
  status: number;
  notificationTriggerTime: Date;
}


const path = {
  getNotifications: "/notification",
  getNotificationDetail: "/notification/",
  markAsReadNotification: (notificationId: number) => `/notification/${notificationId}/mark-as-read`,
  markAllAsReadNotification: "/notification/mark-all-as-read",
  getCountNotifications: "/notification/count-unread"
};

const getNotifications = async () => {
  return await rootApi<INotification[]>(
    {
      url: path.getNotifications,
      method: "get",
    },
  );
};

const getCountNotifications = async () => {
  return await rootApi<number>(
    {
      url: path.getCountNotifications,
      method: "get",
    },
  );
};

const getNotificationDetail = async (id: number) => {
  return await rootApi<INotification>(
    {
      url: path.getNotificationDetail + id,
      method: "get",
    },
  );
};

const markAsReadNotification = async (id: number) => {
  return await rootApi<INotification>(
    {
      url: path.markAsReadNotification(id),
      method: "put",
    },
  );
};

const markAllAsReadNotification = async () => {
  return await rootApi(
    {
      url: path.markAllAsReadNotification,
      method: "put",
    },
  );
};

export {
  getCountNotifications, getNotificationDetail,
  getNotifications,
  markAllAsReadNotification,
  markAsReadNotification
};

