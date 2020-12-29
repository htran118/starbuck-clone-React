import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList, HomeStackParamList} from './types';
import {BottomTabNavigator} from './navigation/BottomTabNavigator';
//import LinkingConfiguration from './navigation/LinkingConfiguration';
import {NotFoundScreen} from './screens/NotFoundScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
	var loginState = {false};
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Root">
				<Stack.Screen name="Root" component={BottomTabNavigator} />
				<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
