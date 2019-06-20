import React, { Component } from 'react';
import { NavigationActions,HeaderBackButton} from 'react-navigation';
import firebase from 'react-native-firebase';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';


export default class AddRestaurant extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerLeft: (
            <HeaderBackButton
              onPress={() =>navigation.navigate(NavigationActions.navigate({
                routeName: 'Bottom',
                action: NavigationActions.navigate({ routeName: 'Home' })
              }))}
            />
          )
        };
      }
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: '',
            address: '',
            openingHours: '',
            closingHours: '',
            phoneNumber: '',
            website: '',
            errorMessage: null
        };
        this.addRestaurant = this.addRestaurant.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loginName: user.email
                })
            }
        });
    }

    addRestaurant = () => {
        const { restaurantName, address, openingHours, closingHours, phoneNumber, website } = this.state
        firebase
            .database()
            .ref()
            .child("restaurants")
            .set({
                restaurantName: {
                    address: address,
                    openingHours: openingHours,
                    closingHours: closingHours,
                    phoneNumber: phoneNumber,
                    website: website
                }
            })
            .then((response) => {
                alert("Restaurant added successfully!")
            })
            .catch(error => this.setState({ errorMessage: error.message }))
    }


    render() {

        //firebase.auth().onAuthStateChanged(function (user) {
        //  if (user) {
        // User is signed in.

        return (
            <View style={styles.container}>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Add a Restaurant</Text>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Restaurant Name"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={restaurantName => this.setState({ restaurantName })}
                    value={this.state.restaurantName}
                    onSubmitEditing={() => this.address.focus()}
                />

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Address"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={address => this.setState({ address })}
                    value={this.state.address}
                    onSubmitEditing={() => this.openingHours.focus()}
                />


                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Opening Hours"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="numeric"
                    onChangeText={openingHours => this.setState({ openingHours })}
                    value={this.state.openingHours}
                    onSubmitEditing={() => this.closingHours.focus()}
                />

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Closing Hours"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="numeric"
                    onChangeText={closingHours => this.setState({ closingHours })}
                    value={this.state.closingHours}
                    onSubmitEditing={() => this.phoneNumber.focus()}
                />

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Phone Number"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="phone-pad"
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                    value={this.state.phoneNumber}
                    onSubmitEditing={() => this.website.focus()}
                />


                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Website"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={website => this.setState({ website })}
                    value={this.state.website}
                    onSubmitEditing={() => this.website.focus()}
                />

                <TouchableOpacity style={styles.button}>
                    <Text onPress={this.addRestaurant} style={styles.buttonText}>Add Restaurant</Text>
                </TouchableOpacity>

            </View>
        )

        // } else {
        //     // No user is signed in.
        //     this.props.navigation.navigate('login')
        // }
        //});
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row'
    },
    signupText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },

    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});