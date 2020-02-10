import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import App from './App'
import ImageOverlay from './ImageOverlay'
import TabBar from './TabBarAnimation'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={App} />
                <Tab.Screen name="Settings" component={App} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;