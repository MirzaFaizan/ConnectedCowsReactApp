import React from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Button, ListSection, ListItem} from "react-native-paper";
import {Ionicons} from '@expo/vector-icons';





class Tab1Screen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

        <ScrollView style={{width:350,top:20}}>
        
        <ListSection>
            <ListItem 
              title="First Item this is the"
              description="fuck aadi"
              onPress={()=>console.log('Alright')}
            />
        </ListSection>

          
        </ScrollView>

        <Button
            raised
            onPress={() => this.props.navigation.navigate("Tab1Details",{ hideTabBar: true })}
          >
            <Text>Go to details screen</Text>
        </Button>
      </View>
    );
  }
}

export default Tab1Screen;
