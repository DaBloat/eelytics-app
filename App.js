import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './navigators/MainNavigator';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();
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
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* MainNavigator is now nested inside the stack */}
            <Stack.Screen name="MainApp" component={MainNavigator} />
          </Stack.Navigator>
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