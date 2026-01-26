import rootApi, { IPage } from "./api";

export interface IServiceHistory {
  id: number;
  code: string;
  residentId: number;
  residentName: string;
  phoneNumber: string;
  note: string;
  paymentMethod: number;
  totalAmount: number;
  status: number;
  registrationDate: string;

  paymentDate?: string;
  cancelReason?: string;
  cancelDate?: string;
  details?: {
    id: number;
    quantity: number;
    registrationDate: string | null;
    timeStart: string; // HH:mm
    timeEnd: string;   // HH:mm
    unitPrice: number;
    totalPrice: number;
    utilityPackageDetailId: number;
    utilityPackageId: number;
    utilityPackageName: string;
    utilityRegistrationId: number;
    utilityServiceId: number;
    utilityServiceName: string;
  }[];
}

export interface IService {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  limitByApartment: number;
  limitRound: number;
  preRegisterMin: number;
  preRegisterMax: number;
  limitByResident?: number;
  currentRegisByApartment?: number;
  currentRegisByResident?: number;
}

export interface UtilityPackageDetail {
  id: number;
  utilityPackageId: number;
  utilityPackageName: string;
  timeStart: string; // HH:mm:ss
  timeEnd: string;   // HH:mm:ss
  price: number;
  limitRegister: number;
  currentRegister: number;
  status: number;
}

export interface PackageService {
  id: number;
  utilityServiceId: number;
  utilityServiceName: string | null;
  name: string;
  effectiveDate: string; // yyyy-MM-dd
  roundLimit: number;
  status: number;
  details: UtilityPackageDetail[];
}

export interface IPackageServiceData {
  phoneNumber: string,
  paymentMethod: number,
  note?: string,
  details: {
    utilityPackageDetailId: number,
    quantity: number,
    registrationDate: string
  }[]
}

const path = {
  getServices: "/utility-management/service",
  getServiceDetail: "/utility-management/service/",
  getPackageServices: "/utility-management/package/by-service/",
  createPackageService: "/utility-management/registration",
  getServicesHistory: "/utility-management/registration"
};

const getServices = async () => {
  return await rootApi<IService[]>(
    {
      url: path.getServices,
      method: "get",
    },
  );
};

const getServicesHistory = async (page: IPage) => {
  return await rootApi<IServiceHistory[]>(
    {
      url: path.getServicesHistory,
      method: "get",
      params: page
    },
  );
};

const getServiceDetail = async (id: number) => {
  return await rootApi<IService>(
    {
      url: path.getServiceDetail + id,
      method: "get",
    },
  );
};

const getPackageServices = async (serviceId: number) => {
  return await rootApi<PackageService[]>(
    {
      url: path.getPackageServices + serviceId,
      method: "get",
    },
  );
};

const createPackageService = async (data: IPackageServiceData) => {
  return await rootApi<PackageService[]>(
    {
      url: path.createPackageService,
      method: "post",
      data: data
    },
  );
};

export {
  createPackageService,
  getPackageServices,
  getServiceDetail,
  getServices,
  getServicesHistory
};

