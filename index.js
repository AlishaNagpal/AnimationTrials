/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import  ImageOverlay from "./ImageOverlay";
import TabBarAnimation from './TabBarAnimation';
import BottomNavigator from './BottomNavigator'
import TabBar from './components/TabBar'
import CustomTabBar from "./components/CustomTabBar";
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => CustomTabBar);