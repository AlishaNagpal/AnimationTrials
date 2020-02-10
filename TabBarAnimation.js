import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from './components/TabBar'


export default class TabBarAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <TabBar />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ea3345',
        justifyContent: 'flex-end',
    },
});
