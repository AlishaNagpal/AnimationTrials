import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Animated, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont()

export const tabHeight = 64;
const { width } = Dimensions.get('window')

export default class StaticTabBar extends Component {
  values = []
  constructor(props) {
    super(props);
    const { tabs } = this.props
    this.values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0))
  }

  onPress = (index) => {
    const { value, tabs } = this.props;
    const tabWidth = width / tabs.length

    Animated.sequence([
      ...this.values.map(value =>
        Animated.timing(value, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        })),
      Animated.parallel([
        Animated.spring(this.values[index], {
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.spring(value, {
          toValue: -width + tabWidth * index,
          useNativeDriver: true
        })
      ])
    ]).start()
  }

  render() {
    const { tabs, value } = this.props
    const tabWidth = width / tabs.length
    return (
      <View style={styles.container} >
        {
          tabs.map(({ name }, key) => {
            const activeValue = this.values[key];
            const opacity = value.interpolate({
              inputRange: [-width + tabWidth * (key - 1), -width + tabWidth * key, -width + tabWidth * (key + 1)],
              outputRange: [1, 0, 1],
              extrapolate: "clamp"
            })
            const translateY = activeValue.interpolate({
              inputRange: [0, 1],
              outputRange: [tabHeight, 0]
            })
            return (
              <React.Fragment {...{ key }}>
                <TouchableWithoutFeedback onPress={() => this.onPress(key)}>
                  <Animated.View style={[styles.tab, { opacity }]} >
                    <Icon {...{ name }} size={35} />
                  </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View style={{
                  position: 'absolute',
                  width: tabWidth,
                  left: tabWidth * key,
                  height: tabHeight,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: -8,
                  transform: [{translateY}]
                }}>
                  <View style={styles.circle}>
                    <Icon {...{ name }} size={35} />
                  </View>
                </Animated.View>
              </React.Fragment>
            )
          })
        }
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: tabHeight
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
