import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  imgWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  img: {
    height: 200,
    width: 260,
  },
  txtContainer: {
    marginTop: 20,
    marginBottom: -5,
  },
  txt1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  txt2: {
    fontSize: 16,
    fontFamily: 'light',
    textAlign: 'center',
  },
  inputBackground: {
    color: COLORS.black,
    width: '85%',
    marginTop: Platform.OS === 'android' ? 5 : 10,
  },
  inputWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 50,
  },
  forgotBtn: {
    marginLeft: 238,
    marginTop: -10,
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
  forgotTxt: {
    color: COLORS.black,
    fontFamily: 'bold',
  },
  accStyles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  accText: {
    fontFamily: 'light',
  },
  accText1: {
    fontFamily: 'medium',
  },
});

export default styles;
