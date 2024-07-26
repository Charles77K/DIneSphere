import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarRating = ({ maxStars = 5, rating, setRating }) => {
  return (
    <View style={styles.starContainer}>
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
          <AntDesign
            name={index < rating ? 'star' : 'staro'}
            size={21}
            color="#FFD700"
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  star: {
    marginHorizontal: 2,
  },
});
