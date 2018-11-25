import React from "react";
import { View, Text } from "react-native";
import { Button ,Divider } from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

class Tab2Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{fontSize:30, borderRadius:1,borderColor:'black'}} >Dr. Johnny Sins</Text>
        <Text style={{fontSize:25, borderRadius:1,borderColor:'black'}} >+92-303-0518087</Text>
        <Divider/>
        <Ionicons name="md-call" size={100} color="white" />

        <Button  mode="outlined" onPress={() => console.log('Pressed')}>
          Contact Vet
        </Button>
      </View>
    );
  }
}

export default Tab2Screen;
