import rootApi, { IPage } from "./api";

export interface INews {
  id: number;
  createdAt?: Date;
  title?: string;
  summary?: string;
  content?: string;
  thumbnail?: string;
  attachment?: string;
}


const path = {
  getNews: "/news?count=true",
  getNewsDetail: "/news/"
};

const getNews = async (page: IPage) => {
  return await rootApi<INews[]>(
    {
      url: path.getNews,
      method: "get",
      params: page
    },
  );
};

const getNewsDetail = async (id: number) => {
  return await rootApi<INews>(
    {
      url: path.getNewsDetail + id,
      method: "get",
    },
  );
};

export {
  getNews,
  getNewsDetail
};

