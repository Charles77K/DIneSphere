import { StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  goBack: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 35 : 0,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  goBackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputBackground: {
    color: COLORS.black,
    width: '85%',
    marginTop: Platform.OS === 'android' ? 40 : 40,
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 50,
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: '85%',
  },
  btnStyle: {
    height: SIZES.xxLarge,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.yellow,
  },
  txtStyle: {
    textAlign: 'center',
    fontFamily: 'bold',
    color: COLORS.white,
  },
});

export default styles;
