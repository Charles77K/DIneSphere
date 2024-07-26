import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import URL from '../api/apiRoute';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../Styles/RestaurantPageStyles';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addItem } from '../Redux/cartReducer';
import { Snackbar } from 'react-native-paper';
import { COLORS } from '../constants';

const RestaurantPage = ({ navigation, route }) => {
  // State variables
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  // Extracting restaurantId from route params
  const { restaurantId } = route.params;

  // Fetch restaurant data
  const fetchData1 = async () => {
    try {
      const response = await axios.get(`${URL}/restaurant/${restaurantId}`);
      if (response.status === 200) {
        setData1(response.data.data.doc);
      } else {
        console.log('Error fetching restaurant data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching restaurant data:', error.message);
    }
  };

  // Fetch products data
  const fetchData2 = async () => {
    try {
      const authToken = await AsyncStorage.getItem('token');
      const response = await axios.get(
        `${URL}/restaurant/${restaurantId}/products`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setData2(response.data.data.doc);
      } else {
        console.log('Error fetching products data:', response.data.message);
      }
    } catch (err) {
      console.log('Error fetching products data:', err.response.data.message);
    }
  };

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const openTime = data1?.openingHours?.[0]?.open ?? 'Default Open Time';
  const closeTime = data1?.openingHours?.[0]?.close ?? 'Default Close Time';
  const status = data1?.openingHours?.[0]?.status ?? 'status';

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(
      addItem({
        id: item._id,
        name: item.title,
        photo: item.img,
        price: item.priceDiscount || item.price,
      })
    );
    setSnackbarVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.menuContainer}>
      <View style={styles.innerMenu}>
        <View>
          <Image source={{ uri: item.img }} style={styles.foodImg} />
        </View>
        <View style={styles.menuItems}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text
            style={{
              textDecorationLine: item.priceDiscount ? 'line-through' : 'none',
              textDecorationColor: item.priceDiscount ? 'red' : 'black',
              color: item.priceDiscount ? 'gray' : 'black',
              fontFamily: 'medium',
              fontSize: 15,
            }}
          >
            ₦{item.price}
          </Text>
          {item.priceDiscount && (
            <Text style={styles.discountedPrice}>₦{item.priceDiscount}</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.add}
        onPress={() => handleAddToCart(item)}
      >
        <MaterialCommunityIcons
          name="plus-box-outline"
          size={40}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: data1.img }} style={styles.img} />
      <View style={styles.goBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.goBackText}>.</Text>
      </View>
      <View style={styles.flexView}>
        <View style={styles.ratings}>
          <Text style={styles.ratingsText}>
            {data1.ratingsAverage}{' '}
            <Entypo name="star" size={24} color="#ffd633" />
          </Text>
          <Text>Rating</Text>
        </View>
        <TouchableOpacity
          style={styles.reviews}
          onPress={() => {
            navigation.navigate('Reviews', { resId: restaurantId });
          }}
        >
          <Text style={styles.reviewsText}>{data1.ratingsQuantity}</Text>
          <Text>Reviews</Text>
        </TouchableOpacity>
        <View style={styles.status}>
          <Text style={styles.statusText}>{status}</Text>
          <Text>Status</Text>
        </View>
      </View>
      {/* image and all the text displayed untop */}
      <View style={styles.resContainer}>
        <Text style={styles.resName}>{data1.name}</Text>
        <View style={styles.location}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name="location-pin" size={22} color="black" />
            <Text style={styles.locationText}>Godfrey Okoye University</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Entypo name="clock" size={15} color="blue" />
            <Text style={styles.openHours}>
              {openTime} - {closeTime}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.foodMenu}>Food Menu</Text>
      <FlatList
        data={data2}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View>
        {/* Your other components */}
        <Snackbar
          visible={snackbarVisible}
          style={{ top: -50 }}
          onDismiss={() => setSnackbarVisible(false)}
          duration={2000} // Adjust duration as needed
        >
          Item added to cart!
        </Snackbar>
      </View>
    </View>
  );
};

export default RestaurantPage;
