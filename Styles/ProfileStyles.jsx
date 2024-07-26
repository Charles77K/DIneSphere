import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  ImageWrapper: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraIcon: {
    width: 100,
    height: 100,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 120,
    backgroundColor: COLORS.gray2, // Change this to whatever background color you want
    borderRadius: 20,
    padding: 5,
  },
  editIcon: {
    marginRight: 1,
  },
  changePhoto: {
    alignSelf: 'center',
    marginTop: 10,
  },
  photoText: {
    fontFamily: 'bold',
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  getText: {
    fontFamily: 'medium',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: SIZES.large,
  },
  getText1: {
    fontFamily: 'light',
    color: COLORS.gray,
    textAlign: 'center',
    fontSize: 13,
  },
  optionsWrapper: {
    marginHorizontal: 30,
    marginTop: 15,
  },
  editProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  optionText: {
    fontFamily: 'medium',
    fontSize: 18,
  },
  editProfileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  editProfileWrapper2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  editProfileWrapper3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  editProfileWrapper4: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  keyBtn: {
    backgroundColor: 'black',
    padding: 4,
    borderRadius: 25,
  },
  orderBtn: {
    backgroundColor: 'black',
    padding: 6.6,
    borderRadius: 25,
  },
  myLine: {
    width: '100%',
    height: 0.5,
    backgroundColor: COLORS.black,
    marginVertical: 22,
  },
  LogoutWrapper: {
    marginHorizontal: 30,
  },
  Logout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});

export default styles;
