import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, ScrollView } from 'react-native';
import CardComponent from '../card-component/card-component';
import { useIsFocused } from '@react-navigation/native';

function GetUsers({ navigation }) {
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const apiBaseurl = "http://192.168.1.6:3000"
  const GetUsers = async () => {
    let response = await fetch(`${apiBaseurl}/get`);
    let json = await response.json();
    setUsers(json.users);
  }

  const detailUser = (item) => {
    navigation.navigate('Information of the patiente', { user: item });
  }

  useEffect(() => {
    GetUsers();
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
          <Text style={styles.styleTitle}>These are all the quotes so far</Text>
          <FlatList
            data={users}
            renderItem={({ item }) =>
              <TouchableHighlight
                underlayColor="#fff"
                onPress={() => detailUser(item)}
              >
                <CardComponent user={item}></CardComponent>
              </TouchableHighlight>}
            keyExtractor={item => item.id}
          ></FlatList>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  styleButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10
  },
  styleText: {
    color: "white"
  },
  styleTitle: {
    fontSize: 20,
    marginVertical: 15,
    textTransform: 'uppercase',
    color: 'gray'
  }
});

export default GetUsers;
