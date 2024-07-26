import { Platform, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/index.js';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  txtWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  txtWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 200,
    width: 260,
  },
  txtContainer: {
    marginTop: 40,
    marginBottom: -30,
  },
  txt1: {
    fontSize: 28,
    fontFamily: 'extrabold',
    textAlign: 'center',
  },
  txt2: {
    fontSize: 15,
    fontFamily: 'light',
    textAlign: 'center',
  },
  inputBackground: {
    color: COLORS.black,
    width: '85%',
    marginTop: Platform.OS === 'android' ? 5 : 20,
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
    marginTop: 20,
  },
  btnStyle: {
    height: SIZES.xxLarge,
    width: '85%',
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
