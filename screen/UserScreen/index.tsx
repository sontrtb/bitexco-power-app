import ModalConfirm from '@/components/ui/ModalConfirm';
import TextUi from '@/components/ui/TextUi';
import TouchableOpacityUi from '@/components/ui/TouchableOpacityUi';
import useColor from '@/hooks/useColor';
import { useLogout } from '@/hooks/useLogout';
import IcCompany from '@/icons/IcCompany';
import IcContract from '@/icons/IcContract';
import IcHelp from '@/icons/IcHelp';
import IcLogout from '@/icons/IcLogout';
import IcWallet from '@/icons/IcWallet';
import { toastCommingSoon } from '@/lib/toast';
import { PADDING_PAGE } from '@/theme/layout';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HeaderSetting from './components/HeaderSetting';
import RowSelect from './components/RowSelect';
import UserCard from './components/UserCard';

export default function UserScreen() {
  const color = useColor()

  const onLogout = useLogout()

  const router = useRouter()

  const [openConfirmDeleteAccount, setOpenConfirmDeleteAccount] = useState(false)

  const actions = [
    {
      text: "Đề nghị thu tiền",
      icon: <IcWallet />,
      onPress: toastCommingSoon
    },
    {
      text: "Đề nghị chi tiền",
      icon: <IcWallet />,
      onPress: toastCommingSoon
    },

    {
      text: "Quản lý hợp đồng",
      icon: <IcContract />,
      onPress: () => router.push("/tems/terms-of-use")
    },
    {
      text: "Hành chính",
      icon: <IcCompany />,
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
    <View>
      <HeaderSetting />
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: color.bg }]}>

        <View style={styles.content}>
          <UserCard />

          <View>
            {
              actions.map((a, index) => (
                <RowSelect
                  key={index}
                  {...a}
                />
              ))
            }

            <TextUi style={[styles.textLabel, { color: color.textNeutral }]}>Hỗ trợ</TextUi>
            <RowSelect
              text="Hướng dẫn sử dụng"
              icon={<IcHelp />}
            />
          </View>

          <View style={styles.center}>
            <TouchableOpacityUi
              onPress={() => onLogout()}
            >
              <View style={styles.logoutWrap}>
                <IcLogout />
                <TextUi style={styles.textLogout}>Đăng xuất</TextUi>
              </View>
            </TouchableOpacityUi>
          </View>
        </View>

        <ModalConfirm
          open={openConfirmDeleteAccount}
          setOpen={setOpenConfirmDeleteAccount}
          title='Xác nhận xoá tài khoản'
          des={`Tài khoản của bạn sẽ được xoá trên hệ thống.\n Xác nhận xoá ??`}
          onOk={onDeleteAccount}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 100
  },
  content: {
    flex: 1,
    gap: 32,
    padding: PADDING_PAGE,
  },
  textLabel: {
    fontSize: 12,
    marginTop: 32
  },
  logoutWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textLogout: {
    fontWeight: "600",
    color: "#FF0000"
  },
  center: {
    alignItems: "center"
  }
});
