import React, { PureComponent } from 'react';
import { View, SafeAreaView, Dimensions, StyleSheet, Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg'
import * as shape from 'd3-shape'
// import StaticTabBar, { tabHeight as height } from './StaticTabBar'
import MyTabs from './CustomTabBar'

AnimatedSvg = Animated.createAnimatedComponent(Svg);
const height = 64;
const { width } = Dimensions.get('window')
const tabs = [
    { name: "ios-bonfire" },
    { name: "ios-bulb" },
    { name: "ios-color-filter" },
    { name: "ios-cafe" },
    { name: "ios-bug" }
]
const tabWidth = width / tabs.length
const right = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
        { x: width + tabWidth, y: 0 },
        { x: width * 2.5, y: 0 },
        { x: width * 2.5, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ])
const left = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
        { x: 0, y: 0 },
        { x: width, y: 0 }
    ])
const tab = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)
    ([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 10, y: 10 },
        { x: width + 15, y: height },
        { x: width + tabWidth - 15, y: height },
        { x: width + tabWidth - 10, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0 },
    ])

const d = `${left} ${tab} ${right}`

export default class TabBar extends PureComponent {
    value = new Animated.Value(-width)

    render() {
        const { value: translateX } = this;
        return (
            <View style={styles.main}>
                <View {...{ width, height }}>
                    <AnimatedSvg width={width * 2.5} {...{ height }} style={{ transform: [{ translateX }]}}>
                        <Path {...{ d }} fill='white' />
                    </AnimatedSvg>
                    <SafeAreaView style={styles.safeArea} />
                    <View style={StyleSheet.absoluteFillObject}>
                        {/* <StaticTabBar value={translateX} {...{ tabs }} /> */}
                        <MyTabs value={translateX} {...{ tabs }} />
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
    },
    main:{
        flex:1,
        backgroundColor:'red',
        justifyContent: 'flex-end',
    }
})

