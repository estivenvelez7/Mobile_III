import React from 'react';
import { StyleSheet, Text, View, Alert, Image, Dimensions } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

function DetailUser({ route, navigation }) {
    console.log(route.params.user);
    const UserId = route.params.user._id;
    const { identification, firstName, lastName, dateBirth, residency, downtown, telephone, id } = route.params.user;
    const deleteUser = async () => {
        try {
            const response = await fetch(`http://192.168.1.6:3000/deleteUser/${UserId}`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });
            const json = await response.json();
            Alert.alert("User Delete Succesfully");
            navigation.goBack();
        } catch (error) {
            Alert.alert('Error: ', error.message);
        }
    }

    const securityButton = () => {
        Alert.alert('Warning!!', 'Are you sure you want to delete this quote?', [
            { text: 'Cancel', onPress: () => console.log(false) },
            { text: 'Delete', onPress: () => deleteUser() }
        ])
    }

    const updateUser = () => {
        navigation.navigate('Update Data', { user: route.params.user })
    }

    return (
        <View>
            <Image source={require('../../assets/4.jpg')} style={styles.imgDetail}></Image>
            <View style = {styles.subContainer}>
                <View>
                    <Text>Identification: {identification}</Text>
                    <Text>Name : {firstName}</Text>
                    <Text>Last Name : {lastName}</Text>
                </View>
                <View>
                    <Text>Birthdate : {dateBirth}</Text>
                    <Text>Residency : {residency}</Text>
                    <Text>Downtown : {downtown}</Text>
                    <Text>Telephone : {telephone}</Text>
                </View>
            </View>
            <View style={styles.buttons} >
                <TouchableHighlight style={styles.buttonUpdate} onPress={updateUser}>
                    <Text style={styles.styleText}>UPDATE</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonDelete} onPress={securityButton}>
                    <Text style={styles.styleText}>DELETE</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subContainer: {
        flexDirection : 'row',
        justifyContent : 'space-evenly',
        alignItems : 'center',
        marginTop : 30    
    },
    buttonUpdate: {
        backgroundColor: "#00BCD4",
        padding: 5,
        borderRadius: 10,
        width: 100
    },
    buttonDelete: {
        backgroundColor: "#F44336",
        padding: 5,
        borderRadius: 10,
        width: 100,
    },
    styleText: {
        color: "white",
        textAlign: 'center'
    },
    imgDetail: {
        width: Dimensions.get("window").width * 1,
        height: Dimensions.get("window").height * 0.5,
    },
    buttons: {
        marginTop: 35,
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
        
    }
});

export default DetailUser;