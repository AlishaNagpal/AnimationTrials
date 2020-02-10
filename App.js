import React, { Component } from 'react';
import { Animated, TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.moveAnimation = new Animated.ValueXY({ x: 10, y: 450 })
  }

  _moveBall = () => {
    Animated.spring(this.moveAnimation, {
      toValue: {x: 250, y: 10},
      duration: 200
    }).start(()=>{
      Animated.spring(this.moveAnimation, {
        toValue: {x: 0, y: 100},
        duration: 200
      }).start(()=>{
        Animated.spring(this.moveAnimation, {
          toValue: {x: 300, y: 600},
          duration: 200
        }).start()
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>
          <TouchableWithoutFeedback style={styles.button} onPress={this._moveBall}>
            <Text style={styles.buttonText}>Press</Text>
          </TouchableWithoutFeedback>        
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'greenyellow',
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  }
});
