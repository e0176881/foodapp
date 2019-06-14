import React, { Component } from 'react';
import {
  StyleSheet, Text, TextInput, View, Button,  TouchableOpacity
} from 'react-native';
import firebase from 'react-native-firebase'

import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';

export default class Login extends Component<> {
  state = { email: '', password: '', errorMessage: null }
	signup() {
		Actions.signup()
	}
  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {

        alert("login success")
        this.props.navigation.navigate('addRestaurant')
        })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
	render() {
		return(
			<View style={styles.container}>
				<Logo/>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
      <TextInput style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          placeholder="Email"
          placeholderTextColor = "#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          onSubmitEditing={()=> this.password.focus()}
          />
      <TextInput style={styles.inputBox} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor = "#ffffff"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          ref={(input) => this.password = input}
          />  
       <TouchableOpacity style={styles.button}>
         <Text onPress={this.handleLogin} style={styles.buttonText}>LOGIN</Text>
       </TouchableOpacity>  
				<View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
					<TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
				</View>
			</View>	
			)
	}
}
const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  signupTextCont : {
  	flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
  signupButton: {
  	color:'#ffffff',
  	fontSize:16,
  	fontWeight:'500'
  },

  inputBox: {
    width:300,
    backgroundColor:'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#1c313a',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
});