import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AlertScreen from '../screens/AlertScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import FeedScreen from '../screens/FeedScreen';
import TankScreen from '../screens/TankScreen';
import Header from '../components/Header';

const Tab = createMaterialTopTabNavigator();

export default function MainNavigator() {
  const [routeName, setRouteName] = React.useState('Dashboard');
  const insets = useSafeAreaInsets();

  return (
    <>
      <Header title={routeName} />
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenListeners={{
          state: (e) => {
            setRouteName(e.data.state.routes[e.data.state.index].name);
          },
        }}
        tabBarPosition="bottom"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Live') {
              iconName = focused ? 'cctv' : 'cctv';
            } else if (route.name === 'Tank') {
              iconName = focused ? 'beaker' : 'beaker-outline';
            } else if (route.name === 'Logs') {
              iconName = focused ? 'format-list-bulleted' : 'format-list-bulleted';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: {
            height: 0,
          },
          tabBarStyle: {
            backgroundColor: 'rgba(30, 32, 34, 0.8)',
            borderTopColor: '#007AFF',
            borderTopWidth: 1,
            paddingBottom: insets.bottom,
            height: 80 + insets.bottom,
          },
          tabBarItemStyle: {
            flexDirection: 'column',
            justifyContent: 'center',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Live" component={FeedScreen} />
        <Tab.Screen name="Tank" component={TankScreen} />
        <Tab.Screen name="Logs" component={AlertScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </>
  );
}