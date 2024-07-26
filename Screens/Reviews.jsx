import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import StarRating from '../components/StarRatings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../api/apiRoute';
import MyButton from '../components/MyButton';
import { COLORS } from '../constants';
import Toast from 'react-native-toast-message';

const Reviews = ({ navigation, route }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loadReviews, setLoadReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { resId } = route.params;

  const getReviews = async () => {
    const authToken = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(`${URL}/restaurant/${resId}/reviews`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 200) {
        setLoadReviews(response.data.data.doc);
      } else {
        console.log('Error fetching products data:', response.data.message);
      }
    } catch (err) {
      console.log(
        'Error fetching products reviews:',
        err.response.data.message
      );
    }
  };

  useEffect(() => {
    if (resId) {
      getReviews();
    } else {
      console.error('resId is not defined');
    }
  }, [resId]);

  const handleSubmit = async () => {
    const authToken = await AsyncStorage.getItem('token');

    if (rating === 0 || review.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide a rating and a review',
        position: 'top',
      });
      return;
    }

    const reviewData = {
      rating: rating,
      review: review,
    };
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${URL}/restaurant/${resId}/reviews`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Submitted',
          text2: 'Review submitted successfully',
          position: 'top',
        });
        setRating(0);
        setReview('');
        getReviews(); // Uncomment this if you want to refresh reviews after submission
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to submit review',
          position: 'top',
        });
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response data:', error.response.data.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: error.response.data.message,
          position: 'top',
          visibilityTime: 4000, // Duration in milliseconds
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      } else {
        console.log('Error message:', error.message);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred while submitting your review',
          position: 'top',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderReviews = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Image
        source={require('./../assets/img/photo.png')}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{item.User.name}</Text>
        <Text style={styles.reviewText}>{item.review}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.goBack}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="black" />
        </TouchableOpacity>
        <Text style={styles.goBackText}>Reviews</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Post a Review</Text>
        <StarRating rating={rating} setRating={setRating} />
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review"
          value={review}
          onChangeText={(text) => setReview(text)}
          multiline
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <MyButton
            Press={styles.btnStyle}
            child={'Submit'}
            childStyle={styles.txtStyle}
            onPress={handleSubmit}
          />
        )}
        <Text style={styles.heading2}>Reviews</Text>
        <FlatList
          data={loadReviews}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.reviewList}
          renderItem={renderReviews}
        />
      </View>
    </SafeAreaView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 20 : 0,
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  goBackText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 21,
    fontFamily: 'medium',
    color: '#333',
  },
  heading2: {
    fontSize: 21,
    fontFamily: 'medium',
    marginTop: 26,
    color: '#333',
  },
  reviewInput: {
    width: '100%',
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  reviewList: {
    marginTop: 2,
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontFamily: 'bold',
    fontSize: 16,
    color: '#333',
  },
  reviewText: {
    marginTop: 2,
    fontSize: 14,
    color: '#666',
  },
  btnStyle: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: COLORS.yellow,
  },
  txtStyle: {
    textAlign: 'center',
    color: 'white',
  },
});
