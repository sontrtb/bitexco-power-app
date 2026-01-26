import { bioLogin } from "@/api/auth";
import ActivityIndicatorUi from "@/components/ui/ActivityIndicatorUi";
import ImageUi from "@/components/ui/ImageUi";
import ModalConfirm from "@/components/ui/ModalConfirm";
import TouchableOpacityUi from "@/components/ui/TouchableOpacityUi";
import useColor from "@/hooks/useColor";
import useLoginHandle from "@/hooks/useLoginHandle";
import { toastError } from "@/lib/toast";
import { useAuth } from "@/stores/useAuth";
import { useBiometric } from "@/stores/useBiometric";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from "@tanstack/react-query";
import * as LocalAuthentication from 'expo-local-authentication';
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";

function Biometrics() {
    const color = useColor()
    const { enabelBiometric } = useBiometric()

    const { setUser } = useAuth()

    const onLoginSuccess = useLoginHandle()

    const [isSupport, setIsSupport] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        LocalAuthentication.hasHardwareAsync().then(s => setIsSupport(s))
    }, [])

    const bioLoginMutation = useMutation({
        mutationFn: bioLogin,
        onSuccess: (res) => {
            onLoginSuccess(res.data)
        },
        onError: (err) => {
            console.log(err)
            toastError(err.message)
        },
    })

    const onAuthenticateAsync = () => {
        if (enabelBiometric) {
            LocalAuthentication.authenticateAsync()
                .then(res => {
                    if (res.success) {
                        bioLoginMutation.mutate({
                            bioKey: enabelBiometric.data.bioKey
                        })
                    } else {
                        toastError("Đăng nhập thất bại")
                    }
                })
                .catch(err => {
                    toastError("Đăng nhập thất bại")
                })
        } else {
            setOpenModal(true)
        }
    }

    if (!isSupport) return null

    return (
        <>
            <TouchableOpacityUi
                onPress={onAuthenticateAsync}
                style={[
                    styles.btnBiometrics,
                    {
                        backgroundColor: color.bgImage,
                        borderColor: color.primary
                    }
                ]}
            >
                {
                    bioLoginMutation.isPending ? (
                        <ActivityIndicatorUi />
                    ) : (
                        Platform.OS === "ios" ? (
                            <ImageUi
                                source={require('@/assets/icons/ic_face_id.png')}
                                style={[styles.icon, { tintColor: color.primary }]}
                            />
                        ) : (
                            <MaterialIcons name="fingerprint" size={20} color={color.primary} />
                        )
                    )
                }
            </TouchableOpacityUi>

            <ModalConfirm
                open={openModal}
                setOpen={setOpenModal}
                title="Đăng nhập sinh trắc học chưa được bật"
                des="Vui lòng đăng nhập và bật trong phần Tài khoản"
            />
        </>
    )
}

const styles = StyleSheet.create({
    btnBiometrics: {
        height: 44,
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 22,
        borderWidth: 1
    },
    icon: {
        height: 22,
        width: 22,
    },
})

export default Biometrics