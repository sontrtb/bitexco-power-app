import { bioRegister } from '@/api/auth';
import HeaderHome from '@/components/commons/HeaderHome';
import BottomSheetAction from '@/components/ui/BottomSheetAction';
import ButtonUi from '@/components/ui/ButtonUi';
import CardUi from '@/components/ui/CardUi';
import LoadingScreen from '@/components/ui/LoadingScreen';
import ModalConfirm from '@/components/ui/ModalConfirm';
import useColor from '@/hooks/useColor';
import { useLogout } from '@/hooks/useLogout';
import { toastCommingSoon, toastError } from '@/lib/toast';
import { useBiometric } from '@/stores/useBiometric';
import { useLang } from '@/stores/useLang';
import { useTheme } from '@/stores/useTheme';
import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from '@tanstack/react-query';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AddressCard from '../HomeScreen/AddressCard';
import RowSelect from './components/RowSelect';
import UserCard from './components/UserCard';

const listLanguage = [
  {
    text: "lang.vn",
    code: "vn"
  },
  {
    text: "lang.en",
    code: "en"
  },
  {
    text: "lang.lo",
    code: "lo"
  }
]

export default function UserScreen() {
  const color = useColor()

  const onLogout = useLogout()

  const router = useRouter()

  const { setEnabelBiometric, enabelBiometric } = useBiometric()

  const { setLang, lang } = useLang()

  const textLang = listLanguage.find(l => l.code === lang)?.text

  const [openChangeLang, setOpenChangeLang] = useState(false)

  const [openConfirmDeleteAccount, setOpenConfirmDeleteAccount] = useState(false)

  const [openChangeBiometric, setOpenChangeBiometric] = useState(false)

  // theme
  const { changeTheme, theme } = useTheme()
  const renderTextTheme = useMemo(() => {
    switch (theme) {
      case "dart":
        return "theme.dart"
      case "light":
        return "theme.light"
      default: return "theme.auto"
    }
  }, [theme])

  //
  const changeBiometric = () => {
    setOpenChangeBiometric(true)
  }

  const bioRegisterQuery = useMutation({
    mutationFn: bioRegister,
    onSuccess: (res) => {
      setEnabelBiometric({
        enabel: true,
        data: res.data
      })
    },
    onError: (err) => {
      console.log("err", err)
    }
  })
  const onChangeBiometric = () => {
    if (enabelBiometric?.enabel) {
      setEnabelBiometric(undefined)
    } else {
      LocalAuthentication.authenticateAsync()
        .then(res => {
          if (res.success) {
            bioRegisterQuery.mutate()
          } else {
            toastError("Bật đăng nhập thất bại")
          }
        })
        .catch(err => {
          toastError("Bật đăng nhập thất bại")
        })

    }
  }

  //
  const actions = [
    // {
    //   text: "user.changePassword",
    //   icon: <Feather name="lock" size={18} color={color.text} />
    // },
    {
      text: "user.lang",
      icon: <Feather name="globe" size={18} color={color.text} />,
      textValue: textLang,
      onPress: () => {
        toastCommingSoon()
        // setOpenChangeLang(true)
      }
    },
    {
      text: "user.theme",
      icon: <Feather name="moon" size={18} color={color.text} />,
      textValue: renderTextTheme,
      onPress: changeTheme
    },
    {
      text: "Đăng nhập sinh trắc học",
      icon: <MaterialIcons name="password" size={18} color={color.text} />,
      textValue: enabelBiometric ? "Bật" : "Tắt",
      onPress: changeBiometric
    },

     {
      text: "Điều khoản sử dụng",
      icon: <Feather name="shield" size={18} color={color.text} />,
      onPress: () => router.push("/tems/terms-of-use")
    },
    {
      text: "Chính sách bảo mật",
      icon: <Feather name="shield" size={18} color={color.text} />,
       onPress: () => router.push("/tems/confidentiality-policy")
    },
    {
      text: "user.deleteAccount",
      icon: <Feather name="trash-2" size={18} color={color.text} />,
      onPress: () => {
        setOpenConfirmDeleteAccount(true)
      }
    }
  ]

  const onDeleteAccount = () => {
    onLogout()
  }

  return (
    <LoadingScreen isLoading={bioRegisterQuery.isPending}>
      <HeaderHome title='Tài khoản' />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.bg }]}>

        <View style={styles.content}>
          <UserCard />
          <AddressCard />

          <CardUi>
            {
              actions.map((a, index) => (
                <RowSelect
                  key={index}
                  {...a}
                />
              ))
            }
          </CardUi>

          <ButtonUi
            text='Đăng xuất'
            onPress={onLogout}
          />
        </View>

        <BottomSheetAction
          isModalVisible={openChangeLang}
          setModalVisible={setOpenChangeLang}
          actions={listLanguage.map(l => ({
            text: l.text,
            onPress: () => {
              setLang(l.code as any)
              setOpenChangeLang(false)
            }
          }))}
        />

        <ModalConfirm
          open={openConfirmDeleteAccount}
          setOpen={setOpenConfirmDeleteAccount}
          title='Xác nhận xoá tài khoản'
          des={`Tài khoản của bạn sẽ được xoá trên hệ thống.\n Xác nhận xoá ??`}
          onOk={onDeleteAccount}
        />

        <ModalConfirm
          open={openChangeBiometric}
          setOpen={setOpenChangeBiometric}
          title={`Xác nhận ${enabelBiometric ? "tắt" : "bật"} đăng nhập sinh trắc học`}
          des="Đăng nhập sinh trắc học giúp đăng nhập nhanh trên máy khi hết phiên đăng nhập"
          onOk={onChangeBiometric}
        />
      </ScrollView>
    </LoadingScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 100
  },
  content: {
    flex: 1,
    gap: PADDING_PAGE,
    padding: PADDING_PAGE,
  }
});
