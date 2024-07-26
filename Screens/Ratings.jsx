import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import URL from '../api/apiRoute';
import axios from 'axios';
import { COLORS, SIZES } from './../constants/index';

const Ratings = () => {
  const Navigation = useNavigation();
  const [restaurant, setRestaurant] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getRestaurants = async () => {
    try {
      const response = await axios.get(`${URL}/restaurant`, {
        params: {
          sort: '-ratingsAverage',
        },
      });
      if (response.status === 200) {
        setRestaurant(response.data.data.doc);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log('Error:', err.message);
      if (err.response.data.message) {
        console.log('Error response:', err.response.data.message);
      }
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const pullMe = () => {
    setRefresh(true);
    getRestaurants();
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  const handleRestaurantPress = (id) => {
    Navigation.navigate('Restaurant', { restaurantId: id });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? 'star' : 'star-o'}
          size={18}
          color="#ffd633"
        />
      );
    }
    return stars;
  };

  const renderItem = ({ item, index }) => (
    <View style={{ marginHorizontal: 10 }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => handleRestaurantPress(item._id)}
      >
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{index + 1}</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image source={{ uri: item.img }} style={styles.img} />
        </View>
        <View style={styles.container2}>
          <View style={styles.container3}>
            <View style={styles.resConatiner}>
              <Ionicons name="restaurant-outline" size={20} color="black" />
              <Text style={styles.resText}>{item.name}</Text>
            </View>
            <View style={styles.ratings}>
              {renderStars(Math.round(item.ratingsAverage))}
            </View>
            <View style={styles.resConatiner2}>
              <View style={styles.openingHours}>
                <Entypo name="clock" size={15} color="black" />
                <Text>
                  {item.openingHours[0].open} - {item.openingHours[0].close}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, marginBottom: 70 }}>
      <View style={styles.header}>
        <Text style={styles.headText}>Top Rated Restaurants🚀</Text>
      </View>
      <FlatList
        data={restaurant}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={pullMe} />
        }
      />
    </View>
  );
};

export default Ratings;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    marginTop: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headText: {
    fontFamily: 'medium',
    fontSize: SIZES.large,
  },
  numberContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'medium',
    fontSize: SIZES.large,
  },
  imgContainer: {
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 90,
    borderRadius: 7,
  },
  container2: {
    flex: 1,
  },
  container3: {
    backgroundColor: 'white',
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 90,
  },
  resConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resText: {
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    marginLeft: 10,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  resConatiner2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openingHours: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
