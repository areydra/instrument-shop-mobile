import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'

class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={{ width: 230 }} onPress={() => this.props.navigation.navigate('Search')}>
                    <Image source={require('../../assets/image/icon/search.png')} style={{ alignSelf: 'flex-start', width: 20, marginVertical: 10, height: 20, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Image source={require('../../assets/image/icon/brand.png')} style={{ alignSelf: 'flex-end', width: 75, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(Header)

const styles = StyleSheet.create({
    header: {
        elevation: 8,
        height: '8%',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#5D97C9'
    }
})