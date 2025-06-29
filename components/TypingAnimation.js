import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import colors from '../constants/colors';

const TypingAnimation = () => {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  const dot1Scale = useRef(new Animated.Value(0.8)).current;
  const dot2Scale = useRef(new Animated.Value(0.8)).current;
  const dot3Scale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animateDot = (opacity, scale, delay) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 1.2,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0.3,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
    };

    const dot1Animation = animateDot(dot1Opacity, dot1Scale, 0);
    const dot2Animation = animateDot(dot2Opacity, dot2Scale, 200);
    const dot3Animation = animateDot(dot3Opacity, dot3Scale, 400);

    dot1Animation.start();
    dot2Animation.start();
    dot3Animation.start();

    return () => {
      dot1Animation.stop();
      dot2Animation.stop();
      dot3Animation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot1Opacity,
            transform: [{ scale: dot1Scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot2Opacity,
            transform: [{ scale: dot2Scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          {
            opacity: dot3Opacity,
            transform: [{ scale: dot3Scale }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textColor,
    marginHorizontal: 3,
  },
});

export default TypingAnimation;