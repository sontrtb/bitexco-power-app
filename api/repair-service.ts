import rootApi, { IPage } from "./api";

export interface IRepairServiceHis {
  id: number;
  code: string;
  description: string;
  phoneNumber: string;
  requestImage?: string;
  status: number;
  type: number;
  serviceId: number
}

export interface IRepairServiceDetailHis {
  id: number;
  code: string;
  residentId: number;
  apartmentId: number;
  serviceId: number;
  employeeId: number | null;
  phoneNumber: string;
  description: string;
  requestImage: string;
  status: number;
  registationDate: string; // YYYY-MM-DD
  type: number;
  handleDate: Date;
  completeDate: Date;
  response: string | null;
  responseImage: string | null;
  createdAt: Date; // ISO string
  updatedAt: Date; // ISO string
  createdBy: number;
  updatedBy: number;
}


export interface IRepairServiceData {
    serviceId: number;
    description: string;
    phoneNumber: string;
    requestImage?: string;
}

export interface IRepairService {
  id: number;
  code: string;
  name: string;
  description: string;
  imagePath?: string;
  status: number;
  details?: string;
}

const path = {
  getRepairService: "/repair-request/service",
  createRepairService: "/repair-request",
  getRepairServiceHistory: '/repair-request',
  getDetailRepairServiceHistory: '/repair-request/'
};

const getRepairService = async () => {
  return await rootApi<IRepairService[]>(
    {
      url: path.getRepairService,
      method: "get",
    },
  );
};

const getRepairServiceHistory = async (param: IPage) => {
  return await rootApi<IRepairServiceHis[]>(
    {
      url: path.getRepairServiceHistory,
      method: "get",
      params: param
    },
  );
};

const getDetailRepairServiceHistory = async (id: number) => {
  return await rootApi<IRepairServiceDetailHis>(
    {
      url: path.getDetailRepairServiceHistory + id,
      method: "get",
    },
  );
};

const createRepairService = async (data: IRepairServiceData) => {
  return await rootApi(
    {
      url: path.createRepairService,
      method: "post",
      data: data
    },
  );
};

export {
  createRepairService, getDetailRepairServiceHistory, getRepairService, getRepairServiceHistory
};

