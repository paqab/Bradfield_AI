import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

// Decorative background composed of multiple blurred gradient circle images.
// Non-interactive (pointerEvents should be none when used in RN web) and placed
// behind the main content using absolute positioning.

interface Props {
  scale?: number; // multiply sizes
}

export default function DecorativeBg({ scale = 1 }: Props) {
  // assets sits one level up from components
  const src = require('../assets/blur-gradient-circle-transparent-ball-gradient-shining-circle-holographic-blurred-circles-rainbow-color-dots-abstract-gradient-shape-design-elements-free-png.webp');

  const circles = [
    { key: 'c1', size: 640 * scale, top: -120, left: -140, opacity: 0.12, rotate: '-10deg' },
    { key: 'c2', size: 520 * scale, top: 80, left: -80, opacity: 0.10, rotate: '0deg' },
    { key: 'c3', size: 480 * scale, top: 40, right: -100, opacity: 0.08, rotate: '20deg' },
    { key: 'c4', size: 360 * scale, bottom: -80, right: -60, opacity: 0.07, rotate: '40deg' },
    { key: 'c5', size: 300 * scale, bottom: 40, left: -60, opacity: 0.06, rotate: '-30deg' },
  ];

  return (
    <View style={styles.container} pointerEvents="none">
      {circles.map((c) => (
        <Image
          key={c.key}
          source={src}
          style={[
            styles.circle,
            {
              width: c.size,
              height: c.size,
              borderRadius: c.size / 2,
              opacity: c.opacity,
              top: c.top as any,
              left: (c.left as any) || undefined,
              right: (c.right as any) || undefined,
              bottom: (c.bottom as any) || undefined,
              transform: [{ rotate: c.rotate }],
            },
          ]}
          resizeMode="cover"
          accessible={false}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
  },
});
