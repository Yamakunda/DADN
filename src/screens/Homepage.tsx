import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { apiFacade } from './apiFacade';
import { StackNavigationProp } from '@react-navigation/stack';
import Slider from '@react-native-community/slider';
import {Notifications} from 'react-native-notifications';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  // Add other screens here
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export const Homepage = (account: any) => {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState(null);
  const nickname = account.route.params.nickname;
  const refresh = async () => {

    try {
      const data = await apiFacade.getRecord();
      setData(data);
    //   Notifications.setNotificationChannel({
    //     channelId: 'my-channel',
    //     name: 'My Channel',
    //     importance: 5,
    //     description: 'My Description',
    //     enableLights: true,
    //     enableVibration: true,
    //     groupId: 'my-group', // optional
    //     groupName: 'My Group', // optional, will be presented in Android OS notification permission
    //     showBadge: true,
    //     // soundFile: 'custom_sound.mp3',  // place this in <project_root>/android/app/src/main/res/raw/custom_sound.mp3
    //     vibrationPattern: [200, 1000, 500, 1000, 500],
    // })
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    refresh();
    const intervalId = setInterval(refresh, 10000);
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    }
  }, []);
  const switchLight = async (val: any) => {
    const res = await apiFacade.switchLight(val);
    setData(res);
  };
  const switchFan = async (val: any) => {
    const res = await apiFacade.switchFan(val);
    setData(res);
  };
  const switchDoor = async () => {
    const val = (data as any).door == "0" ? 1 : 0;
    const res = await apiFacade.switchDoor(val);
    setData(res);
  };
  const dateTime = new Date((data as any)?.time);
  const date = `${dateTime.getFullYear()}-${dateTime.getMonth()+1}-${dateTime.getDate()}`;
  const time = `${(dateTime.getHours()+17 < 24 ? dateTime.getHours()+17 : dateTime.getHours()-7)}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
  return (
    <View style={styles.container}>
      <View style={[styles.row, { marginTop: 10, paddingVertical: 10 }]}>
        <Image source={require('../../assets/images/Avatar(2).png')} style={[{ width: 40, height: 40 }]} />
        <Text style={{ color: 'black', fontSize: 24, height: 40, fontWeight: "bold" }}>  {nickname}</Text>
      </View>
      <View>
      <Text>Cập nhật cuối: {time} {date}</Text>
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
            <Image source={require('../../assets/images/temp.png')} style={[{ marginLeft: -10, width: 20, height: 20 }]} />
          </View>
          <Text style={[styles.main,]}>{(data as any) ? (data as any).temp : 'Wait'} độ C</Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20 }]}>
        <View style={[styles.row, styles.cell]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Humidity</Text>
            <Image source={require('../../assets/images/humid.png')} style={[{ marginLeft: - 30, width: 20, height: 20 }]} />
          </View>
          <Text style={styles.main}>{(data as any) ? (data as any).humidity : 'Wait'}%</Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20 }]}>
        <View style={[styles.row, styles.cell]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Độ sáng</Text>
            <Image source={require('../../assets/images/lux.png')} style={[{ marginLeft: -30, width: 20, height: 20 }]} />
          </View>
          <Text style={styles.main}>{(data as any) ? (data as any).lux : 'Wait'} lux</Text>
        </View>
      </View>
      <Text style={{ marginVertical: 10, marginRight: 220, color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Thiết bị</Text>
      <View style={styles.routineTable}>
        <View style={[styles.rowns, { marginBottom: 10 }]}>
          <View style={[styles.rowns, { marginRight: 40 }]}>
            <Image source={require('../../assets/images/light.png')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Đèn</Text>
          </View>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).light == 0 ? 'orange' : '#FFE0BC', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }
          ]} onPress={() => {
            switchLight(0);
          }} >
            <Text> {(data as any) ? "Tắt" : 'Wait'} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).light == 1 ? 'orange' : '#FFE0BC' }
          ]} onPress={() => {
            switchLight(1);
          }} >
            <Text> {(data as any) ? "Trắng" : 'Wait'} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).light == 2 ? 'orange' : '#FFE0BC' }
          ]} onPress={() => {
            switchLight(2);
          }} >
            <Text> {(data as any) ? "Xanh" : 'Wait'} </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).light == 3 ? 'orange' : '#FFE0BC', borderTopRightRadius: 10, borderBottomRightRadius: 10 }
          ]} onPress={() => {
            switchLight(3);
          }} >
            <Text> {(data as any) ? "Đỏ" : 'Wait'} </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.rowns, { marginBottom: 10 }]}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/fan.png')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Quạt</Text>
          </View>
          <Slider style={{ width: 200, height: 40, marginLeft: 25 }}
            value={(data && (data as any).fan) || 0}
            onValueChange={(value) => switchFan(value)}
            minimumValue={0}
            maximumValue={4}
            step={1}
          />
        </View>

        <View style={[styles.rowns, { marginBottom: 20 }]}>
          <View style={[styles.rowns, { marginRight: 80 }]}>
            <Image source={require('../../assets/images/door.png')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Cửa</Text>
          </View>
          <TouchableOpacity style={[
            {
              backgroundColor: (data as any) && (data as any).door == 1 ? 'orange' : '#FFE0BC', borderWidth: 1,
              width: 100,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }
          ]} onPress={switchDoor}>
            <Text> {(data as any) ? ((data as any).door != 0 ? "Mở" : "Đóng") : 'Wait'} </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.row}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/speak.jpg')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Giọng nói</Text>
          </View>
          <TouchableOpacity style={[
            styles.routineCell
          ]} onPress={isRecording? stopListening : startRecognize}>
            <Text> {isRecording ? "Đang ghi âm" : "Ghi âm"} </Text>
          </TouchableOpacity>
        </View>
        <Text>{result}</Text> */}
      </View>

      <View style={{ position: 'absolute', left: 100, right: 0, bottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 200 }}>
        <TouchableOpacity style={{ backgroundColor: '#FDA43C', padding: 10, borderWidth : 1, borderColor: '#000', borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} onPress={() => { navigation.navigate("Home",account.route.params) }}>
          <Text style={{ }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#FDA43C', padding: 10, borderWidth : 1, borderColor: '#000', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} onPress={() => { navigation.navigate("Chart",account.route.params) }}>
          <Text style={{ }}>Chart</Text>
        </TouchableOpacity>
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
  rowns: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  cell: {
    width: 300,
    height: 50,
    alignItems: 'center',
    backgroundColor: "#fff",

  },
  main: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 20,
  },
  sub: {
    width: 100,
    marginLeft: 10,
    fontSize: 16,
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
    flexDirection: 'column',
    backgroundColor: "#fff",
  },
  routineCell: {
    borderWidth: 1,
    borderColor: '#000',
    width: 45,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: "#FFE0BC"
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  }
});

