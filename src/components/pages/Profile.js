import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

class Profile extends Component {
    state = {
        user : {
            name: null
        }
    }

    componentDidMount = async() => {
        await AsyncStorage.getItem('name').then(name => {
            this.setState({ user: { name : name } });
        })
        console.log(this.props)
    }

    handleLogout = async() => {
        ToastAndroid.showWithGravity(
            'Success logout',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
        )
        await this.props.carts.splice(0, this.props.carts.length)
        await this.props.wishlists.splice(0, this.props.wishlists.length)
        await AsyncStorage.clear().then(() => this.setState({ user: { name: null } }))
    }

    render() {
        let {name} = this.state.user
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'relative', height: 100, width: 100, borderRadius: 50, alignSelf: 'center', marginTop: 70 }}>
                        <Image style={{ position: 'absolute', height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 50 }} source={{ uri: 'https://cdn3.pitchfork.com/longform/683/Year_In_Streaming_v2.jpg' }} />
                    </View>
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ alignSelf: 'center', marginTop: 25 }}>
                            {
                                (name !== null) ?
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ name }</Text>
                                : 
                                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Guest</Text>
                            }
                        </View>
                        <View style={{ height: 3, backgroundColor: '#5D97C9', marginVertical: 10, marginHorizontal: 25 }} />
                        <View style={{ alignSelf: 'center', marginTop: 25 }}>
                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Transactions') }>
                                <Text style={{ fontSize: 20 }}>Transactions</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 3, backgroundColor: '#5D97C9', marginVertical: 10, marginHorizontal: 25 }} />
                        <View style={{ alignSelf: 'center', marginTop: 25 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('RequestInstrument')}>
                                <Text style={{ fontSize: 20 }}>Request Instrument</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 3, backgroundColor: '#5D97C9', marginVertical: 10, marginHorizontal: 25 }} />
                        <View style={{ alignSelf: 'center', marginTop: 25 }}>
                            {
                                (name !== null) ?
                                    <TouchableOpacity onPress={() => this.handleLogout()}>
                                        <Text style={{ fontSize: 20 }}>Logout</Text>
                                    </TouchableOpacity>
                                :
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AuthStack')}>
                                        <Text style={{ fontSize: 20 }}>Login</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        <View style={{ height: 3, backgroundColor: '#5D97C9', marginVertical: 10, marginHorizontal: 25 }} />

                    </View>
                </View>
                <Footer />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        wishlists : state.wishlists.wishlists,
        carts : state.carts.carts
    }
}

export default connect(mapStateToProps)(Profile)

const styles = StyleSheet.create({
})