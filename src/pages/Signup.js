import React, { Component } from 'react';
import firebase from 'react-native-firebase'
import { StyleSheet, Text, TextInput, View,  TouchableOpacity } from 'react-native'
import {NavigationActions } from 'react-navigation'
import Logo from '../components/Logo';




export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
     //this constructor is very important, if not wont be able to call other pages from Routes.js.
}

  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
      this.props.navigation.navigate('login')})
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  goBack() {
    this.props.navigation.navigate(NavigationActions.navigate({
      routeName: 'Auth',
      action: NavigationActions.navigate({ routeName: 'Login' })
  }))
  }

  render() {
    return (
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
         <Text onPress={this.handleSignUp} style={styles.buttonText}>SIGNUP</Text>
       </TouchableOpacity>    
       <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
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