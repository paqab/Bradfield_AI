import { View, StyleSheet, Image, ImageSourcePropType, ViewStyle, ImageStyle, Dimensions } from 'react-native';

interface BradfieldLogoProps {
  size?: number; // fixed pixel size (optional)
  style?: ViewStyle; // container style override
  imageStyle?: ImageStyle; // image style override
}

export default function BradfieldLogo({ size, style, imageStyle }: BradfieldLogoProps) {
  // Using require for local image - path relative to components folder
  // The asset is located at /assets/bradfield.png (not assets/images)
  const logoSource: ImageSourcePropType = require('../assets/bradfield.png');

  // compute a numeric size based on window width when no explicit size is provided
  const windowWidth = Dimensions.get('window').width;
  const computedSize = size ?? Math.min(160, Math.max(80, Math.floor(windowWidth * 0.18)));

  const containerStyle = [styles.container, style, { width: computedSize, height: computedSize }];
  const imgStyle = [styles.logoImage, imageStyle];

  return (
    <View style={containerStyle}>
      <Image source={logoSource} style={imgStyle} resizeMode="contain" />
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

