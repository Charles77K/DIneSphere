import { StyleSheet, Platform } from 'react-native';
import { SIZES, COLORS } from './../constants/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  img: {
    height: '30%',
    width: '100%',
  },
  flexView: {
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 42,
  },
  ratings: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 75,
    width: 100,
    borderRadius: 15,
  },
  reviews: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 75,
    width: 100,
    borderRadius: 15,
  },
  status: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 75,
    width: 100,
    borderRadius: 15,
  },
  statusText: {
    fontFamily: 'medium',
    fontSize: 24,
    color: 'green',
  },
  ratingsText: {
    fontFamily: 'medium',
    fontSize: 24,
    color: 'black',
  },
  reviewsText: {
    fontFamily: 'medium',
    fontSize: 26,
    color: 'black',
  },
  resName: {
    fontFamily: 'medium',
    fontSize: 22,
    marginLeft: 20,
  },
  resContainer: {
    marginTop: -20,
  },
  location: {
    flexDirection: 'row',
    marginHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openHours: {
    fontFamily: 'medium',
  },
  locationText: {
    fontFamily: 'medium',
  },
  foodMenu: {
    marginVertical: 5,
    marginLeft: 15,
    fontFamily: 'medium',
    fontSize: SIZES.large,
    color: COLORS.yellow,
  },
  listContent: {
    paddingBottom: 60, // Add padding to the bottom to ensure last items are not cut off
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 30 : 0,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    position: 'relative',
    bottom: 235,
  },
  goBackText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  // Food menu Items
  menuContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    backgroundColor: 'white',
    height: 90,
    padding: 8,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  innerMenu: {
    flexDirection: 'row',
    gap: 15,
  },
  foodImg: {
    width: 80,
    height: 70,
    borderRadius: 10,
  },
  add: {
    backgroundColor: COLORS.yellow,
    justifyContent: 'center',
    height: 45,
    padding: 2,
    borderRadius: 15,
    marginTop: 10,
  },
  discountedPrice: {
    color: 'red',
    fontFamily: 'medium',
    fontSize: 15,
  },
  titleText: {
    fontFamily: 'medium',
    fontSize: 17,
  },
});

export default styles;
