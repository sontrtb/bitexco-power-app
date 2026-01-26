import CardUi from '@/components/ui/CardUi';
import ImageUi from "@/components/ui/ImageUi";
import Row from "@/components/ui/Row";
import TextUi from '@/components/ui/TextUi';
import { useAuth } from '@/stores/useAuth';
import { PADDING_PAGE } from '@/theme/layout';
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get('window').width;

function UserCard() {
    const { user } = useAuth()
    return (
        <CardUi style={styles.root}>
            <Row style={{justifyContent: "flex-start"}}>
                <ImageUi
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSAwtmhR_SC4mux-dZErc0HQmQExycuiTZ4w&s"
                    }}
                    style={styles.avt}
                />
                <View style={styles.content}>
                    <TextUi style={styles.title}>{user?.fullname}</TextUi>
                    <TextUi>{user?.username}</TextUi>
                </View>
            </Row>
        </CardUi>
    )
}

export default UserCard

const styles = StyleSheet.create({
    root: {
        
    },
    avt: {
      height: 70,
      width: 70,
      borderRadius: 35
    },
    title: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 8
    },
    content: {
        width: windowWidth - PADDING_PAGE * 2 - 100,
    }
})