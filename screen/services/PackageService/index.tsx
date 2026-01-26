import { getPackageServices, IService } from "@/api/services";
import CardUi from "@/components/ui/CardUi";
import ImageUi from "@/components/ui/ImageUi";
import RenderHtmlUi from "@/components/ui/RenderHtmlUi";
import Row from "@/components/ui/Row";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import { renderURLFile } from "@/lib/file";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

function PackageService() {
    const { id, otherParam } = useLocalSearchParams();
    const service = JSON.parse(otherParam as string) as IService

    const color = useColor()

    const router = useRouter()

    const getPackageServicesQuery = useQuery({
        queryKey: ["getPackageServices", id],
        queryFn: () => getPackageServices(Number(id))
    })

    return (
        <ScrollView contentContainerStyle={[styles.root, {backgroundColor: color.bg}]}>
            <Row style={{ justifyContent: "flex-start" }}>
                <View style={[
                    styles.iconWrap,
                    {
                        backgroundColor: color.bgImage
                    }
                ]}>
                    <ImageUi
                        source={{
                            uri: renderURLFile(service.image)
                        }}
                        style={[styles.icon]}
                    />
                </View>
                <TitleUi style={{ fontSize: 24 }}>{service.name}</TitleUi>
            </Row>

            <CardUi title="Giới thiệu">
                <RenderHtmlUi htmlString={service?.description}/>
            </CardUi>

            <TitleUi style={{ marginTop: 20 }}>Gói dịch vụ:</TitleUi>

            {
                getPackageServicesQuery.data?.data.map((p) => (
                    <TouchableOpacityUi
                        key={p.id}
                        disabled={p.status === 0}
                        onPress={() => {
                            router.push({
                                pathname: '/services/book-service/[id]',
                                params: {
                                    id: p.id,
                                    otherParam: JSON.stringify({
                                        dataPackage: p,
                                        dataService: service
                                    })
                                },
                            })
                        }}
                    >
                        <CardUi style={p.status === 0 ? { backgroundColor: color.disable } : {}}>
                            <Row>
                                <TextUi>{p.name}</TextUi>
                                <Feather name="external-link" size={20} color={color.primary} />
                            </Row>
                        </CardUi>
                    </TouchableOpacityUi>
                ))
            }
        </ScrollView >
    )
}

export default PackageService

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE
    },
    package: {

    },
    iconWrap: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
    },
    icon: {
        width: 30,
        height: 30,
    },
})