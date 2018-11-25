import React from "react";
import { View, Text,Image } from "react-native";
import { Button, Divider } from "react-native-paper";
import {TextInput} from "react-native-paper";

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
    }
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
          width={200}
        />

        <TextInput
          label='Password'
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          width={200}
        />

        <Divider/>

        <Button
            raised
            onPress={() => this.props.navigation.navigate("Dashboard")}
          >
            <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

export default HomeScreen;
