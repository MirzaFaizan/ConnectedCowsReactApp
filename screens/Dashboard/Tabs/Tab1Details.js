import React from "react";
import { View, Text } from "react-native";
import {Headline} from "react-native-paper";
import PureChart from 'react-native-pure-chart';

let sampleDataPie = [
{
  value: 50,
  label: 'Good',
  color: '#008dff',
}, {
  value: 40,
  label: 'Moderate',
  color: '#E0F2F1'
}, {
  value: 25,
  label: 'High',
  color: '#E53935'
}

]

class Tab1Details extends React.Component {

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      dataSource:[],
    }
  }

  componentDidMount(){
    fetch('https://connectedcows.herokuapp.com/records/ShowRecords')
      .then((response) => response.json())
      .then((responseJson) => {
        
        let LineGraph = responseJson.info.map((item)=>{
          return {y:item.temp,x:item.createdOn}
        })
        console.log(LineGraph);
        this.setState({
          isLoading: false,
          dataSource: LineGraph,
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
            <Text>Loading ... </Text>
        </View>
      );
    }
    else{
      return (
        <View>
            <View style={styles.containerStyle}>        
              <Headline>Line Graph (temprature wrt time)</Headline>
              <PureChart  data={this.state.dataSource} type='line' />
            </View>
            
            <View style={styles.containerStyle}>
              <Headline>Piechart</Headline>
              <PureChart data={sampleDataPie} type='pie' />
            </View>
        </View>
    );}
    
  }
}

const styles ={
  containerStyle:{
      marginTop:30,
      borderWidth:1,
      borderRadius:2,
      borderColor:'#ddd',
      shadowColor:'#000',
      shadowOffset:{width:0,height:2},
      shadowOpacity:0.1,
      shadowRadius:2,
      elevation:2,
      marginLeft:5,
      marginRight:5,
       padding:5,
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:"center"
  }
}

export default Tab1Details;
