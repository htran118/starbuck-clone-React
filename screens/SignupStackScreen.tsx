import * as React from 'react';
import {Text, View, Button, StyleSheet, SafeAreaView, ScrollView, Alert, TouchableOpacity} from 'react-native';
//import {Spinner} from 'react-bootstrap';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import {CheckBox} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

import {Styles} from '../themes/Styles'
import {AWSSignupUSEast2} from '../constants/aws-gateway'

export class SignupStackScreen extends React.Component {
	state = {
		JoinClick:false,
		FirstNameCheck:true,
		LastNameCheck:true,
		EmailAddCheck:false,
		EmailAddEmpty:true,
		PasswordClick:false,
		PasswordCheck:false,
		PasswordCheckLength:true,
		PasswordCheckSpecial:true,
		PasswordCheckNumeric:true,
		PasswordCheckLower:true,
		PasswordCheckUpper:true,
		TOSClick:false,
		BioClick:false,
		SubClick:false,
		FirstName:'',
		LastName:'',
		EmailAdd:'',
		Password:'',
		checked:false,
		Loading:false,
		ExistedAccount:false,
	};
	
	constructor(props) {
		super(props);
		this.navigation = this.props.navigation;
	};
	
	verifyFirstName = (txt) => {
		this.state.FirstNameCheck = (txt.length == 0);
	}
	setFirstName = (e) => {
		this.verifyFirstName(e.nativeEvent.text);
		this.setState({FirstName: e.nativeEvent.text});
	};
	
	verifyLastName = (txt) => {
		this.state.LastNameCheck = (txt.length == 0);
	}
	setLastName = (e) => {
		this.verifyLastName(e.nativeEvent.text);
		this.setState({LastName: e.nativeEvent.text});
	};
	
	verifyEmailAdd = (txt) => {
		this.state.EmailAddEmpty = (txt.length == 0);
		this.state.EmailAddCheck = !(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(txt));
	}
	setEmailAdd = (e) => {
		this.verifyEmailAdd(e.nativeEvent.text);
		this.setState({EmailAdd: e.nativeEvent.text});
	};
	
