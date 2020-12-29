import * as React from 'react';
import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
	Container:{
		flex:3,
		justifyContent:'center',
	},
	RowContainer:{
		flex:3,
		alignItems:'flex-start',
		flexDirection:'row',
		marginBottom:20,
	},
	ColContainer:{
		flex:3,
		alignItems:'flex-start',
		flexDirection:'column',
		marginLeft:20,
	},
	LeftContainer:{
		flex:5,
		justifyContent:'center',
		alignItems:'flex-start',
		margin:20
	},
	RightContainer:{
		flex:5,
		justifyContent:'center',
		alignItems:'flex-end',
		margin:20
	},
	IndentContainer:{
		margin:20,
		flex:5,
		alignItems:'flex-start',
		justifyContent:'center',
	},
	BoldText:{
		fontSize:12,
		margin:20,
		fontWeight:'bold',
	},
	NormalText: {
		fontSize:12,
		margin:20,
	},
	SmallText: {
		fontSize:10,
		margin:20,
	},
	WarnText: {
		fontSize:10,
		margin:20,
		color:'red',
		fontWeight:'bold',
	},
	Header:{
		fontSize:30,
		margin:20,
		fontWeight:'bold',
	},
	Title:{
		fontSize:20,
		margin:20,
		fontWeight:'bold',
	},
	ScrollStyle:{
		backgroundColor:'white',
		marginHorizontal:20,
	},
	InputBoxStyle:{
		borderWidth:0,
		borderRadius:20,
		paddingHorizontal:10,
	},
	InputStyle:{
		margin:20,
		paddingVertical:10,
	},
	FloatingButton:{
		borderWidth: 1,
		borderColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 15,
		right: 50,
		width: 120,
		height: 45,
		backgroundColor: 'green',
		borderRadius: 50,
	},
	RoundButton:{
		borderWidth: 1,
		borderColor: 'green',
		alignItems: 'center',
		justifyContent: 'center',
		bottom: 15,
		right: 50,
		width: 120,
		height: 45,
		backgroundColor: 'green',
		borderRadius: 50,
	},
});
