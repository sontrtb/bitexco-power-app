import TextUi from '@/components/ui/TextUi';
import useColor from '@/hooks/useColor';
import { PADDING_PAGE } from '@/theme/layout';
import Constants from 'expo-constants';
import { Platform, ScrollView, StyleSheet } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;

export default function HomeScreen() {
  const color = useColor();

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={[styles.contentContainer]}
      showsVerticalScrollIndicator={false}
      style={[styles.root, { backgroundColor: color.bg }]}
      contentInset={{ top: Platform.OS === "android" ? 0 : -(statusBarHeight + 10) }}
    >
        <TextUi>HomeScreen</TextUi>
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
  addressWrap: {
    marginTop: 200,
    // marginTop: 86,
    marginHorizontal: PADDING_PAGE,
  }
});
