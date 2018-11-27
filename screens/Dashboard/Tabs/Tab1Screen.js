import React from "react";

import {
  Image,
  ScrollView,
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
    
            <ScrollView style={{width:350,top:30}}>
            
            {Object.values(this.state.dataSource.info).map((type,index) => {
                return (
                  <TouchableOpacity onPress={()=>{console.log('pressed')}} key={index} >

                  <View  style={{justifyContent:'flex-start',flexDirection:'row'}} >
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
                  <View style={{justifyContent:'space-around',marginLeft:10}}>
                  <Headline>Cow # {index+1}</Headline>
                    <Text>{"Farm ID :"+ type.farmid + "\nOwner ID : "+type.ownerid}</Text>
                  </View>
                </View>
                </TouchableOpacity>
                );
              })
            }
              
            </ScrollView>
    
            <Button
                style={{
                  borderWidth: 5,
                  borderColor:'white',
                  borderRadius: 25,
                  marginTop:10,
                  marginBottom:10,
                  width:200
                }}
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
