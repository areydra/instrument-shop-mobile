import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TextInput } from 'react-native';
import Footer from '../layouts/Footer'

export default class Search extends Component {
    state = {
        search : ''
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ width: 40 }} onPress={() => this.props.navigation.goBack() }>
                        <Image source={require('../../assets/image/icon/back.png')} style={{ alignSelf: 'flex-start', width: 20, marginVertical: 10, height: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <TextInput style={ styles.textInput } placeholder="Search Here...." 
                        autoFocus
                        onChangeText={text => this.setState({search : text})} 
                        returnKeyType='send'
                        onSubmitEditing={() => this.props.navigation.navigate('ProductLists', { search: this.state.search }) } 
                    />
                </View>
              <View style={{ flex: 1 }} />
              <Footer />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        elevation: 8,
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#5D97C9'
    },
    textInput : {
        flex: 1, 
        marginRight: 10, 
        backgroundColor: 'white', 
        height: '80%', 
        borderRadius: 20, 
        justifyContent: 'center', 
        paddingLeft: 20
    }
})