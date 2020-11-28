import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput, Dimensions } from 'react-native';

function CreateUser({ route, navigation }) {
    const [firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [identification, setIdentification] = useState();
    const [dateBirth, setDateBirth] = useState("");
    const [residency, setResidency] = useState("");
    const [downtown, setDowntown] = useState("");
    const [telephone, setTelephone] = useState();

    const showData  = () =>{
        console.log("identification: " + identification);
    } 

    const createUser = async () => {
        try {
            const response = await fetch('http://192.168.1.6:3000/createUser', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstname,
                    lastName: lastName,
                    identification: identification, 
                    dateBirth: dateBirth,
                    residency: residency,
                    downtown: downtown, 
                    telephone: telephone
                })
            });
            const json = await response.json();
            Alert.alert("User Created Succesfully");
            navigation.goBack();
        } catch (error) {
            const errFor = error.message
            const errApi = `The api says that: ${errFor}`
            const errApp = "Enter all data or check the format";
            Alert.alert(
                (errApp),
                (errApi)
            );    
        }
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.inputStyle} onChangeText={text => setIdentification(text)} placeholder="Document"></TextInput>
            <TextInput style={styles.inputStyle} onChangeText={text => setFirstName(text)} placeholder="Name"></TextInput>
            <TextInput style={styles.inputStyle} onChangeText={text => setLastName(text)} placeholder="LastName"></TextInput>
            <TextInput style={styles.inputStyle} onChangeText={text => setDateBirth(text)} placeholder="Birthdate"></TextInput>
            <TextInput style={styles.inputStyle} onChangeText={text => setResidency(text)} placeholder="Resindecy"></TextInput>
            <TextInput style={styles.inputStyle} onChangeText={text => setDowntown(text)} placeholder="Downtown"></TextInput>
            <TextInput style={styles.inputStyle} onChangeText={text => setTelephone(text)} placeholder="Telephone"></TextInput>
            <TouchableHighlight style={styles.styleButton} onPress={createUser}>
                <Text style={styles.styleText}>Create</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputStyle: {
        borderBottomWidth: 1,
        padding: 15,
        borderColor: '#03A9F4',
        marginTop: 20,
        width: Dimensions.get("window").width*0.9,
        textAlign: 'left'
    },
    styleButton: {
        backgroundColor: "#03A9F4",
        padding: 10,
        borderRadius: 10,
        marginTop: 25
    },
    styleText: {
        color: "white"
    }
});

export default CreateUser;
