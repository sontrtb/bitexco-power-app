import { getServicesHistory, IServiceHistory } from "@/api/services";
import FlatListLazy from "@/components/commons/FlatListLazy";

import HistoriesServiceItem from "./components/HistoriesServiceItem";

function HistoriesService() {
    return (
        <FlatListLazy<IServiceHistory>
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <HistoriesServiceItem item={item} />}
            queryKey={["getServicesHistory"]}
            queryFn={getServicesHistory}
        />
    );
}

export default HistoriesService;

