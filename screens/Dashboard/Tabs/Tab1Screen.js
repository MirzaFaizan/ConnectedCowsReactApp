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

import { Button, ListSection, ListItem, Headline} from "react-native-paper";
import {Ionicons} from '@expo/vector-icons';
import { Divider } from "react-native-elements";





class Tab1Screen extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLoading:true,
      dataSource:{}
    }
  }

  componentDidMount(){
    fetch('https://connectedcows.herokuapp.com/cattles/ShowCattles')
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }


  render() {
      if(this.state.isLoading){
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text>Loading ...</Text>
          </View>
        );
      } else {
        return (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    
            <ScrollView style={{width:350,top:20}}>
            
            <View style={{justifyContent:'flex-start',flexDirection:'row'}} onPress={()=>{console.log('touch')}}>
              <View>
                 <Image 
                    style={{
                      height: 100,
                      width: 100,
                      borderWidth: 5,
                      borderRadius: 10
                    }}
                    source={require('../../../assets/images/logo.png')}
                  />
              </View>
              <View style={{justifyContent:'space-around'}}>
              <Headline>Title</Headline>
                <Text>description</Text>
              </View>
            </View>

            <ListSection>
            {Object.values(this.state.dataSource.info).map((type,index) => {
                return (
                  <View key={index}>
                    <ListItem 
                      title={"Cow # "+index+1}
                      description={"Farm ID :"+ type.farmid + "\nOwner ID : "+type.ownerid}
                      left={()=>{<Text>wow</Text>}}
                      onPress={()=>console.log(index)}
                    />
                  
                    <Divider style={{height: 5, backgroundColor: '#ffffff'}}/>
                  </View>                
                );
              })
            }
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
}

export default Tab1Screen;
