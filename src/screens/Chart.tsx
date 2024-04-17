import { LineChart, Grid } from 'react-native-svg-charts';
import { Dimensions,StyleSheet, View, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  // Add other screens here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Chart'>;
export const Chart = () => {
  const navigation =  useNavigation<NavigationProp>();
  // const handleSignIn = () => {
  //   console.log("login");
  //   navigation.navigate("Home");
  // };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', bottom: 20, flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width:200 }}>
      <Button title="Home" onPress={() => { navigation.navigate("Home") }} />
      <Button title="Chart" onPress={() => { navigation.navigate("Chart") }} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    //justifyContent: 'center',
  },
  table: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#EA9939',
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    width: 300,
    height: 60,
    alignItems: 'center',
    backgroundColor: "#fff",

  },
  main: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  sub: {
    width: 100,
  },
  roomtable: {

  },
  roomrow: {
    flexDirection: 'row',
    backgroundColor: "#fff",
  },
  roomcell: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: "#FFE0BC"
  },
  routineTable: {
    paddingVertical: 10,
    flexDirection: 'column',
    backgroundColor: "#fff",
  },
  routineCell: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 10,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: "#FFE0BC"
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  }
});

