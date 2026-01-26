import { createPackageService, IPackageServiceData, IService, PackageService } from "@/api/services";
import ButtonUi from "@/components/ui/ButtonUi";
import CardUi from "@/components/ui/CardUi";
import KeyboardAvoidingViewUi from "@/components/ui/KeyboardAvoidingViewUi";
import ModalConfirm from "@/components/ui/ModalConfirm";
import Row from "@/components/ui/Row";
import SelectOptionUi from "@/components/ui/SelectOptionUi";
import TextInputUi from "@/components/ui/TextInputUi";
import TextUi from "@/components/ui/TextUi";
import TitleUi from "@/components/ui/Title";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import { paymentMethod } from "@/configs/payment";
import useColor from "@/hooks/useColor";
import { formatPrice } from "@/lib/price";
import { toastSuccess } from "@/lib/toast";
import { PADDING_PAGE } from "@/theme/layout";
import Feather from '@expo/vector-icons/Feather';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import moment from "moment";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Dimensions, StyleSheet, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { IForm, validationSchema } from "./validation";

interface IParams {
    dataPackage: PackageService
    dataService: IService
}

function BookService() {
    const { id, otherParam } = useLocalSearchParams();
    const otherData = JSON.parse(otherParam as string) as IParams
    const dataService = otherData.dataService

    const router = useRouter()

    const color = useColor()

    const [showError, setShowError] = useState({
        isShow: false,
        message: ""
    })

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema()),
    })

    const createPackageServiceMutation = useMutation({
        mutationFn: createPackageService,
        onSuccess: (res) => {
            toastSuccess("Đăng ký thành công")
            router.back()
        },
        onError: (err) => {
            console.log("err", err.message)
            setShowError({ isShow: true, message: err.message })
            // toastError(err.message)
        }
    })
    const onConfirm = (values: IForm) => {
        const data: IPackageServiceData = {
            phoneNumber: values.phoneNumber,
            paymentMethod: values.paymentMethod,
            note: values.note,
            details: [
                {
                    utilityPackageDetailId: values.utilityPackageId,
                    quantity: values.quantity,
                    registrationDate: values.registrationDate
                }
            ]
        }
        createPackageServiceMutation.mutate(data)
    }

    const utilityPackageValue = useWatch({
        name: "utilityPackageId",
        control: control,
        compute: (data: number) => {
            return otherData.dataPackage.details.find(d => d.id === data)
        },
    });

    const renderColorLimit = (current?: number, limit?: number) => {
        if (!limit) return color.text;

        if ((current ?? 0) < limit) return color.primary;

        if ((current ?? 0) >= limit) return "red";

        return color.text
    }

    return (
        <KeyboardAvoidingViewUi contentContainerStyle={[styles.root, { backgroundColor: color.bg }]}>
            <TitleUi style={{ fontSize: 24 }}>{otherData.dataPackage.name}</TitleUi>

            <CardUi title="Giới hạn số lượng">
                <Row style={{ justifyContent: "flex-start" }}>
                    <TextUi>Theo căn hộ:</TextUi>
                    <TextUi weight="semiBold" style={{ color: renderColorLimit(dataService.currentRegisByApartment, dataService.limitByApartment) }}>
                        {dataService.limitByApartment ? `${dataService.currentRegisByApartment ?? 0}/${dataService.limitByApartment}` : "Không giới hạn"}
                    </TextUi>
                </Row>
                <Row style={{ justifyContent: "flex-start" }}>
                    <TextUi>Theo cư dân:</TextUi>
                    <TextUi weight="semiBold" style={{ color: renderColorLimit(dataService.currentRegisByResident, dataService.limitByResident) }}>
                        {dataService.limitByResident ? `${dataService.currentRegisByResident ?? 0}/${dataService.limitByResident}` : "Không giới hạn"}
                    </TextUi>
                </Row>
                <Row style={{ justifyContent: "flex-start" }}>
                    <TextUi>Chu kỳ giới hạn:</TextUi>
                    <TextUi weight="semiBold">
                        {dataService.limitRound ? ["Ngày", "Tuần", "Tháng", "Quý"][dataService.limitRound - 1] : "Không giới hạn"}
                    </TextUi>
                </Row>
            </CardUi>

            <CardUi style={{ gap: PADDING_PAGE }}>
                <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                value={field.value?.toString()}
                                onChangeText={field.onChange}
                                label="Số điện thoại"
                                keyboardType="number-pad"
                                errorText={errors.phoneNumber?.message}
                            />
                        )
                    }}
                />
                <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                value={field.value?.toString()}
                                onChangeText={(text) => field.onChange(Number(text))}
                                label="Số lượng"
                                keyboardType="number-pad"
                                errorText={errors.quantity?.message}
                            />
                        )
                    }}
                />
                <Controller
                    name="note"
                    control={control}
                    render={({ field }) => {
                        return (
                            <TextInputUi
                                value={field.value?.toString()}
                                onChangeText={field.onChange}
                                label="Ghi chú"
                                multiline
                                height={80}
                                errorText={errors.note?.message}
                            />
                        )
                    }}
                />

                <Controller
                    name="paymentMethod"
                    control={control}
                    render={({ field }) => {
                        return (
                            <SelectOptionUi
                                label="Phương thức thanh toán"
                                placeholder="Chọn phương thức thanh toán"
                                options={paymentMethod}
                                onChange={(v) => {
                                    field.onChange(v.value)
                                }}
                                errorText={errors.paymentMethod?.message}
                            />
                        )
                    }}
                />
            </CardUi>

            <CardUi style={{ paddingTop: 0 }}>
                <Controller
                    name="registrationDate"
                    control={control}
                    render={({ field }) => {
                        const today = moment();
                        const minDate = today.clone().add(dataService.preRegisterMin, 'days');
                        const maxDate = today.clone().add(dataService.preRegisterMax, 'days');

                        const markedDates: { [key: string]: any } = {};

                        // Mark disabled dates (before min and after max)
                        let currentDate = today.clone();
                        const endDate = maxDate.clone().add(365, 'days'); // Add extra days to ensure coverage

                        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
                            const dateStr = currentDate.format('YYYY-MM-DD');
                            if (currentDate.isBefore(minDate) || currentDate.isAfter(maxDate)) {
                                markedDates[dateStr] = { disabled: true, disableTouchEvent: true };
                            }
                            currentDate.add(1, 'day');
                        }

                        // Mark selected date
                        if (field.value) {
                            markedDates[field.value] = {
                                ...markedDates[field.value],
                                selected: true,
                                selectedColor: color.primary
                            };
                        }

                        return (
                            <Calendar
                                current={moment().format('YYYY-MM-DD')}
                                onDayPress={day => {
                                    field.onChange(day.dateString)
                                }}
                                markedDates={markedDates}
                                minDate={minDate.format('YYYY-MM-DD')}
                                maxDate={maxDate.format('YYYY-MM-DD')}
                                theme={{
                                    backgroundColor: 'transparent',
                                    calendarBackground: 'transparent',
                                    selectedDayBackgroundColor: color.primary,
                                    selectedDayTextColor: '#ffffff',
                                    todayTextColor: color.primary,
                                    dayTextColor: color.text,
                                    textDisabledColor: color.disable,
                                    monthTextColor: color.text,
                                    textMonthFontWeight: 'bold',
                                    arrowColor: color.primary,
                                }}
                                renderArrow={(direction) => (
                                    <Feather
                                        name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                                        size={24}
                                        color={color.primary}
                                    />
                                )}
                                disableAllTouchEventsForDisabledDays={true}
                            />
                        )
                    }}
                />
                {errors.registrationDate?.message && <TextUi style={styles.errorText}>{errors.registrationDate?.message}</TextUi>}
            </CardUi>

            <CardUi
                title="Khung giờ khả dụng"
            >
                <Controller
                    name="utilityPackageId"
                    control={control}
                    render={({ field }) => {
                        return (
                            <View style={styles.times}>
                                {
                                    otherData.dataPackage.details.map((t, index) => {
                                        const disable = t.status === 0
                                        return (
                                            <TouchableOpacityUi
                                                key={index}
                                                style={[
                                                    styles.itemTime,
                                                    { borderColor: color.borderColor },
                                                    disable && { backgroundColor: color.disable },
                                                    field.value === t.id && !disable && {
                                                        backgroundColor: color.primary,
                                                        borderColor: color.primary
                                                    }
                                                ]}
                                                disabled={disable}
                                                onPress={() => field.onChange(t.id)}
                                            >
                                                <TextUi
                                                    style={[
                                                        styles.time,
                                                        disable && { textDecorationLine: 'line-through' },
                                                        field.value === t.id && !disable && { color: '#ffffff' }
                                                    ]}
                                                >
                                                    {moment(t.timeStart, "HH:mm:ss").format("HH:mm")} - {moment(t.timeEnd, "HH:mm:ss").format("HH:mm")}
                                                </TextUi>
                                            </TouchableOpacityUi>
                                        )
                                    })
                                }
                            </View>
                        )
                    }}
                />
                {errors.utilityPackageId?.message && <TextUi style={styles.errorText}>{errors.utilityPackageId?.message}</TextUi>}
            </CardUi>

            {
                utilityPackageValue &&
                <CardUi>
                    <Row style={styles.totalRow}>
                        <View style={[styles.iconWrapper, { backgroundColor: color.primary }]}>
                            <Feather name="dollar-sign" size={20} color="#fff" />
                        </View>
                        <View style={styles.totalInfo}>
                            <TextUi style={styles.totalLabel}>Tổng thanh toán</TextUi>
                            <TextUi weight="bold" style={[styles.price, { color: color.primary }]}>
                                {formatPrice(utilityPackageValue.price)}
                            </TextUi>
                        </View>
                    </Row>
                </CardUi>
            }

            <ButtonUi
                text="Đăng ký"
                isLoading={createPackageServiceMutation.isPending}
                onPress={handleSubmit(onConfirm)}
            />

            <ModalConfirm
                title="Không thể đăng ký dịch vụ"
                open={showError.isShow}
                des={showError.message}
                setOpen={(o) => setShowError({ isShow: o, message: "" })}
            />
        </KeyboardAvoidingViewUi >
    )
}

export default BookService

const styles = StyleSheet.create({
    root: {
        flexGrow: 1,
        padding: PADDING_PAGE,
        gap: PADDING_PAGE,
    },
    times: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: PADDING_PAGE / 2,
        justifyContent: "flex-start"
    },
    itemTime: {
        width: (Dimensions.get('window').width - PADDING_PAGE * 2 - 40) / 2,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 20
    },
    time: {
        fontSize: 16,
        fontWeight: "500"
    },
    errorText: {
        color: "red",
        marginTop: 4,
        fontSize: 12
    },
    totalRow: {
        justifyContent: 'flex-start',
    },
    totalInfo: {
        marginLeft: 4,
        flex: 1,
    },
    totalLabel: {
        marginBottom: 0,
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
    },
    iconWrapper: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
})