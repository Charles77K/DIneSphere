import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';

const Preloader = () => {
  const animationRef = useRef(null);

  useEffect(() => {
    // Play the animation when the component mounts
    animationRef.current?.play();
  }, []);

  return (
    <LottieView
      style={styles.container}
      ref={animationRef}
      source={require('./../assets/img/animation_lmqc7bdx.json')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Preloader;
