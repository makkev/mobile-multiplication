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
      currentAnswer: '?',
    };
  }

  handlePressNumber = (num) => {
    if (this.state.currentAnswer === '?') 
      this.setState({
        currentAnswer: num,
      });
    else
      // limit the answer given number to hundreds
      if (this.state.currentAnswer.length < 3)
        this.setState({
          currentAnswer: `${this.state.currentAnswer}${num}`,
        });
  }

  handleBackSpace = () => {
    if (this.state.currentAnswer !== '?')
      this.setState({
        currentAnswer: this.state.currentAnswer.substring(0, this.state.currentAnswer.length - 1),
      });
  }

  checkAnswer = () => {
    const { currentAnswer, currentQuestionIndex, answerGiven } = this.state;
    const { questions } = this.props.navigation.state.params;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer; 
    const correct = (Number(currentAnswer) === correctAnswer);
    this.setState({
        correctAnswer: correct,
        incorrectAnswer: !correct,
        showNextQuestionButton: true,
        showSubmitButton: false,
        answerGiven: [ ...answerGiven, currentAnswer ],
        score: (correct ? this.state.score + 1 : this.state.score)
    });
    debugger;
  }

  nextQuestion = (currentQuestionIndex) => {
    const { questions } = this.props.navigation.state.params;
    let initState = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      showSubmitButton: true,
      answer: '',
      currentAnswer: '?',
    }
    if (currentQuestionIndex + 1 === questions.length) {
      this.setState({
        ...initState,
        endQuiz: true,
      });
      // clearInterval(this.interval);

    } else {
      this.setState({
        ...initState,
        currentQuestionIndex: currentQuestionIndex + 1,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.currentAnswer !== prevState.currentAnswer) {
      if (this.state.currentAnswer.length === 0)
        this.setState({
          answerGiven: '?',
        });
    }
  }

  render() {
    const { questions, tablesArray } = this.props.navigation.state.params;
    const { score, answer, time, currentQuestionIndex } = this.state;
    let question = questions[currentQuestionIndex];
    if (!this.state.endQuiz)
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
          <View style={styles.headSection}>
            <Text style={styles.headText}>
              Score: {score} / {currentQuestionIndex + 1}
            </Text>
          </View>
          <View style={styles.topSection}>
            <Text style={styles.topText}>
            {`${question.number1}  x  ${question.number2}  =  ${this.state.currentAnswer} `}
            </Text>

          </View>

          <View style={styles.middleSection}>
            {this.state.correctAnswer &&
              <View>
                <Text style={styles.correctText}>
                  Correct
                </Text>
              </View>
            }
            {this.state.incorrectAnswer &&
              <View>
                <Text style={styles.wrongText}>
                  Wrong!
                </Text>
                <Text style={styles.wrongText}>
                  The correct answer is {question.correctAnswer}
                </Text>
              </View>
            }
          </View>

          {/*
          <View style={styles.middleSection}>
          </View>
          */}
          {!this.state.showNextQuestionButton &&
            <View style={styles.bottomSection}> 
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('1')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('2')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('3')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>3</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('4')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('5')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('6')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>6</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('7')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('8')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('9')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>9</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => this.handleBackSpace()}
                  style={styles.numberButton}
                >
                  <MaterialCommunityIcons
                    name="backspace"
                    color="white"
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.handlePressNumber('0')}
                  style={styles.numberButton}
                >
                  <Text style={styles.tablesBtnText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.checkAnswer()}
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
          }

          {this.state.showNextQuestionButton &&
            <View style={styles.bottomSection}> 
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => this.nextQuestion(currentQuestionIndex)}
                  style={styles.startButton}
                >
                  <Text style={styles.tablesBtnText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          }

        </View>
      )
    else
      return(
        <View>
          <Text>Score: {score} / {questions.length}</Text>
        </View>
      )
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  headSection: {
    // flexGrow: 5,
    flex: 1,
    // backgroundColor: '#5BC2C1',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,

  },
  topSection: {
    // flexGrow: 5,
    flex: 5,
    // backgroundColor: '#5BC2C1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  middleSection: {
    flex: 2,
    // flexGrow: 3,
    // backgroundColor: 'orange',
    padding: 5,

  }, 
  bottomSection: {
    // flexGrow: 5,
    flex: 5,
    flexDirection: 'column',
    // backgroundColor: '#FD909E',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: 5,
    padding: 2,
    
  },
  headText: {
    fontSize: 15,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#df01c5',
  },
  topText: {
    fontSize: 55,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#df01c5',
  },
  correctText: {
    fontSize: 30,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#2e8ccf',
  },
  wrongText: {
    fontSize: 30,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#da3435',
  },
  numberButton: {
    backgroundColor: '#df01c5',
    // backgroundColor: '#268bd2',
    // backgroundColor: '#cde3f2',
    padding: 10,
    borderRadius: 3,
    height: 55,
    margin: 4,
    width: 110,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default Question
