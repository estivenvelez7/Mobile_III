import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';


function CardComponent (props){
    const {identification, firstName, telephone} = props.user;
    return(
        <View style = {styles.container}>
          <Image source={require('../../assets/logo-card.jpg')} style = {styles.imgCard}></Image>
          <View style = {styles.subContainer}> 
              <Text>Identification : {identification}</Text>
              <Text>Name: {firstName}</Text>
              <Text>Telephone: {telephone}</Text>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems:'center',
      flexDirection : 'row',
      marginTop: 10,
      marginBottom : 10, 
      borderWidth: 1,
      borderColor: '#0288D1',
      borderRadius : 10,
      paddingHorizontal: 25,
      paddingVertical: 5,
      width: Dimensions.get("window").width*0.8,
    },
    subContainer : {

    },
    imgCard :{
      width:50,
      height:50,
      right: 20
    }
  });

  export default CardComponent;