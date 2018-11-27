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
 //Validae Token
    var details = {
      'message':this.state.message,
      };
      

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      fetch('https://connectedcows.herokuapp.com/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' 
        },
        body: formBody
      }).then(res=>res.json())
      .then(res=>{
        console.log("Submitted");
          this.setState({
            message:'',
          })
        }
      );

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Headline style={{marginTop:10}}>Contact Vet</Headline>
            <Ionicons name="md-call" size={50} color="green" />
            <Divider/>
            <Text>Dr.Sins</Text>
            <Text>+92-303-0518087</Text>
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
            style={{
              borderWidth: 5,
              borderColor:'white',
              borderRadius: 25,
              marginTop:10,
              width:200
            }}
            onPress={this.sendMessage}
          >
            <Text>Send Message</Text>
        </Button>
      </View>
    );
  }
}



export default Tab2Screen;
