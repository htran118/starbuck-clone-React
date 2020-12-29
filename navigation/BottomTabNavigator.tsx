import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Icon} from 'react-native-elements';

import {HomeStackNavigator, ScanTabNavigator, OrderTabNavigator, GiftTabNavigator, StoreTabNavigator} from './MainScreenNavigator'
import {BottomTabParamList} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export function BottomTabNavigator() {
	return (
		<BottomTab.Navigator keyboardHidesTabBar={true} initialRouteName="Home">
			<BottomTab.Screen name="Home" component={HomeStackNavigator}
							  options={{tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,}}
			/>
			<BottomTab.Screen name="Scan" component={ScanTabNavigator}
							  options={{tabBarIcon:({color}) => <TabBarIcon name="qr-code" color={color} />,}}
			/>
			<BottomTab.Screen name="Order" component={OrderTabNavigator}
							  options={{tabBarIcon:({color}) => <TabBarIcon name="local-cafe" color={color} />,}}
			/>
			<BottomTab.Screen name="Gift" component={GiftTabNavigator}
							  options={{tabBarIcon:({color}) => <TabBarIcon name="card-giftcard" color={color} />,}}
			/>
			<BottomTab.Screen name="Stores" component={StoreTabNavigator}
							  options={{tabBarIcon:({color}) => <TabBarIcon name="map" color={color} />,}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props:{name:string; color:string}) {
	return <Icon size={30} containerStyle={{marginBottom:-3}} {...props} />;
}