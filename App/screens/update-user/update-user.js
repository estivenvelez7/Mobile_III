import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert, TextInput, Dimensions } from 'react-native';

function UpdateUser({ route, navigation }) {  
    const documentI = route.params.user.identification;
    const I = documentI.toString(); 
    const telephoneP = route.params.user.telephone;
    const P = telephoneP.toString();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [identification, setIdentification] = useState();
    const [datebirth, setDateBirth] = useState("");
    const [residency, setResidency] = useState("");
    const [downtown, setDowntown] = useState("");
    const [telephone, setTelephone] = useState();
    const UserId = route.params.user._id;
    const updateUser = async () => {
        try {
            const response = await fetch(`http://192.168.1.6:3000/updateUser/${UserId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: UserId,
                    firstName: firstname,
                    lastName: lastname,
                    identification: identification,
                    dateBirth: datebirth,
                    residency: residency,
                    downtown: downtown,
                    telephone: telephone
                })
            });
            const json = await response.json();
            Alert.alert("Update:", "User Update Succesfully");
            navigation.navigate('All appointments');
        } catch (error) {
            const errApi = error.message 
            const errApp = "Enter all data or check the format";
            Alert.alert(
                (errApp),
                (errApi)
            );
        }
    }
    useEffect(() => {
        setIdentification(I);
        setFirstName(route.params.user.firstName);
        setLastName(route.params.user.lastName);
        setDateBirth(route.params.user.dateBirth);
        setResidency(route.params.user.residency);
        setDowntown(route.params.user.downtown);
        setTelephone(P);
    }, [])
    return (
        <View style={styles.container}>
            <TextInput style={styles.inputStyle} value={identification} onChangeText={text => setIdentification(text)} placeholder="Document"></TextInput>
            <TextInput style={styles.inputStyle} value={firstname} onChangeText={text => setFirstName(text)} placeholder="Name"></TextInput>
            <TextInput style={styles.inputStyle} value={lastname} onChangeText={text => setLastName(text)} placeholder="LastName"></TextInput>
            <TextInput style={styles.inputStyle} value={datebirth} onChangeText={text => setDateBirth(text)} placeholder="Birthdate"></TextInput>
            <TextInput style={styles.inputStyle} value={residency} onChangeText={text => setResidency(text)} placeholder="Resindecy"></TextInput>
            <TextInput style={styles.inputStyle} value={downtown} onChangeText={text => setDowntown(text)} placeholder="Downtown"></TextInput>
            <TextInput style={styles.inputStyle} value={telephone} onChangeText={text => setTelephone(text)} placeholder="Telephone"></TextInput>
            <TouchableHighlight style={styles.styleButton} onPress={updateUser}>
                <Text style={styles.styleText}>Update User</Text>
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

export default UpdateUser;
