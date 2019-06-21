import React, {
    Component
} from 'react';
import {
    NavigationActions,
    HeaderBackButton
} from 'react-navigation';
import firebase from 'react-native-firebase';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';



export default class AddRestaurant extends React.Component {
    static navigationOptions = ({
        navigation
    }) => {
        return {
            headerLeft: (<
                HeaderBackButton onPress={
                    () => navigation.navigate(NavigationActions.navigate({
                        routeName: 'Bottom',
                        action: NavigationActions.navigate({
                            routeName: 'Home'
                        })
                    }))
                }
            />
            ),
            title: 'Add Review',
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: '',
            foodPrice: '',
            description: '',
            rating: '',
            testDescription: '',
            uniqueKey: '',
            errorMessage: null
        };
        this.addReview = this.addReview.bind(this);
        this.readReview = this.readReview.bind(this);
        this.updateReview = this.updateReview.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loginName: user.email,
                    uid: user.uid
                })
            }
        });
    }

    addReview = () => {
        const {
            restaurantName,
            foodPrice,
            description,
            rating
        } = this.state
        firebase
            .database()
            .ref('reviews')
            .child('reviews/' + this.state.uid && this.state.uid)
            .push({
                restaurantName: restaurantName,
                foodPrice: foodPrice,
                description: description,
                rating: rating
            })
            .then((response) => {
                alert("Review added successfully!")
            })
            .catch(error => alert(error.message))
    }

    readReview = () => {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/reviews/' + userId).once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var description = (childSnapshot.val() && childSnapshot.val().restaurantName)
                var uniqueKey = (childSnapshot.key && childSnapshot.key)
                this.setState({
                    testDescription: description,
                    uniqueKey: uniqueKey
                })
            }.bind(this))
        }.bind(this));

    }

    updateReview = () => {

        firebase
            .database()
            .ref('reviews')
            .child('reviews/' + this.state.uid && this.state.uid)
            .child(this.state.uniqueKey && this.state.uniqueKey)
            .set({
                restaurantName: this.state.testDescription && this.state.testDescription,
                foodPrice: 'idk',
                description: 'idk',
                rating: 'idk'
            })
            .then((response) => {
                alert("Review updated successfully!")
            })
            .catch(error => alert(error.message))
    }


    render() {
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
                    onSubmitEditing={() => this.foodPrice.focus()}
                />

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Food Price"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    onChangeText={foodPrice => this.setState({ foodPrice })}
                    value={this.state.foodPrice}
                    onSubmitEditing={() => this.description.focus()}
                />


                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Description"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="numeric"
                    onChangeText={description => this.setState({ description })}
                    value={this.state.description}
                    onSubmitEditing={() => this.rating.focus()}
                />

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Rating"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="numeric"
                    onChangeText={rating => this.setState({ rating })}
                    value={this.state.rating}
                    onSubmitEditing={() => this.phoneNumber.focus()}
                    ref={(input) => this.rating = input}
                />
                <TouchableOpacity style={styles.button}>
                    <Text onPress={this.addReview} style={styles.buttonText}>Add Review</Text>
                </TouchableOpacity>

                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Restoran Name"
                    placeholderTextColor="#ffffff"
                    selectionColor="#fff"
                    keyboardType="numeric"
                    onChangeText={testDescription => this.setState({ testDescription })}
                    value={this.state.testDescription && this.state.testDescription}
                />

                <TouchableOpacity style={styles.button}>
                    <Text onPress={this.readReview} style={styles.buttonText}>Read Review</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text onPress={this.updateReview} style={styles.buttonText}>Update Review</Text>
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
