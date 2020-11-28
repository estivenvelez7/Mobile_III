import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions   } from 'react-native';

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/bg-1.jpg')} style={styles.imgBg}></Image>
            <Text style={styles.title} >Welcome to S&E</Text>
            <Text style={styles.subTitle}>You want to do?</Text>
            <Text style={styles.subText}>In these buttons you can schedule an appointment or look at all appointments</Text>
            <Image source={require('../../assets/img-1.jpg')} style={styles.imgHome}></Image>
            <View style = {styles.subContainer}>
                <View>
                    <TouchableHighlight style={styles.buttonCreate} underlayColor="#fff" onPress={() => navigation.navigate('Create an appointment')}>
                        <Text style={styles.textButton}>Make an appointment</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight style={styles.buttonLook} underlayColor="#fff" onPress={() => navigation.navigate('All appointments')}>
                        <Text style={styles.textButton}>Look at all the quotes</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    subContainer : {
        position : 'absolute',
        top: 350,
        left : 200
    },
    title : {
        fontSize : 30,
        fontStyle : 'italic', 
        fontWeight: 'bold',
        color : "#03A9F4",
        position: 'absolute',
        top : 30
    },
    subTitle: {
        fontSize : 25,
        color : "black",
        top : 25
    },
    subText:{
        fontSize : 15,
        color : "gray",
        width: Dimensions.get("screen").width * 0.9,
        textAlign: 'center',
        top : 30, 
        borderBottomWidth:0.5,
        paddingBottom: 20,
        borderColor: "gray"
    },
    buttonLook: {
        backgroundColor: "#FFC107",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    buttonCreate: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15, 
    },
    textButton: {
        color: "#fff"
    },
    imgHome: {
        width: 400,
        height: 300,
        marginRight: 50, 
        position : 'absolute',
        bottom : Dimensions.get("window").width * 0.3
    },
    imgBg : {
        width: Dimensions.get("window").width * 1,
        height: 150
    }, 
    footer:{
        backgroundColor: '#9E9E9E', 
        width: Dimensions.get("window").width * 1,
        height: 110,
        bottom: 0, 
        position : 'absolute',
        justifyContent: "center",
        alignItems :"center"
    },
    textFooter : {
        color: "#fff"
    }
});

export default Home;
