import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Image,
  ImageBackground } from 'react-native';

export class Question extends Component {
  render() {
    return (
      <View>
        {this.props.navigation.state.params.questionsFiltered.map((q, idx) => {
          return(
            <View key={idx}>
              <Text>{`${q.number1} ${q.operand} ${q.number2} = ${q.correctAnswer}`}</Text>
            </View>
          );
        })}
      </View>
    )
  }
}

export default Question
