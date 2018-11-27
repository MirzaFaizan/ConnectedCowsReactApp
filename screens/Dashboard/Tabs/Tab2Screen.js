import React from "react";
import { View, Text } from "react-native";
import { Button ,Divider } from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';
import {TextInput, Headline} from "react-native-paper";

class Tab2Screen extends React.Component {

  constructor(props){
    super(props);
    this.state={
      message:'',
      visable:false
    }
  }

  sendMessage=()=>{
    console.log("Send message here")
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Headline>Contact Vet</Headline>
        <Text>We will call you right back</Text>
        <Ionicons name="md-call" size={50} color="green" />
        <Text>Dr.Sins</Text>
        <Text>+92-303-0518087</Text>
        <Divider/>
        <TextInput
          mode='outlined'
          mutiline={true}
          numberOfLines={10}
          label='Message'
          placeholder='Please enter your issue here we will contact you right back'
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
          width={300}
        />

        <Divider/>

        <Button
            raised
            onPress={this.sendMessage}
          >
            <Text>Send Message</Text>
        </Button>
      </View>
    );
  }
}

export default Tab2Screen;
