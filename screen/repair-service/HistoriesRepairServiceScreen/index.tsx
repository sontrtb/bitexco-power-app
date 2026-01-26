import { getRepairService, getRepairServiceHistory, IRepairServiceHis } from "@/api/repair-service";
import FlatListLazy from "@/components/commons/FlatListLazy";
import { useQuery } from "@tanstack/react-query";
import HistoriesRepairItem from "./components/HistoriesRepairItem";

function HistoriesRepairServiceScreen() {
    const getRepairServiceQuery = useQuery({
        queryKey: ["getRepairService"],
        queryFn: getRepairService
    })

    const renderRepairService = (id: number) => {
        return getRepairServiceQuery.data?.data.find(r => r.id === id)
    }


    return (
        <FlatListLazy<IRepairServiceHis>
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <HistoriesRepairItem
                    item={item}
                    renderRepairService={renderRepairService}
                />
            )}
            queryKey={["getRepairServiceHistory"]}
            queryFn={getRepairServiceHistory}
        />
    )
}

export default HistoriesRepairServiceScreen
