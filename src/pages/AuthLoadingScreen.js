import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import firebase from 'react-native-firebase'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
    },
});

export default class AuthLoadingScreen extends React.Component {
 
    constructor(props) {
        super(props);
        this.navigateAsync = this.navigateAsync.bind(this);
        this.navigateAsync();
    }

    async navigateAsync() {
        firebase.auth().onAuthStateChanged((user) => {
           
            if (user) {     
                this.props.navigation.navigate('Bottom');
            }
            else{
                this.props.navigation.navigate('Auth');
            }
            
         });
        
    }

   
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}