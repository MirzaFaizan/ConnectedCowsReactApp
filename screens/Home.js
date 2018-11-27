import React from "react";
import { View, Text,Image } from "react-native";
import { Button, Divider } from "react-native-paper";
import {TextInput} from "react-native-paper";
import Dialog from "react-native-dialog";

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      visable:false
    }
  }


  handleCancel = () => {
    this.setState({ visable: false });
  };

  Login=()=>{

    fetch(`https://connectedcows.herokuapp.com/login/${this.state.username}/${this.state.password}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.message){
          this.setState({visable:true})
        }
        else{
          this.props.navigation.navigate("Dashboard")
        }
      })
      .catch((error) =>{
        console.error(error);
      });

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image 
           style={{
            alignSelf: 'center',
            height: 150,
            width: 150,
            borderWidth: 5,
            borderRadius: 10
          }}
          source={require('../assets/images/logo.png')}
        />
        
        
        <TextInput
          label='Username'
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          width={300}
        />

        <TextInput
          label='Password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          width={300}
        />

        <Divider/>

        <Button
          style={{
            borderWidth: 5,
            borderColor:'white',
            borderRadius: 25,
            marginTop:5,
            width:200
          }}
            raised
            onPress={this.Login}
          >
            <Text>Login</Text>
        </Button>

          <Dialog.Container visible={this.state.visable}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Description>
            Enter valid username password
          </Dialog.Description>
          <Dialog.Button label="Okay" onPress={this.handleCancel} />
        </Dialog.Container>

      </View>
    );
  }
}

export default HomeScreen;
