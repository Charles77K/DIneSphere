import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';

import React, { useEffect, useRef, useState } from 'react';

const Carousel = () => {
  const FlatListRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);
  //get the  screen dimensions
  const screenWidth = Dimensions.get('window').width;
  //array of images
  const carouselData = [
    {
      id: '01',
      image: require('./../assets/img/food1.jpg'),
    },
    {
      id: '02',
      image: require('./../assets/img/food2.jpg'),
    },
    {
      id: '03',
      image: require('./../assets/img/food3.jpg'),
    },
    {
      id: '04',
      image: require('./../assets/img/food4.jpg'),
    },
  ];

  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
        FlatListRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        FlatListRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  });

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  //display Images //UI
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          source={item.image}
          style={[styles.Image, { width: screenWidth }]}
        />
      </View>
    );
  };

  const HandleScroll = (event) => {
    //get the scroll position
    const scrollPosition = Math.round(event.nativeEvent.contentOffset.x);
    // console.log({ scrollPosition });
    //get the index of the active screen
    const index = Math.round(scrollPosition / screenWidth);
    //screenwidth= 392.8
    //scroll posistion=392.8
    //index = 0.9
    // console.log({ index });
    setActiveIndex(index);
  };

  const redDotIndicators = () => {
    return carouselData.map((dot, index) => {
      if (activeIndex === index) {
        return <View key={index} style={styles.Dot2}></View>;
      } else {
        return <View key={index} style={styles.Dot}></View>;
      }
    });
  };

  return (
    <View>
      <FlatList
        data={carouselData}
        ref={FlatListRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={HandleScroll}
        keyExtractor={(item) => item.id}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 10,
        }}
      >
        {redDotIndicators()}
      </View>
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  Image: {
    height: 200,
    borderRadius: 10,
  },
  Dot: {
    backgroundColor: 'rgb(181, 179, 179)',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  Dot2: {
    backgroundColor: 'yellow',
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});
