import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Container, Content, Icon, Header, Left, Body, Right, Segment, Button } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcons from 'react-native-vector-icons/Ionicons'
var { height, width } = Dimensions.get('window');

 var images = [
    require('../images/sample_food/1.jpg'),
    require('../images/sample_food/2.jpg'),
    require('../images/sample_food/3.jpg'),
    require('../images/sample_food/4.jpg'),
    require('../images/sample_food/5.jpg'),
    require('../images/sample_food/6.jpg'),
    require('../images/sample_food/7.jpg'),
    require('../images/sample_food/8.jpg'),
    require('../images/sample_food/9.jpg'),
    require('../images/sample_food/10.jpg'),
    require('../images/sample_food/11.jpg'),
    require('../images/sample_food/12.jpg'),
    require('../images/sample_food/13.jpg'),
    require('../images/sample_food/14.jpg'),
] 

class ProfileScreen extends React.Component {
    static navigationOptions = {


        tabBarIcon: ({ tintColor }) => (
            <Icon name="person" style={{ color: tintColor }} />
        )
    }

    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0
        }
    }


    segmentClicked(index) {
        this.setState({
            activeIndex: index
        })
    }

    checkActive = (index) => {
        if (this.state.activeIndex !== index) {
            return (
                { color: 'grey' }
            )
        }
        else {
            return (
                {}
            )
        }

    }

    //Renders grid of images for the profile page 
    renderSectionOne() {
        return images.map((image, index) => {
            return (
                <View key={index} style={[{ width: (width) / 3 }, { height: (width) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 }]}>
                    <Image style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined,
                    }}
                        source={image}>
                    </Image>

                </View>
            )
        })
    }

    //Used to toogle rendering of the different sections 
    renderSection() {

        if (this.state.activeIndex == 0) {

            return (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                    {this.renderSectionOne()}
                </View>
            )

        }
        else if (this.state.activeIndex == 1) {
            return (
                <View>
                    <CardComponent imageSource="1" likes="101" />
                    <CardComponent imageSource="2" likes="101" />
                    <CardComponent imageSource="3" likes="101" />
                </View>
            )
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header style={{ backgroundColor: '#fffff', paddingLeft: 10, paddingLeft: 10 }}>
                    <Left>
                    <MaterialIcons name="feather"  style={[this.state.activeIndex == 0 ? {fontSize: 32} : {fontSize: 32, color: 'black' }]} />
                    </Left>
                    <Right>
                        <Icon name="ios-settings"  size={24} />
                    </Right>
                </Header>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Image source={require('../images/private.jpg')} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eae5e5' }}>
                    

                    
                    <Button
                        onPress={() => this.segmentClicked(0)}
                        transparent
                        active={this.state.activeIndex == 0}
                    >
                        <IonIcons name="ios-restaurant"  style={[this.state.activeIndex == 0 ? {fontSize: 32} : {fontSize: 32, color: 'grey' }]} />
                       
                       
                    </Button>
                    

                    <Button
                        onPress={() => this.segmentClicked(1)}
                        transparent active={this.state.activeIndex == 1}>
                        <MaterialIcons name="compass"  style={[this.state.activeIndex == 0 ? {fontSize: 32} : {fontSize: 32, color: 'grey' }]} />
                        
                    </Button>

                    <Button
                        onPress={() => this.segmentClicked(2)}
                        transparent active={this.state.activeIndex == 2}>
                        <MaterialIcons name="feather"  style={[this.state.activeIndex == 0 ? {fontSize: 32} : {fontSize: 32, color: 'grey' }]} />
                        
                    </Button>
                    
                </View>

                {this.renderSection()}
            
            </Container>



        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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

export default ProfileScreen;