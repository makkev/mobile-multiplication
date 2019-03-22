import React, { Component } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

  handlePressNumber = () => {

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
          {`${question.number1}  x  ${question.number2}  =  `}
          </Text>
        </View>
        <View style={styles.bottomSection}> 
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <MaterialCommunityIcons
                name="backspace"
                color="white"
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <Text style={styles.tablesBtnText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.handlePressNumber()}
              style={styles.numberButton}
            >
              <MaterialCommunityIcons
                name="keyboard-return"
                color="white"
                size={30}
              />
            </TouchableOpacity>
          </View>
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
    justifyContent: 'flex-end',

  },
  bottomSection: {
    flexGrow: 5,
    flexDirection: 'column',
    // backgroundColor: '#FD909E',
    // justifyContent: 'center',
    justifyContent: 'flex-end',
    
  },
  topText: {
    fontSize: 55,
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
    height: 70,
    margin: 4,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',

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
    fontSize: 32,
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
