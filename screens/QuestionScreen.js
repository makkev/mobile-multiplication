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
import { ScrollView } from 'react-native-gesture-handler';


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

  componentDidMount() {
    if (!this.state.endQuiz)
      this.interval = setInterval(this.incrementTime, 1000);
  }

  incrementTime = () => {
    this.setState({
      time: this.state.time + 1,
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
      })
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
      clearInterval(this.interval);

    } else {
      this.setState({
        ...initState,
        currentQuestionIndex: currentQuestionIndex + 1,
      })
    }
  }

  renderResults = () => {
    const { questions, tablesArray } = this.props.navigation.state.params;
    const { answerGiven } = this.state;
    return questions.map((q, idx) => 
      <View styles={styles.resultsColumn} key={idx+1}>
        <View style={styles.resultsRow}>
          <Text style={styles.colQnum}>({idx+1})</Text>
          <Text style={styles.colNum}>{q.number1}</Text>
          <Text style={styles.colOperand}>x</Text>
          <Text style={styles.colNum}>{q.number2}</Text>
          <Text style={styles.colOperand}>=</Text>
          <Text style={styles.colAnswer}>{q.correctAnswer}</Text>
          <Text style={styles.colText}> 
            - You answered {answerGiven[idx]} -
          </Text>
          <Text style={q.correctAnswer === Number(answerGiven[idx]) ? styles.correctStyle : styles.wrongStyle }>
            {q.correctAnswer === Number(answerGiven[idx]) ? ' Correct' : ' Wrong'}
          </Text>
        </View>
      </View>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.currentAnswer !== prevState.currentAnswer) {
      if (this.state.currentAnswer.length <= 0)
        this.setState({
          currentAnswer: '?',
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
            <View style={styles.headSectionRow}>
              <Text style={styles.headTextLeft}>
                Score: {score} / {currentQuestionIndex + 1}
              </Text>
              <Text style={styles.headTextRight}>
                Time: {time}s
              </Text>
            </View>
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
      // end quiz
      return(
        <ScrollView>
          <Text>Score: {score} / {questions.length}</Text>
          <Text>Time: {time} seconds</Text>
          <Text>Tables: [
            {tablesArray.map((r, idx) => idx === (tablesArray.length - 1) ? r : r + ', ')}
            ]
          </Text>
          {this.renderResults()}
        </ScrollView>
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
  headSectionRow: {
    flexDirection: 'row',
    // alignItems: 'space-evenly',
    // justifyContent: 'flex-end',
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
  headTextLeft: {
    fontSize: 20,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#df01c5',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    // width: 10,
    paddingRight: 30,
  },
  headTextRight: {
    fontSize: 20,
    // color: '#586e75',
    // color: '#268bd2',
    color: '#df01c5',
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    // width: 10,
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
  resultsColumn: {
    flexDirection: 'column',

  },
  resultsRow: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  colQnum: {
    width: 35,
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    textAlign: 'right',
  },
  colNum: {
    width: 20,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    textAlign: 'right',
  },
  colOperand: {
    width: 15,
    // justifyContent: 'flex-end',
    textAlign: 'right',
  },
  colAnswer: {
    width: 35,
    textAlign: 'right',
    // justifyContent: 'flex-end',
    // padding: 10,
    paddingRight: 5,
  },
  colText: {
    // width: 200,
    textAlign: 'left',
    // justifyContent: 'flex-start',
  },
  correctStyle: {
    color: '#2e8ccf',
    // textAlign: 'left',
  },
  wrongStyle: {
    color: '#da3435',
    // textAlign: 'left',
  }
});

export default Question
