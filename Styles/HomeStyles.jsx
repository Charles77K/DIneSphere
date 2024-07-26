import { Platform, StyleSheet } from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImage: {
    height: 36,
    width: 35,
    borderRadius: 20,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: Platform.OS === 'android' ? 25 : 15,
    marginBottom: Platform.OS === 'android' ? 10 : 0,
  },
  imageWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default styles;
