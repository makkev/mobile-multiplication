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

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      endQuiz: false,
      currentQuestionIndex: 0,
      buttonClasses: {},
      answerGiven: [],
      showSubmitButton: true,
      score: 0,
      time: 0,
      timeInterval: null,
    };
  }

  render() {
    const { questions, tablesArray } = this.props.navigation.state.params;
    const { score, answer, time, currentQuestionIndex } = this.state;
    let question = questions[currentQuestionIndex];
    return (
      <View style={styles.container}>
        {/*
        {questions.map((q, idx) => {
          return(
            <View key={idx}>
              <Text>{`${q.number1} ${q.operand} ${q.number2} = ${q.correctAnswer}`}</Text>
            </View>
          );
        })}
        */}
        <View style={styles.topSection}>
          <Text style={styles.topText}>
          {`${question.number1} x ${question.number2} = `}
          </Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topSection: {
    flexGrow: 5,
    // backgroundColor: '#5BC2C1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomSection: {
    flexGrow: 5,
    flexDirection: 'column',
    // backgroundColor: '#FD909E',
    // justifyContent: 'center',
    // alignItems: 'left',
    
  },
  topText: {
    fontSize: 40,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#df01c5',
  },
  numberButton: {
    backgroundColor: '#df01c5',
    // backgroundColor: '#268bd2',
    // backgroundColor: '#cde3f2',
    padding: 10,
    borderRadius: 3,
    height: 50,
    margin: 4,
    width: 85,

  },
  numberButton2: {
    backgroundColor: '#edd7ea',
    // backgroundColor: '#268bd2',
    // backgroundColor: '#cde3f2',
    padding: 10,
    borderRadius: 3,
    height: 50,
    margin: 4,
    width: 85,

  },
  tablesBtnText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#df01c5',
    // backgroundColor: '#268bd2',
    padding: 10,
    borderRadius: 2,
    height: 55,
    margin: 4,
    width: 360,
  },
  buttonSection: {
    flexDirection: 'row',
  },
  
});

export default Question
