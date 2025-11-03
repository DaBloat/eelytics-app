import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigator from './navigators/MainNavigator';

const background = require('./assets/eels/background.png');

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    card: 'transparent',
    background: 'transparent',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{flex: 1}}>
        <Image source={background} style={styles.backgroundImage} />
        <NavigationContainer theme={MyTheme}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <MainNavigator />
          </View>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
});