import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { login } from '../../publics/redux/actions/auth'

class Login extends Component {
    state = {
        email: '',
        password: '',
        showToast : false
    }

    handleLogin = async() => {
        let user = {
            email : this.state.email,
            password : this.state.password
        }

        await this.props.dispatch(login(user)).then(async () => {
            console.log(this.props.status)
            if(this.props.status === 400) {
                ToastAndroid.showWithGravity(
                    'email or password incorrect',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                )
                await this.setState({ email: '', password: '' })
            }else{
                await AsyncStorage.setItem('token', this.props.user.token)
                await AsyncStorage.setItem('id_user', this.props.user.user.id.toString())
                await AsyncStorage.setItem('id_level', this.props.user.user.id_level.toString())
                await AsyncStorage.setItem('email', this.props.user.user.email)
                await AsyncStorage.setItem('name', this.props.user.user.name)

                ToastAndroid.showWithGravity(
                    user.email + ' Login Success',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                )
                this.props.navigation.navigate('ProfileStack')
            }
        })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} showsHorizontalScrollIndicator={false}>
                    <Text style={{ fontSize: 40, marginTop: 60, textAlign: 'center' }}>Welcome</Text>
                    <View style={{ flex: 1 }}>
                        <TextInput style={{ paddingLeft: 20, borderWidth: 1, borderColor: '#C98F5D', marginTop: 20 }} autoCapitalize={'none'} placeholder='Email..' onChangeText={text => this.setState({email:text})} value={this.state.email}></TextInput>
                        <TextInput style={{ paddingLeft: 20, borderWidth: 1, borderColor: '#C98F5D', marginTop: 20 }} secureTextEntry={true} placeholder='Password..' onChangeText={text => this.setState({ password: text })} value={this.state.password} returnKeyType='go' onSubmitEditing={() => this.handleLogin()} ></TextInput>
                        <TouchableOpacity style={{ padding: 15, width: 100, backgroundColor: '#C98F5D', alignSelf: 'flex-end', marginTop: 20 }} onPress={this.handleLogin}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Login</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Text style={{ fontSize: 17, marginRight: 10 }}>Don't have an account? </Text>
                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={ () => this.props.navigation.navigate('Register') }>
                                <Text style={{ color: '#5D97C9' }}>Register here..</Text>
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
    return {
        user : state.auth.userMobile,
        status: state.auth.status,
    }
}

export default connect(mapStateToProps)(Login)