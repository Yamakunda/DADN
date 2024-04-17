import { StyleSheet, Text, View, Image, TouchableOpacity,Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import axios from "axios";
import { StackNavigationProp } from '@react-navigation/stack';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  // Add other screens here
};
const PORT = 3000;
const HOST = '192.168.223.178';
type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export const Homepage = () => {
  const navigation =  useNavigation<NavigationProp>();

  const [data, setData] = useState(null);
  const refresh = async () =>{
    try {
      const res = await axios.get('http://${HOST}:${PORT}:3000/record');
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }    
  }
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://192.168.223.178:3000/record');
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
  const swichlight = async () => {
    const val = (data as any).light == 0 ? 1 : 0;
    const res = await axios.post("http://192.168.223.178:3000/record/store", {
      light: val
    });
    refresh();
  };
  const swichfan = async () => {
    const val = (data as any).fan == 0 ? 100 : 0;
    const res = await axios.post("http://192.168.223.178:3000/record/store", {
      fan: val
    });
    refresh();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginTop: 40, paddingVertical: 40 }]}>
        <Image source={require('../../assets/images/Avatar(2).png')} style={[{ width: 40, height: 40 }]} />
        <Text style={{ color: 'black', fontSize: 24, height: 40, fontWeight: "bold" }}>  Nguyễn Văn A</Text>
      </View>
      <View>
        <Text>Last fetch: {(data as any) ? (data as any).time : 'Loading...'}</Text>
        <TouchableOpacity style={styles.row} >
          <Text>Refresh</Text>
          <TouchableOpacity onPress={refresh}>
        <Image source={require('../../assets/images/refresh.png')} style={[{ width: 20, height: 20 }]} />
        </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={[styles.row, styles.cell]}>
          <View style={styles.row}>
          <Text style={styles.sub}>Room Temp</Text>
          <Image source={require('../../assets/images/temp.png')} style={[{marginLeft:- 20, width: 20, height: 20 }]} />
          </View>
          <Text style={[styles.main,]}>{(data as any) ? (data as any).temp : 'Loading...'} độ C</Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20 }]}>
        <View style={[styles.row, styles.cell]}>
        <View style={styles.row}>
          <Text style={styles.sub}>Humidity</Text>
          <Image source={require('../../assets/images/humid.png')} style={[{marginLeft:- 20, width: 20, height: 20 }]} />
          </View>
          <Text style={styles.main}>{(data as any) ? (data as any).humidity : 'Loading...'}%</Text>

        </View>
      </View>
      <Text style={{ marginTop: 10, marginRight: 220, color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Device</Text>
      <View style={styles.routineTable}>
        <View style={[styles.row, { width: 250 }]}>
        <View style={styles.row}>
          <Image source={require('../../assets/images/light.png')} style={[{ width: 40, height: 40 }]} />
          <Text style={styles.text}>Đèn</Text>
          </View>
          <TouchableOpacity style={styles.routineCell} onPress={swichlight} >
            <Text> {(data as any) ? ((data as any).light == 1 ? "On": "Off") : 'Loading...'} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
        <View style={styles.row}>
          <Image source={require('../../assets/images/fan.png')} style={[{ width: 40, height: 40 }]} />
          <Text style={styles.text}>Quạt</Text>
          </View>
          <TouchableOpacity style={styles.routineCell}>
            <Text> {(data as any) ? ((data as any).fan != 0 ? "On": "Off") : 'Loading...'} </Text>
          </TouchableOpacity>
        </View>
      </View>
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

