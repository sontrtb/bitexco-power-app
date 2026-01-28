import useColor from '@/hooks/useColor';
import { PADDING_PAGE } from '@/theme/layout';
import Constants from 'expo-constants';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import AbsentOvertime from './components/AbsentOvertime';
import ActionHome from './components/ActionHome';
import Approve from './components/Approve';
import BgHome from './components/BgHome';
import PaymentRequiresApproval from './components/PaymentRequiresApproval';

const statusBarHeight = Constants.statusBarHeight;

export default function HomeScreen() {
  const color = useColor();

  return (
    <ScrollView
      // bounces={false}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      style={[styles.root, { backgroundColor: color.bg }]}
      contentInset={{ top: Platform.OS === "android" ? 0 : -(statusBarHeight + 10) }}
    >
      <BgHome />

      <View style={styles.content}>
        <ActionHome />
        <Approve />
        <PaymentRequiresApproval />
        <AbsentOvertime />
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: Platform.OS === "android" ? 130 : 20,
  },
  content: {
    marginHorizontal: PADDING_PAGE,
    gap: PADDING_PAGE
  }
});
