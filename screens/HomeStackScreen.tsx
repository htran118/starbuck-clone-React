import * as React from 'react';
import {Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//import ScrollMenu from 'react-horizontal-scrolling-menu';

import {Styles} from '../themes/Styles'

// list of item
let WelcomeCard = [
	{ name:'Card1', caption:'Welcome! You are on your way to earning Stars however you choose to pay', },
	{ name:'Card2', caption:'Scan in store to earn Stars, then redeem for food, drinks and more', },
	{ name:'Card3', caption:'Pay directly (even cash) or preload a Starbucks Card to get Rewards faster', },
	{ name:'Card4', caption:'Keep an out for games, offers, a treat on your birthday, and more', },
];

let CardHeight = 150;
let CardWidth = 250; 

class WelcomeSlide extends React.Component {
	state = {
		itemsCount:WelcomeCard.length,
		selected:0,
		translate:0,
	};

	update(e) {
		this.state.selected = Math.floor((e.nativeEvent.contentOffset.x + CardHeight) / (CardHeight + CardWidth));
		if(this.state.selected > this.state.itemsCount)
			this.state.selected = this.state.itemsCount;
		if(this.state.selected < 0)
			this.state.selected = 0;
		this.setState({translate: e.nativeEvent.contentOffset.x});
	}

	render() { return (
		<View>
			<ScrollView horizontal={true} onScroll={(e) => this.update(e)}>
				<View style={{display:'flex', flexDirection:'row'}}>
					<View style={{width:CardWidth, height:CardHeight, backgroundColor:'teal'}}/>
					<View style={{width:CardHeight, height:CardHeight, backgroundColor: 'white'}}/>
				</View>
				<View style={{display:'flex', flexDirection:'row'}}>
					<View style={{width:CardWidth, height:CardHeight, backgroundColor:'teal'}}/>
					<View style={{width:CardHeight, height:CardHeight, backgroundColor: 'white'}}/>
				</View>
				<View style={{display:'flex', flexDirection:'row'}}>
					<View style={{width:CardWidth, height:CardHeight, backgroundColor:'teal'}}/>
					<View style={{width:CardHeight, height:CardHeight, backgroundColor: 'white'}}/>
				</View>
				<View style={{display:'flex', flexDirection:'row'}}>
					<View style={{width:CardWidth, height:CardHeight, backgroundColor:'teal'}}/>
					<View style={{width:CardHeight, height:CardHeight, backgroundColor: 'white'}}/>
				</View>
			</ScrollView>
			<View style={Styles.Container}><View style={{height:100}}>
				<Text style={Styles.NormalText}>{WelcomeCard[this.state.selected].caption}</Text>
			</View></View>
		</View>
	);}
}

export function HomeStackScreen({navigation}) {
	return (
		<View>
			<ScrollView style={Styles.ScrollStyle}>
				<View style={Styles.LeftContainer}>
					<Button	title="Sign in"
							type="outline"
							onPress={() => navigation.push('LoginScreen')}
					/>
				</View>			
				<Text style={Styles.BoldText}>STARBUCKS REWARDS</Text>
				<WelcomeSlide /> 
				<View style={Styles.LeftContainer}>
					<Button	title="Join now" type="outline"
							onPress={() => navigation.push('SignupScreen')}
					/>
				</View>
				<View style={{display:'flex', height:CardHeight, backgroundColor:'teal'}}/>
				<Text style={Styles.Title}>Imagine free coffee</Text>
				<Text style={Styles.BoldText}>You could win that and more when you join Starbucks Rewards and play the most festive game of the season, Stabucks for Life!</Text>
				<View style={Styles.LeftContainer}>
					<Button	title="Sign me up" type="outline"
							onPress={() => navigation.push('SignupScreen')}
					/>
				</View>
				<View style={{display:'flex', height:CardHeight, backgroundColor:'teal'}}/>
				<Text style={Styles.Title}>Pay your way and be merry</Text>
				<Text style={Styles.BoldText}>Start earning Rewards this holiday. Starbucks Rewards members can now use credit, debit or cash to earn Stars towards free drinks, food and more at participating stores.</Text>
				<View style={Styles.LeftContainer}>
					<Button	title="Join" type="outline"
							onPress={() => navigation.push('SignupScreen')}
					/>
				</View>
				<View style={{marginBottom: 50}}></View>
			</ScrollView>
			<TouchableOpacity style={Styles.FloatingButton}
							  onPress={() => navigation.push('SignupScreen')}>
				<Text style={{color:'white', fontSize:14}}>Join now</Text>
			</TouchableOpacity >
		</View>
	);
}


