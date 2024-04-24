import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { apiFacade } from './apiFacade';
import { StackNavigationProp } from '@react-navigation/stack';
import Voice from '@react-native-voice/voice';
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  // Add other screens here
};
type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export const Homepage = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isRecording, setIsRecording] = React.useState(false);
  const [result, setResult] = React.useState('Chưa có');
  const [data, setData] = useState(null);
  const refresh = async () => {
    try {
      const data = await apiFacade.getRecord();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    Voice.onSpeechResults = onSpeechResultsHandler;
    refresh();
    const intervalId = setInterval(refresh, 10000);
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);
  const switchLight = async () => {
    const val = (data as any).light == "1" ? 0 : 1;
    const res = await apiFacade.switchLight(val);
    setData(res);
  };
  const switchFan = async () => {
    const val = (data as any).fan == "0" ? 1 : 0;
    const res = await apiFacade.switchFan(val);
    setData(res);
  };
  const switchDoor = async () => {
    const val = (data as any).door == "0" ? 1 : 0;
    const res = await apiFacade.switchDoor(val);
    setData(res);
  };
  const startRecognize = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }    
  }
  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (e) {
      console.error(e);
    }
  };
  const onSpeechResultsHandler = (e: any) => {
    setResult(e.value[0]); // e.value is an array of recognized words
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
            <Image source={require('../../assets/images/temp.png')} style={[{ marginLeft: - 20, width: 20, height: 20 }]} />
          </View>
          <Text style={[styles.main,]}>{(data as any) ? (data as any).temp : 'Loading...'} độ C</Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20 }]}>
        <View style={[styles.row, styles.cell]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Humidity</Text>
            <Image source={require('../../assets/images/humid.png')} style={[{ marginLeft: - 20, width: 20, height: 20 }]} />
          </View>
          <Text style={styles.main}>{(data as any) ? (data as any).humidity : 'Loading...'}%</Text>
        </View>
      </View>
      <View style={[styles.table, { marginTop: 20 }]}>
        <View style={[styles.row, styles.cell]}>
          <View style={styles.row}>
            <Text style={styles.sub}>Độ sáng</Text>
            <Image source={require('../../assets/images/lux.png')} style={[{ marginLeft: - 20, width: 20, height: 20 }]} />
          </View>
          <Text style={styles.main}>{(data as any) ? (data as any).lux : 'Loading...'} lux</Text>
        </View>
      </View>
      <Text style={{ marginTop: 10, marginRight: 220, color: 'black', fontSize: 18, height: 30, fontWeight: "bold" }}>Device</Text>
      <View style={styles.routineTable}>
        <View style={[styles.row, { width: 250 }]}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/light.png')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Đèn</Text>
          </View>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).light == 1 ? 'orange' : '#FFE0BC' }
          ]} onPress={switchLight} >
            <Text> {(data as any) ? ((data as any).light == 1 ? "On" : "Off") : 'Loading...'} </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/fan.png')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Quạt</Text>
          </View>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).fan == 1 ? 'orange' : '#FFE0BC' }
          ]} onPress={switchFan}>
            <Text> {(data as any) ? ((data as any).fan != 0 ? "On" : "Off") : 'Loading...'} </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.row}>
            <Image source={require('../../assets/images/door.png')} style={[{ width: 40, height: 40 }]} />
            <Text style={styles.text}>Cửa</Text>
          </View>
          <TouchableOpacity style={[
            styles.routineCell,
            { backgroundColor: (data as any) && (data as any).door == 1 ? 'orange' : '#FFE0BC' }
          ]} onPress={switchDoor}>
            <Text> {(data as any) ? ((data as any).door != 0 ? "Open" : "Close") : 'Loading...'} </Text>
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

      <View style={{ position: 'absolute', bottom: 20, flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, width: 200 }}>
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

