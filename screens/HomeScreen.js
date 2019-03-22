import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, Button, Image, ImageBackground } from 'react-native';
import Question from './QuestionScreen';
import {quiz} from './quiz';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start: false,
      tables: {
        2: false, 
        3: false, 
        4: false, 
        5: false, 
        6: false, 
        7: false, 
        8: false, 
        9: false, 
        12: false, 
      },
      q: [],
    }
  }

  updateTables = num => {
    this.setState({
      tables: {
        ...this.state.tables,
        [num]: !this.state.tables[num],
      }
    })
  }

  start = () => {
    const { tables } = this.state;
    const { questions } = quiz;

    // alert(questions);
    // TODO: refactor to use array of tables
    let tablesArray = [];
    for (var key in tables) {
      if (tables[key] === true) {
        tablesArray.push(Number(key));
      }
    }
    let questionsFiltered = [];
    tablesArray.forEach(num => {
      questions.filter(q => 
        q.number1 === num || q.number2 === num
      ).forEach(rec => questionsFiltered.push(rec));
    });
    // for (var key in tables) {
    //   if (tables[key] === true) {
    //     questions.filter(q => 
    //       q.number1 === Number(key) || q.number2 === Number(key)
    //     ).forEach(rec => questionsFiltered.push(rec));
    //   }
    // }

    questionsFiltered = this.shuffleQuestions(questionsFiltered);

    this.setState({
      q: questionsFiltered,
    })

    this.props.navigation.navigate('Question', {
      questions: questionsFiltered,
      tablesArray,
    });
  }

  shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  render() {
    // if (!this.state.start)
    return (
      <View style={styles.container}> 
        <View style={styles.topSection}>
          <Text style={styles.topText}>Choose Tables</Text>
        </View> 
        <View style={styles.bottomSection}> 
          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.updateTables(2)}
              style={this.state.tables[2] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateTables(3)}
              style={this.state.tables[3] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateTables(4)}
              style={this.state.tables[4] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateTables(5)}
              style={this.state.tables[5] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>5</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.updateTables(6)}
              style={this.state.tables[6] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateTables(7)}
              style={this.state.tables[7] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateTables(8)}
              style={this.state.tables[8] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.updateTables(9)}
              style={this.state.tables[9] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={() => this.updateTables(12)}
              style={this.state.tables[12] ? styles.numberButton : styles.numberButton2}
            >
              <Text style={styles.tablesBtnText}>12</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              onPress={this.start}
              style={styles.startButton}
            >
              <Text style={styles.tablesBtnText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  //   else
  //     return(
  //       <Question />
  //     );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topSection: {
    flexGrow: 3,
    // backgroundColor: '#5BC2C1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  // middleSection: {
  //   flexGrow: 1,
  //   backgroundColor: '#FFF',
  // },
  bottomSection: {
    flexGrow: 4,
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
