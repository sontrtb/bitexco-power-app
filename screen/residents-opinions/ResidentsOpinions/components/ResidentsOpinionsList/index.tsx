import { getResidentComments, IResidentComment } from '@/api/residents-opinions';
import FlatListLazy, { FlatListLazyRef } from '@/components/commons/FlatListLazy';
import CardUi from '@/components/ui/CardUi';
import TextUi from '@/components/ui/TextUi';
import TouchableOpacityUi from '@/components/ui/TouchableOpacityUi';
import useColor from '@/hooks/useColor';
import { dateTimeFormat } from '@/lib/date';
import { getStatus } from '@/screen/residents-opinions/utils/getStatus';
import { PADDING_PAGE } from '@/theme/layout';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

function ResidentsOpinionsList({
  status
}: { status?: number }) {
  const flatListRef = useRef<FlatListLazyRef>(null);

  const color = useColor()

  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      flatListRef.current?.refreshClearPage();
    }, [flatListRef])
  );

  const renderItem = ({ item }: { item: IResidentComment }) => (
    <TouchableOpacityUi
      style={styles.item}
      onPress={() => {
        router.navigate(`/residents-opinions/${item.id}`)
      }}
    >
      <CardUi>
        <View style={styles.header}>
          <View style={[styles.iconWrapper, { backgroundColor: color.bgImage }]}>
            <Feather name="message-square" size={20} color={color.primary} />
          </View>
          <View style={styles.badge}>
            <View style={[styles.statusDot, { backgroundColor: getStatus(item.status).color }]} />
            <TextUi style={[styles.statusText, { color: getStatus(item.status).color }]}>
              {getStatus(item.status).text}
            </TextUi>
          </View>
        </View>

        <TextUi style={styles.title} numberOfLines={3}>
          {item.title}
        </TextUi>

        <View style={styles.footer}>
          <Feather name="clock" size={14} color="#9ca3af" />
          <TextUi style={styles.date}>{dateTimeFormat(item.createdAt)}</TextUi>
        </View>
      </CardUi>
    </TouchableOpacityUi>
  );

  return (
    <FlatListLazy<IResidentComment>
      ref={flatListRef}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      queryKey={["getResidentComments", `${status}`]}
      queryFn={(page) => getResidentComments(page, status)}
    />
  );
}

export default ResidentsOpinionsList;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 16,
  },
  item: {
    marginBottom: PADDING_PAGE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  title: {
    lineHeight: 22,
    fontSize: 16,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#9ca3af',
    marginLeft: 6,
  },
});