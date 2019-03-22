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
        <Text>{this.props.navigation.state.params.questionsFiltered}</Text>
      </View>
    )
  }
}

export default Question
