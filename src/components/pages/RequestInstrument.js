import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { postRequestProduct } from '../../publics/redux/actions/requestProduct'

class RequestInstrument extends Component {
    state = {
        name : '',
        email : '',
        instrument : '',
        telephone : '',
        description : ''
    }

    handleRequestInstrument = async() => {
        let request = {...this.state}
        await this.props.dispatch(postRequestProduct(request)).then(() => {
            alert('success add request product ' + request.instrument)
            this.setState({ instrument: '', description: '' })
        })
    }

    render() {
        let { name, email, instrument, telephone, description } = this.state
        return (
            <View style={{ flex: 1 }}>
                <Header />
                <ScrollView style={{ flex: 1, paddingHorizontal: 10, marginTop: 20 }} showsHorizontalScrollIndicator={false}>
                    <Text style={{ fontSize: 40, marginTop: 20, textAlign: 'center' }}>Request Instrument</Text>
                    <View style={{ flex: 1 }}>
                        <View style={ styles.containerTextInput2 }>
                            <TextInput style={ styles.textInput2 } placeholder='Name..' onChangeText={ text => this.setState({ name: text }) } value={ name }></TextInput>
                            <TextInput style={ styles.textInput2 } placeholder='Email..' autoCompleteType={'email'} autoCapitalize={'none'} onChangeText={ text => this.setState({ email: text }) } value={ email }></TextInput>
                        </View>
                        <View style={ styles.containerTextInput2 }>
                            <TextInput style={ styles.textInput2 } placeholder='Instrument..' onChangeText={ text => this.setState({ instrument: text }) } value={ instrument }></TextInput>
                            <TextInput style={ styles.textInput2 } placeholder='Phone number..' onChangeText={ text => this.setState({ telephone: text }) } keyboardType={'phone-pad'} value={ telephone }></TextInput>
                        </View>
                        <TextInput style={ styles.textDescription } placeholder='Description..' onChangeText={ text => this.setState({ description: text }) } value={ description }></TextInput>

                        <TouchableOpacity style={ styles.button } onPress={() => this.handleRequestInstrument()}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <Footer />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return{
        requestProduct : state.requestProducts.requestProducts
    }
}

export default connect(mapStateToProps)(RequestInstrument)

const styles = StyleSheet.create({
    containerTextInput2 : {
        marginTop: 20, 
        flexDirection: 'row'
    },
    textInput2 : {
        width: '48.5%', 
        paddingLeft: 20, 
        marginHorizontal: 3, 
        borderWidth: 1, 
        borderColor: '#C98F5D'
    },
    textDescription: {
        paddingLeft: 20, 
        marginTop: 20, 
        height: 100, 
        borderWidth: 1, 
        borderColor: '#C98F5D'
    },
    button : {
        padding: 15, 
        width: 100, 
        backgroundColor: '#C98F5D', 
        alignSelf: 'flex-end', 
        marginTop: 20
    }
})