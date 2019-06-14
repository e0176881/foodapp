import React from 'react';
import { StyleSheet,TouchableOpacity,Text, View } from 'react-native';
import { createSwitchNavigator,createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import firebase from 'react-native-firebase'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AuthLoadingScreen from './pages/AuthLoadingScreen';
import AddRestaurant from './pages/AddRestaurant';

class HomeScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      loginName : null
    };
   
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
       this.setState({showButton : true, loginName : user.email
      })
      }
   });
  }
  logout = () => { firebase.auth().signOut()
    this.props.navigation.navigate('Login')}
  
  render() {
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome,  {this.state.loginName && this.state.loginName}</Text>
       
        {this.state.showButton &&  <TouchableOpacity style={styles.button}>
       
         <Text onPress={this.logout} style={styles.buttonText}>LOGOUT</Text>
        
       </TouchableOpacity> 
       }
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

 const AuthStack = createStackNavigator(
  {
    Login: Login,
		Signup: Signup,
		AddRestaurant: AddRestaurant,
		
  },
  {
    defaultNavigationOptions: {
      tabBarVisible: true,
      header : null
  
    },
    initialRouteName : 'Login'
        //set default to be login or signup..
  }
);

 const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
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
        AuthLoading : {screen: AuthLoadingScreen, navigationOptions: {header:null}},
      Bottom: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
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
