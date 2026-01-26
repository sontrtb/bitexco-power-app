import { useApartment } from "@/stores/useApartments";
import { useAuth } from "@/stores/useAuth";

const uploadFile = async (file: File): Promise<string> => {
  const apartmentSelect = useApartment.getState().apartmentSelect;

  const user = useAuth.getState().user
  const initToken = user?.accessToken

  const headers = {
    'Authorization': `Bearer ${initToken}`,
    "X-Domain-Id": `${apartmentSelect?.domainId}`,
    "X-Apartment-Id": `${apartmentSelect?.apartmentId}`,
  };

  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch(process.env.EXPO_PUBLIC_FILE_BASE_URL ?? "", {
    method: 'POST',
    headers: headers,
    body: formData
  });
  const responseData = await response.json();

  return responseData.data;
};

// const deleteFile = async (path: string) => {
//   return await rootApi<INews[]>(
//     {
//       url: path.getNews,
//       method: "get",
//       params: page
//     },
//   );
// };


export { uploadFile };