	verifyPassword = (txt) => {
		this.state.PasswordCheckLength = !(txt.length >= 8 && txt.length <= 25);
		this.state.PasswordCheckNumeric = !(/[0-9]/.test(txt));
		this.state.PasswordCheckSpecial = !(/[!-/:-@\[-`\{-~]/.test(txt));
		this.state.PasswordCheckUpper = !(/[A-Z]/.test(txt));
		this.state.PasswordCheckLower = !(/[a-z]/.test(txt));
		this.state.PasswordCheck = this.state.PasswordCheckNumeric || this.state.PasswordCheckUpper ||
								   this.state.PasswordCheckSpecial || this.state.PasswordCheckLower ||
								   this.state.PasswordCheckLength;
		this.state.PasswordClick = {true};
	}
	setPassword = (e) => {
		this.verifyPassword(e.nativeEvent.text);
		this.setState({Password: e.nativeEvent.text});
	};
	
	signup = async () => {
		//console.log('Signup');
		this.verifyFirstName(this.state.FirstName);
		this.verifyLastName(this.state.LastName);
		this.verifyEmailAdd(this.state.EmailAdd);
		this.verifyPassword(this.state.Password);
		if(!this.state.EmailAddCheck && !this.state.PasswordCheck &&
		   !this.state.LastNameCheck && !this.state.FirstNameCheck &&
		   this.state.TOSClick) {
			var result;
			this.setState({Loading: true});
			await fetch(AWSSignupUSEast2, { method: 'POST',
											headers: {'Content-Type': 'application/json'},
											body: JSON.stringify({	FirstName: this.state.FirstName,
																	LastName: this.state.LastName,
																	EmailAdd: this.state.EmailAdd,
																	Password: this.state.Password,
																	Subscription: this.state.SubClick})})
				  .then((response) => response.json())
				  .then((response) => {
						//console.log(response);
						if(response == 'Data existed')
							this.setState({	JoinClick: true, PasswordClick: true,
											Loading: false, ExistedAccount:true});
						else
							this.navigation.navigate('HomeScreen');
						})
				  .catch((error) => {
						console.error(error); 
				  });
		}
		else
			this.setState({JoinClick: true, PasswordClick: true,});
	};
	
	existedAccountAlert = () => {
		return ( Alert.alert("Email registered",
					"Looks like this email address is already registered. Would you like to sign in?",
					[{text: "CANCEL", onPress: () => { /*console.log("Cancel Pressed")*/ }, style: "cancel"},
					 {text: "SIGN IN", onPress: () => { this.navigation.navigate('HomeScreen');
													   this.navigation.navigate('LoginScreen');} }],))
	}
	
	render() { return (
		<ScrollView style={Styles.ScrollStyle}>
			<Text style={Styles.Title}>Personal Info</Text>
			{/* First Name */}
			<View style={Styles.LeftContainer}>
				<FloatingLabelInput	label={'First Name'}
									value={this.state.FirstName}
									onChange={e => this.setFirstName(e)}
				/>
			</View>
			{this.state.JoinClick && this.state.FirstNameCheck && (
				<Text style={Styles.WarnText}>Please enter your first name</Text>
			)}
			{/* Last Name */}
			<View style={Styles.LeftContainer}>
				<FloatingLabelInput	label={'Last Name'}
									value={this.state.LastName}
									onChange={e => this.setLastName(e)}
				/>
			</View>
			{this.state.JoinClick && this.state.LastNameCheck && (
				<Text style={Styles.WarnText}>Please enter your last name</Text>
			)}
			<Text style={Styles.Title}>Personal Info</Text>
			{/* Email Adress */}
			<View style={Styles.LeftContainer}>
				<FloatingLabelInput label={'Email'}
									value={this.state.EmailAdd}
									onChange={e => this.setEmailAdd(e)}
				/>
			</View>
			{this.state.JoinClick && this.state.EmailAddEmpty && (
				<Text style={Styles.WarnText}>Add email</Text>
			)}
			{this.state.JoinClick && this.state.EmailAddCheck && !this.state.EmailAddEmpty && (
				<Text style={Styles.WarnText}>Check your email</Text>
			)}
			{/* Password */}
			<View style={Styles.LeftContainer}>
				<FloatingLabelInput	label={'Password'}
									value={this.state.Password}
									onChange={(txt) => this.setPassword(txt)}
				/>
			</View>
			{this.state.PasswordClick && this.state.PasswordCheckLength && (
				<Text style={Styles.WarnText}>Between 8-25 characters</Text>
			)}
			{this.state.PasswordClick && this.state.PasswordCheckNumeric && (
				<Text style={Styles.WarnText}>At least one number</Text>
			)}
			{this.state.PasswordClick && this.state.PasswordCheckUpper && (
				<Text style={Styles.WarnText}>At least one capital letter</Text>
			)}
			{this.state.PasswordClick && this.state.PasswordCheckLower && (
				<Text style={Styles.WarnText}>At least one lowercase letter</Text>
			)}
			{this.state.PasswordClick && this.state.PasswordCheckSpecial && (
				<Text style={Styles.WarnText}>At least one special character</Text>
			)}
			
			<Text style={Styles.Title}>Preferences & Terms</Text>
			{/* Subscription */}
			<View style={Styles.RowContainer}>
				<CheckBox	checked={this.state.SubClick}
							size={60}
							onPress={() => this.setState({SubClick: !this.state.SubClick})}
				/>
				<View style={Styles.ColContainer}>
					<Text style={Styles.NormalText}>{"Yes, I'd like email from Starbucks"}</Text>
					<Text style={Styles.SmallText}>{"Know about product offers, announcements and initiatives."}</Text>
				</View>
			</View>
			{/* Biometrics */}
			<View style={Styles.RowContainer}>
				<CheckBox	checked={this.state.BioClick}
							size={60}
							onPress={() => this.setState({BioClick: !this.state.BioClick})}
				/>
				<View style={Styles.ColContainer}>
					<Text style={Styles.NormalText}>{"I'd like to use Biometric Unlocks"}</Text>
					<Text style={Styles.SmallText}>{"Use Biometric Unlocks to sign in, authorize purchases, reLoads, transfers, and more"}</Text>
				</View>
			</View>
			{/* TOS */}
			<View style={Styles.RowContainer}>
				<CheckBox	checked={this.state.TOSClick}
							size={60}
							onPress={() => this.setState({TOSClick: !this.state.TOSClick})}
				/>
				<View style={Styles.ColContainer}>
					<Text style={Styles.NormalText}>I accept the Terms of Use</Text>
					<Text style={Styles.SmallText}>By joining, I agreee to Starbucks Rewards Terms, Starbucks Cards Terms, and the Application Terms.</Text>
					{this.state.JoinClick && !this.state.TOSClick && (
						<Text style={Styles.WarnText}>Accepting Terms is required</Text>
					)}
				</View>
			</View>
			{/* Sign up */}
			{this.state.ExistedAccount && this.existedAccountAlert()}
			<View style={Styles.RightContainer}>
				<TouchableOpacity  style={Styles.RoundButton}
								   onPress={() => this.signup()}>
					{this.state.Loading ? <Text style={{color:'white', fontSize:16}}>O</Text>
										: <Text style={{color:'white', fontSize:14}}>Join now</Text>}
				</TouchableOpacity >
			</View>
		</ScrollView>
	);}
}