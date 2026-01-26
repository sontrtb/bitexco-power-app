import rootApi from "./api";

interface IHotline {
    function?: string;
    contactPoint?: string;
    hotline?: string;
    id: number
}


const path = {
  getHotline: "/hotline"
};

const getHotline = async () => {
  return await rootApi<IHotline[]>(
    {
      url: path.getHotline,
      method: "get",
    },
  );
};


export { getHotline };

