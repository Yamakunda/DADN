import { StyleSheet, Image, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Chart: undefined;
  // Add other screens here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
const deviceWidth = Dimensions.get('window').width;
export const Login = () => {
  const navigation = useNavigation<NavigationProp>();
  const handleSignIn = () => {
    console.log("login");
    navigation.navigate('Home');
  };
  const createAccount = () => {
    console.log("create account");
  };
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/background.png')} 
        style={{width: deviceWidth, height: 'auto', aspectRatio: 1.0,}} 
      />
      <View style={[styles.bottomView]}>
        <Text style={[styles.title,]}>Log In</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TouchableOpacity style={[styles.button]} onPress={handleSignIn}>
          <Text style={{textAlign: 'center', color: 'black', fontSize: 18, height: 30, fontWeight: "bold"}}>Log In</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', color: 'black', fontSize: 14, height: 20}}>Don't have account yet ?</Text>  
        <TouchableOpacity style={[]} onPress={createAccount}>
          <Text style={{textAlign: 'center', color: '#FDA43C', fontSize: 14, height: 20, textDecorationLine: "underline" }}>Create Account</Text>
        </TouchableOpacity>      
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: deviceWidth *3/4,
  },
  button: {
    backgroundColor:'#FDA43C',
    height: 40,
    margin: 12,
    padding: 10,
    justifyContent: 'center'
  },
  bottomView: {

  },
});