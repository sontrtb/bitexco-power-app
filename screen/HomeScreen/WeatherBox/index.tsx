import { getPM25 } from '@/api/weather';
import ModalConfirm from '@/components/ui/ModalConfirm';
import Row from '@/components/ui/Row';
import SpaceUi from '@/components/ui/SpaceUi';
import TextUi from '@/components/ui/TextUi';
import { vietNamCities } from '@/configs/vietnam-cities';
import { haversineDistance } from '@/lib/location';
import { useTheme } from '@/stores/useTheme';
import { PADDING_PAGE } from '@/theme/layout';
import Entypo from '@expo/vector-icons/Entypo';
import { useQuery } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { GlassView } from 'expo-glass-effect';
import { ImageBackground } from 'expo-image';
import * as Location from 'expo-location';
import moment from 'moment';
import 'moment/locale/vi';
import { useEffect, useMemo, useState } from 'react';
import { Dimensions, Platform, StyleSheet } from "react-native";

const statusBarHeight = Constants.statusBarHeight;
const windowWidth = Dimensions.get('window').width;

moment.locale('vi');

const getPM25Color = (pm25: number): string => {
    if (pm25 < 50.1) return '#10B981';
    if (pm25 < 100.1) return '#F59E0B';
    if (pm25 < 150.1) return '#F97316';
    if (pm25 < 200.1) return '#EF4444';
    if (pm25 < 300.1) return '#8B5CF6';
    return '#7C2D12';
};

function WeatherBox() {
    const { theme } = useTheme()
    const isDark = theme === "dart"

    const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
    const [currentDate, setCurrentDate] = useState(moment().format('dddd, DD [tháng] MM, YYYY'));

    const [openModalLocation, setOpenModalLocation] = useState(false)
    const [location, setLocation] = useState<Location.LocationObject>()
    const [cityName, setCityName] = useState<string>()

    useEffect(() => {
        const updateDateTime = () => {
            setCurrentTime(moment().format('HH:mm'));
            const dateStr = moment().format('dddd, DD [tháng] MM, YYYY');
            setCurrentDate(dateStr.charAt(0).toUpperCase() + dateStr.slice(1));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // pm2.5
    const citySelect = useMemo(() => {
        if (!location) return;

        let city = vietNamCities[0]
        let distance = haversineDistance(
            location.coords.latitude,
            location.coords.longitude,
            city.latitude,
            city.longitude
        );
        for (let i = 1; i < vietNamCities.length; i++) {
            const distanceTmp = haversineDistance(
                location.coords.latitude,
                location.coords.longitude,
                vietNamCities[i].latitude,
                vietNamCities[i].longitude
            )

            if (distanceTmp < distance) {
                distance = distanceTmp
                city = vietNamCities[i]
            }
        }

        return city
    }, [location])

    const getPM25Query = useQuery({
        queryFn: () => getPM25({ region: citySelect!.name }),
        enabled: !!citySelect,
        queryKey: ["getPM25", location]
    })

    async function getCurrentLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setOpenModalLocation(false);
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location)

        const res = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        if (res[0]?.region) {
            setCityName(res[0]?.region)
        }

        setOpenModalLocation(false);
    }

    async function checkAndRequestLocation() {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === 'granted') {
            // Đã có quyền, lấy vị trí luôn
            getCurrentLocation();
        } else {
            // Chưa có quyền, hiển thị modal trên Android
            if (Platform.OS === 'android') {
                setOpenModalLocation(true);
            } else {
                // iOS thì request luôn
                getCurrentLocation();
            }
        }
    }

    useEffect(() => {
        checkAndRequestLocation();
    }, [])

    return (
        <ImageBackground
            style={styles.root}
            source={{
                uri: "https://cdn2.tuoitre.vn/thumb_w/480/2020/6/25/photo-1-15930621693272126964820.jpg"
            }}
            imageStyle={{
                objectFit: "contain"
            }}
        >
            <GlassView
                style={[
                    styles.weatherCard,
                ]}
                glassEffectStyle="clear"
            >
                <Row>
                    <TextUi allowFontScaling={false} style={[styles.textTime, { color: isDark ? "#000" : "#fff" }]}>{currentTime}</TextUi>
                    <TextUi allowFontScaling={false} style={[styles.textDate, { color: isDark ? "#000" : "#fff" }]}>{currentDate}</TextUi>
                </Row>
                <SpaceUi height={12} />
                <Row>
                    {
                        getPM25Query.data?.data.pm2_5 &&
                        <Row style={{ gap: 8, alignItems: 'center' }}>
                            <TextUi allowFontScaling={false} style={[styles.textTemperature, { color: isDark ? "#000" : "#fff" }]}>PM2.5:</TextUi>
                            <TextUi
                                allowFontScaling={false}
                                style={[styles.textTemperature, {
                                    fontWeight: "700",
                                    color: getPM25Color(getPM25Query.data?.data.pm2_5),
                                    backgroundColor: "#fff",
                                    paddingHorizontal: 6,
                                    paddingVertical: 3,
                                    borderRadius: 8,
                                    overflow: 'hidden'
                                }]}
                            >
                                {getPM25Query.data?.data.pm2_5}
                            </TextUi>
                            <TextUi allowFontScaling={false} style={[styles.textTemperature, { color: isDark ? "#000" : "#fff" }]}>µg/m³</TextUi>
                        </Row>
                    }

                    {
                        cityName &&
                        <Row>
                            <Entypo name="location" size={20} color={isDark ? "#000" : "#fff"} />
                            <TextUi allowFontScaling={false} style={[styles.textDate, { color: isDark ? "#000" : "#fff" }]}>{cityName}</TextUi>
                        </Row>
                    }

                </Row>
            </GlassView>

            <ModalConfirm
                open={openModalLocation}
                setOpen={setOpenModalLocation}
                title="Cấp quyền vị trí"
                des="Ứng dụng cần quyền vị trí để lấy thông tin thời tiết hiện tại"
                onOk={getCurrentLocation}
            />
        </ImageBackground>
    )
}

export default WeatherBox

const styles = StyleSheet.create({
    root: {
        height: windowWidth / 5 * 4,
        width: windowWidth,
        paddingHorizontal: PADDING_PAGE,
        paddingTop: statusBarHeight
    },
    content: {

    },
    textTime: {
        fontSize: 28,
        fontWeight: "600",
    },
    textDate: {
        fontSize: 16
    },
    textTemperature: {
        fontSize: 16,
        fontWeight: "600",
    },
    weatherCard: {
        paddingHorizontal: PADDING_PAGE,
        paddingVertical: 12,
        borderRadius: 16,
        marginTop: 16,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
    },
    iconWeather: {
        height: 32,
        width: 32
    }
})