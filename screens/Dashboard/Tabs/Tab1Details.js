import React from "react";
import { View, Text, ScrollView } from "react-native";
import {Headline} from "react-native-paper";
import PureChart from 'react-native-pure-chart';
import Dialog from "react-native-dialog";


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
      health:{},
      LoadingHealth:true,
      dataSource:[],
      alertDialog:false,
      dataSourceEnvTemp:[],
      dataSourceEnvHum:[],
      mainData:[]
    }
  }

  componentDidMount(){
    fetch('https://connectedcows.herokuapp.com/records/ShowRecords')
      .then((response) => response.json())
      .then((responseJson) => {
        
        console.log(responseJson);
        
        let LineGraph = responseJson.info.map((item)=>{
          return {y:item.temp,x:item.createdOn}
        });

        let envHumidityLG = responseJson.info.map((item)=>{
          return {y:item.env_humidity,x:item.createdOn}
        });

        let envTempLG = responseJson.info.map((item)=>{
          return {y:item.env_temp,x:item.createdOn}
        });

        this.setState({
          isLoading: false,
          dataSource: LineGraph,
          dataSourceEnvTemp: envTempLG,
          dataSourceEnvHum: envHumidityLG,
          mainData: responseJson.info[responseJson.info.length-1]
        });
      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('https://connectedcows.herokuapp.com/health/showRecords')
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.info[responseJson.info.length-1].status==='Normal'){
          this.setState({
            LoadingHealth:false,
            health:responseJson.info[responseJson.info.length-1]
          })
        } else {
          this.setState({
            alertDialog:true,
            LoadingHealth:false,
            health:responseJson.info[responseJson.info.length-1]
          })
        }

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  handleCancel = () => {
    this.setState({ alertDialog: false });
  };

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
          <ScrollView>
            <Text style={{fontSize:40, fontWeight:'bold', marginTop:30, alignSelf:'center'}}>Vitals</Text>
            <View style={styles.containerStyle}>
              <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                <Headline style={{fontWeight:'bold'}}>Temperature : </Headline>
                <Headline>{Math.floor(this.state.health.avg_temp,2)} °C</Headline>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                <Headline style={{fontWeight:'bold'}}>ENV Humidity : </Headline>
                <Headline>{Math.floor(this.state.mainData.env_humidity,2)} %</Headline>
              </View>
              <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
                <Headline style={{fontWeight:'bold'}}>ENV Temperature : </Headline>
                <Headline>{Math.floor(this.state.mainData.env_temp,2)} °C</Headline>
              </View>
            </View>

            <View style={styles.containerStyle}>
              <View style={{flexDirection:'row', justifyContent:'center'}}>
                <Headline style={{fontWeight:'bold'}}>Status </Headline>
                <Headline style={{fontSize:15}} >{this.state.health.status}</Headline>
              </View>
            </View>
            
            <View style={styles.containerStyle}>        
              <Headline>Body Temprature</Headline>
              <PureChart  data={this.state.dataSource} type='line' />
            </View>

            <View style={styles.containerStyle}>        
              <Headline>Environment Humidity</Headline>
              <PureChart  data={this.state.dataSourceEnvHum} type='line' />
            </View>

            <View style={styles.containerStyle}>        
              <Headline>Environment Temperature</Headline>
              <PureChart  data={this.state.dataSourceEnvTemp} type='line' />
            </View>
            
            <View style={styles.containerStyle}>
              <Headline>Body Temo Summary Chart</Headline>
              <PureChart data={sampleDataPie} type='pie' />
            </View>

          </ScrollView>
          <Dialog.Container visible={this.state.alertDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Description>
            The Current Animal's health is unstable
          </Dialog.Description>
          <Dialog.Button label="Okay" onPress={this.handleCancel} />
        </Dialog.Container>
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
