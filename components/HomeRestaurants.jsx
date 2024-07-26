import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../components styles/HomeRestaurantsStyles';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import URL from '../api/apiRoute';
import axios from 'axios';

const HomeRestaurants = () => {
  const Navigation = useNavigation();
  const [restaurant, setRestaurant] = useState([]);

  const getRestaurants = async () => {
    try {
      const response = await axios.get(`${URL}/restaurant`, {
        params: {
          limit: 3,
          sort: 'ratingsAverage',
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

  const handleRestaurantPress = (id) => {
    Navigation.navigate('Restaurant', { restaurantId: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleRestaurantPress(item._id)}
    >
      <View style={styles.imgContainer}>
        <Image source={{ uri: item.img }} style={styles.img} />
      </View>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <View style={styles.icon}>
            <Ionicons name="restaurant-outline" size={20} color="black" />
          </View>
          <View style={styles.resConatiner}>
            <Text style={styles.resText}>{item.name}</Text>
            <View style={styles.ratings}>
              <Entypo name="star" size={17} color="#ffd633" />
              <Text>{item.ratingsAverage}</Text>
              <Text>({item.ratingsQuantity})</Text>
            </View>
            {/* end of ratings view */}
          </View>
          {/* end of resConatiner view */}
          {/* start email and opening hours view */}
          <View style={styles.resConatiner2}>
            <Text>{[item.contact[0].email]}</Text>
            <View style={styles.openingHours}>
              <Entypo name="clock" size={15} color="black" />
              <Text>
                {item.openingHours[0].open} - {item.openingHours[0].close}
              </Text>
            </View>
            {/* end of opening Hours */}
          </View>
          {/* end of res container 2 */}
        </View>
      </View>
      {/* end of container 2 */}
    </TouchableOpacity> //end of parent contaner
  );
  return (
    <View style={{ flex: 1, marginBottom: 70 }}>
      <View style={styles.header}>
        <Text style={styles.headText}>Restaurants</Text>
        <TouchableOpacity
          onPress={() => Navigation.navigate('displayRestaurant')}
        >
          <Text style={styles.headText2}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={restaurant}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeRestaurants;
