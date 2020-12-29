import * as React from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {Styles} from '../themes/Styles'
	
export function MainStackScreen({navigation}) {	
	return (
		<SafeAreaView style={Styles.Container}><View style={{alignItems:'center',}}>
			<Text style={Styles.Title}>WELCOME</Text>
		</View></SafeAreaView>
	);
}