import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { register } from '../../publics/redux/actions/auth'

class Register extends Component {
    state = {
        user: {
            name : '',
            email: '',
            password: '',
            telephone: '',
            address: '',
            rePassword: ''
        }
    }

    handleRegister = async () => {
        if((this.state.user.rePassword === this.state.user.password) && this.state.user.password !== ''){
            await this.props.dispatch(register(this.state.user)).then(async() => {
                await AsyncStorage.setItem('token', this.props.token)
                await AsyncStorage.setItem('id_user', this.props.user.id.toString())
                await AsyncStorage.setItem('id_level', this.props.user.id_level.toString())
                await AsyncStorage.setItem('email', this.props.user.email)
                await AsyncStorage.setItem('name', this.props.user.name)

                ToastAndroid.showWithGravity(
                    'Register success!',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                )
                this.props.navigation.navigate('ProfileStack')
            })
        }else{
            ToastAndroid.showWithGravity(
                'Password and Re-Password does not match',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            )
            this.setState(prevState => ({ ...prevState.user['password'] = '' }, { ...prevState.user['rePassword'] = '' }))
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} showsHorizontalScrollIndicator={false}>
                    <Text style={{ fontSize: 40, marginTop: 20, textAlign: 'center' }}>Register</Text>
                    <View style={{ flex: 1 }}>
                        <View style={{ marginTop: 20, flexDirection: 'row' }}>
                            <TextInput style={{ width: '48.5%', paddingLeft: 20, marginHorizontal: 3, borderWidth: 1, borderColor: '#C98F5D' }} placeholder='Name..'
                                value={ this.state.user.name }
                                onChangeText={ text => this.setState(prevState => ({ ...prevState.user['name'] = text  }) ) }
                            />
                            <TextInput style={{ width: '48.5%', paddingLeft: 20, marginHorizontal: 3, borderWidth: 1, borderColor: '#C98F5D' }} autoCapitalize={'none'} placeholder='Email..'
                                value={ this.state.user.email }
                                onChangeText={ text => this.setState(prevState => ({ ...prevState.user['email'] = text  }) ) }
                            />
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row' }}>
                            <TextInput style={{ width: '48.5%', paddingLeft: 20, marginHorizontal: 3, borderWidth: 1, borderColor: '#C98F5D' }} secureTextEntry={true} placeholder='Password..'
                                value={this.state.user.password}
                                onChangeText={text => this.setState(prevState => ({ ...prevState.user['password'] = text }))}
                            />
                            <TextInput style={{ width: '48.5%', paddingLeft: 20, marginHorizontal: 3, borderWidth: 1, borderColor: '#C98F5D' }} secureTextEntry={true} placeholder='Re-Password..'
                                value={this.state.user.rePassword}
                                onChangeText={text => this.setState(prevState => ({ ...prevState.user['rePassword'] = text }))}
                            />
                        </View>
                        <TextInput style={{ paddingLeft: 20, marginTop: 20, borderWidth: 1, borderColor: '#C98F5D' }} keyboardType='number-pad' placeholder='Phone Number..'
                            value={this.state.user.telephone}
                            onChangeText={text => this.setState(prevState => ({ ...prevState.user['telephone'] = text }))}
                        />
                        <TextInput style={{ paddingLeft: 20, marginTop: 20, height: 100, borderWidth: 1, borderColor: '#C98F5D' }} placeholder='Address..'
                            value={this.state.user.address}
                            onChangeText={text => this.setState(prevState => ({ ...prevState.user['address'] = text }))}
                        />

                        <TouchableOpacity style={{ padding: 15, width: 100, backgroundColor: '#C98F5D', alignSelf: 'flex-end', marginTop: 20 }}
                            onPress={ () => this.handleRegister() }
                        >
                            <Text style={{ textAlign: 'center', color: 'white' }}>Register</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 17, marginRight: 10 }}>Have an account? </Text>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => this.props.navigation.navigate('Login')}>
                                <Text style={{ color: '#5D97C9' }}>Login here..</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Footer />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return{
        user : state.auth.userMobile,
        token : state.auth.token
    }
}

export default connect(mapStateToProps)(Register)
const styles = StyleSheet.create({
})