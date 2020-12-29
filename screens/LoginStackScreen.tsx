import * as React from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity} from 'react-native';
//import {Spinner} from 'react-bootstrap';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {useNavigation} from '@react-navigation/native';

import {Styles} from '../themes/Styles'
import {AWSLoginUSEast2} from '../constants/aws-gateway'

export class LoginStackScreen extends React.Component {
	state = {
		JoinClick:false,
		EmailAddClick:false,
		EmailAddCheck:true,
		PasswordClick:false,
		PasswordCheck:true,
		WrongLogin:false,
		EmailAdd:'',
		Password:'',
		Loading:false,
	};
	
	constructor(props) {
		super(props);
		this.navigation = this.props.navigation;
	};
	
	verifyEmailAdd = (txt) => {
		this.state.EmailAddCheck = (txt.length == 0);
	}
	setEmailAdd = (e) => {
		this.verifyEmailAdd(e.nativeEvent.text);
		this.setState({EmailAdd: e.nativeEvent.text, WrongLogin: false});
	};
	
	verifyPassword = (txt) => {
		this.state.PasswordCheck = (txt.length == 0);
	}
	setPassword = (e) => {
		this.verifyPassword(e.nativeEvent.text);
		this.setState({Password: e.nativeEvent.text, WrongLogin: false});
	};
	
	login = async () => {
		//console.log('Login');
		this.verifyEmailAdd(this.state.EmailAdd);
		this.verifyPassword(this.state.Password);
		if(!this.state.EmailAddCheck && !this.state.PasswordCheck) {
			var result;
			this.setState({Loading: true});
			await fetch(AWSLoginUSEast2, {	method: 'POST',
											headers: {'Content-Type': 'application/json'},
											body: JSON.stringify({EmailAdd: this.state.EmailAdd,
																  Password: this.state.Password})})
				  .then((response) => response.json())
				  .then((response) => {
						//console.log(response);
						if(response == 'Wrong data')
							this.setState({JoinClick: true, Loading: false, WrongLogin: true});
						else {
							this.navigation.popToTop();
							this.navigation.navigate('MainScreen');
						}
				  })
				  .catch((error) => {
						console.error(error); 
				  });
		}
		else
			this.setState({JoinClick: true,});
	}
	
	render() { return (
		<ScrollView style={Styles.ScrollStyle}>
			{/* Email Adress */}
			<View style={Styles.LeftContainer}>
				<FloatingLabelInput label={'Email or username'}
									value={this.state.EmailAdd}
									onChange={(e) => this.setEmailAdd(e)}
				/>
			</View>
			{this.state.JoinClick && this.state.EmailAddCheck && (
				<Text style={Styles.WarnText}>Please enter a valid email or username</Text>
			)}
			{/* Password */}
			<View style={Styles.LeftContainer}>
				<FloatingLabelInput	label={'Password'}
									value={this.state.Password}
									onChange={(e) => this.setPassword(e)}
				/>
			</View>
			{this.state.JoinClick && this.state.PasswordCheck && !this.state.WrongLogin && (
				<Text style={Styles.WarnText}>Please enter a valid password</Text>
			)}
			{this.state.JoinClick && this.state.WrongLogin && (
				<Text style={Styles.WarnText}>The email, username or password entered is incorrect </Text>
			)} 
			<View style={Styles.LeftContainer}>
				<Button	title="Forgot username?"type="outline"/>
			</View>
			<View style={Styles.LeftContainer}>
				<Button	title="Forgot password?" type="outline"/>
			</View>
			<View style={{alignItems:'flex-end'}}><TouchableOpacity style={Styles.RoundButton} onPress={() => this.login()}>
				{this.state.Loading ? <Text style={{color:'white', fontSize:16}}>O</Text>
									: <Text style={{color:'white', fontSize:14}}>Join now</Text>}
			</TouchableOpacity></View>
		</ScrollView> 
	);}
}