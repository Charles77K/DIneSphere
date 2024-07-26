import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from './../constants/index';

// const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headText: {
    fontFamily: 'medium',
    fontSize: SIZES.large,
  },
  headText2: {
    fontFamily: 'light',
    fontSize: SIZES.medium,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '90%',
    height: 160,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container3: {
    backgroundColor: 'white',
    height: 80,
    width: '90%',
  },
  icon: {
    backgroundColor: '#ffff',
    borderRadius: 50,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 25,
    left: 20,
    marginBottom: -15,
  },
  resConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  resText: {
    fontFamily: 'medium',
    fontSize: SIZES.medium,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resConatiner2: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  openingHours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});

export default styles;
