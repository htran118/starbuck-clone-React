import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import {MainStackScreen} from '../screens/MainStackScreen';
import {HomeStackScreen} from '../screens/HomeStackScreen';
import {SignupStackScreen} from '../screens/SignupStackScreen';
import {LoginStackScreen} from '../screens/LoginStackScreen';
import {ScanTabScreen} from '../screens/ScanTabScreen';
import {OrderTabScreen} from '../screens/OrderTabScreen';
import {GiftTabScreen} from '../screens/GiftTabScreen';
import {StoreTabScreen} from '../screens/StoreTabScreen';
import {HomeStackParamList, ScanTabParamList, OrderTabParamList, GiftTabParamList, StoreTabParamList} from '../types';

//Stack for each tab
const HomeStack = createStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
	return (
		<HomeStack.Navigator initialRouteName="HomeScreen">
			<HomeStack.Screen
				name="HomeScreen"
				component={HomeStackScreen}
				options={{ headerTitle:'Its a great day for coffee', headerTitleStyle:{fontWeight:'bold', fontSize:30},}}
			/>
			<HomeStack.Screen
				name="SignupScreen"
				component={SignupStackScreen}
				options={{ headerTitle:'Starbucks Rewards', headerTitleStyle:{fontWeight:'bold', fontSize:30},}}
			/>
			<HomeStack.Screen
				name="LoginScreen"
				component={LoginStackScreen}
				options={{ headerTitle:'Sign in to Rewards', headerTitleStyle:{fontWeight:'bold', fontSize:30},}}
			/>
			<HomeStack.Screen
				name="MainScreen"
				component={MainStackScreen}
				options={{ headerTitle:'Its a great day for coffee', headerTitleStyle:{fontWeight:'bold', fontSize:30},}}
			/>
		</HomeStack.Navigator>
	);
}

const ScanTab = createStackNavigator<ScanTabParamList>();

export function ScanTabNavigator() {
	return (
		<ScanTab.Navigator>
			<ScanTab.Screen
				name="ScanScreen"
				component={ScanTabScreen}
				options={{ headerTitle:'Scan' }}
			/>
		</ScanTab.Navigator>
	);
}

const OrderTab = createStackNavigator<OrderTabParamList>();

export function OrderTabNavigator() {
	return (
		<OrderTab.Navigator>
			<OrderTab.Screen
				name="OrderScreen"
				component={OrderTabScreen}
				options={{ headerTitle:'Order' }}
			/>
		</OrderTab.Navigator>
	);
}

const GiftTab = createStackNavigator<GiftTabParamList>();
export function GiftTabNavigator() {
	return (
		<GiftTab.Navigator>
			<GiftTab.Screen
				name="GiftScreen"
				component={GiftTabScreen}
				options={{ headerTitle:'Gift Cards' }}
			/>
		</GiftTab.Navigator>
	);
}

const StoreTab = createStackNavigator<StoreTabParamList>();

export function StoreTabNavigator() {
	return (
		<StoreTab.Navigator>
			<StoreTab.Screen
				name="StoreScreen"
				component={StoreTabScreen}
				options={{ headerTitle:'Stores' }}
			/>
		</StoreTab.Navigator>
	);
}
