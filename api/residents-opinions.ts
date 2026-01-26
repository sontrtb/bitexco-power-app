import rootApi, { IPage } from "./api";

export interface IResidentCommentResponse {
  id: number;
  commentId: number;
  content: string;
  imagePath: string;
  createdByName: string;
  createdAt: Date;
}

export interface IResidentComment {
  id: number;
  apartmentCode: string | null;
  title: string;
  content: string;
  type: string;
  status: number;
  phoneNumber: string | null;
  imagePath: string | null;
  createdByName: string;
  createdAt: Date;
  responses: IResidentCommentResponse[];
}

export interface IResidentCommentBody {
  title: string;
  content: string;
  type: string;
  phoneNumber: string;
  imagePath?: string;
}

export interface IResidentResponseCommentBody {
  content: string;
  imagePath?: string;
}

const path = {
  getResidentComments: "/resident-comment?count=true",
  getResidentCommentDetail: "/resident-comment/",
  createResidentComments: "/resident-comment",
  createResponseResidentComments: (id: number) => `/resident-comment/${id}/response`
};

const getResidentComments = async (page: IPage, status?: number) => {
  return await rootApi<IResidentComment[]>(
    {
      url: path.getResidentComments,
      method: "get",
      params: {...page, status: status}
    },
  );
};

const getResidentCommentDetail = async (id: number) => {
  return await rootApi<IResidentComment>(
    {
      url: path.getResidentCommentDetail + id,
      method: "get",
    },
  );
};

const createResidentComments = async (data: IResidentCommentBody) => {
  return await rootApi<IResidentComment[]>(
    {
      url: path.createResidentComments,
      method: "post",
      data: data
    },
  );
};

const createResponseResidentComments = async (id: number, data: IResidentResponseCommentBody) => {
  return await rootApi(
    {
      url: path.createResponseResidentComments(id),
      method: "post",
      data: data
    },
  );
};

export {
  createResidentComments, createResponseResidentComments, getResidentCommentDetail,
  getResidentComments
};

