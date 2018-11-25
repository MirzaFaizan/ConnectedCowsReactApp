import React from "react";
import { View, Text } from "react-native";
import PureChart from 'react-native-pure-chart';


let sampleData = [
  {x: '2018-01-01', y: 30},
  {x: '2018-01-02', y: 200},
  {x: '2018-01-03', y: 170},
  {x: '2018-01-04', y: 20},
  {x: '2018-01-05', y: 10}
];

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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <PureChart  data={sampleData} type='line' />
        <PureChart data={sampleDataPie} type='pie' />

      </View>
    );
  }
}

export default Tab1Details;
