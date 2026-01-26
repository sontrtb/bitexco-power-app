import useColor from '@/hooks/useColor';
import { PADDING_PAGE } from '@/theme/layout';
import Constants from 'expo-constants';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import AddressCard from './AddressCard';
import Banner from './Banner';
import News from './News';
import UtilitiesCard from './UtilitiesCard';
import WeatherBox from './WeatherBox';

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
      <WeatherBox />
      <UtilitiesCard />
      <View style={styles.addressWrap}>
        <AddressCard />
      </View>
      <Banner />
      <News />
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
