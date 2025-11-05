import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

interface BradfieldLogoProps {
  size?: number;
}

export default function BradfieldLogo({ size = 48 }: BradfieldLogoProps) {
  // Using require for local image - path relative to assets folder
  const logoSource: ImageSourcePropType = require('../assets/images/Screenshot 2025-11-05 111111.png');

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={logoSource}
        style={[styles.logoImage, { width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});

