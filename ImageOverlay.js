import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet, TouchableOpacity, Easing } from 'react-native';

// const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = 0;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class ImageOverlay extends Component {
    constructor(props) {
        super(props)
        this.moveAnimation = new Animated.Value(-100)
        this.opacityAnimation = new Animated.Value(0)
        this.leftAnimation = new Animated.Value(0)
        this.rightAnimation = new Animated.Value(0)
        this.marginAnimation = new Animated.Value(300)
        this.state = ({
            image1: false,
            image2: false,
            image3: false
        })
    }

    overlayImage = () => {
        this.setState({ image1: true })
        Animated.parallel([
            Animated.timing(this.moveAnimation, {
                toValue: 100,
                duration: 500,
            }),
            Animated.timing(this.opacityAnimation, {
                toValue: 1,
                duration: 1800,
                easing: Easing.elastic(1)
            })
        ]).start(() => {
            this.setState({ image2: true })
            Animated.timing(this.leftAnimation, {
                toValue: 200,
                duration: 1800,
                easing: Easing.elastic(1)
            }).start(() => {
                this.setState({ image3: true })
                Animated.parallel([
                    Animated.timing(this.marginAnimation, {
                        toValue: 100,
                        duration: 1000,
                        easing: Easing.linear
                    }),
                    Animated.timing(this.rightAnimation, {
                        toValue: 200,
                        duration: 1800,
                        easing: Easing.elastic(1)
                    })
                ]).start()
            })
        })
    }



    render() {

        // const move = this.opacityAnimation.interpolate({
        //     inputRange: [0,HEADER_SCROLL_DISTANCE],
        //     outputRange: [0,1]
        //   })

        return (
            <View style={styles.container}>
                <View style={styles.rootView} />
                {this.state.image1 && <Animated.View style={[styles.topView, { marginTop:this.moveAnimation, opacity: this.opacityAnimation }]} />}
                {this.state.image2 && <Animated.View style={[styles.leftView, { width: this.leftAnimation }]} />}
                {this.state.image3 && <Animated.View style={[styles.rightView, { height: this.rightAnimation, marginTop: this.marginAnimation }]} />}
                <TouchableOpacity style={styles.buttonStyle} onPress={this.overlayImage} >
                    <Text>Press</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    rootView: {
        backgroundColor: 'red',
        height: 200,
        width: 200,
        borderRadius: 100,
        marginTop: 100,
        alignSelf: 'center'
    },
    topView: {
        backgroundColor: 'green',
        width: 200,
        height:200,
        borderRadius: 100,
        position: 'absolute',
        // marginTop: 100,
        marginLeft: 108
    },
    buttonStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 200
    },
    leftView: {
        backgroundColor: 'yellow',
        height: 200,
        borderRadius: 100,
        position: 'absolute',
        marginTop: 100,
        marginLeft: 108

    },
    rightView: {
        backgroundColor: 'powderblue',
        height: 200,
        width: 200,
        borderRadius: 100,
        position: 'absolute',
        marginLeft: 108
    },

});
