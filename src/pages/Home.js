import React from 'react';
import { StyleSheet,TouchableOpacity,Text, View } from 'react-native';
import { createSwitchNavigator,createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'react-native-firebase'
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';

class App extends React.Component {

  componentDidMount() {
    
  }
  logout = () => { firebase.auth().signOut()
    this.props.navigation.navigate('Login')}
  
  render() {
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <TouchableOpacity style={styles.button}>
         <Text onPress={this.logout} style={styles.buttonText}>LOGOUT</Text>
       </TouchableOpacity> 
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

export const AuthStack = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: true,
    },
  }
);

export const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    }
  }

}, {//router config
    initialRouteName: 'Home',
    order: ['Home', 'Settings'],
    //navigation for complete tab navigator
    navigationOptions: {
      tabBarVisible: true
    },
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'grey'
    }
  });

  export default createAppContainer(createSwitchNavigator(
    {
      Bottom: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Bottom',
    }
  ));
  

const styles = StyleSheet.create({

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