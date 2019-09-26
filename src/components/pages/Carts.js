import { connect } from 'react-redux'
import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, ToastAndroid, Image, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Spinner } from 'native-base'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { getCartsByUser, deleteCart, patchCarts } from '../../publics/redux/actions/carts'
import { postTransaction } from '../../publics/redux/actions/transactions'

class Carts extends Component {
    state = {
        carts : [],
        historyQty: 0
    }

    componentDidMount = async() => {
        await AsyncStorage.getItem('id_user').then(async(id_user) => {
            if(!this.props.carts.length){
                await this.props.dispatch(getCartsByUser(id_user))
            }
            await this.setState({ carts: this.props.carts })
        })
    }

    handleMinus = async(cart, index) => {
        if(cart.qty > 1) {
            let quantity = parseInt(cart.qty) - 1
            await this.setState(prevState => ({ ...prevState.carts[index].qty = quantity }))
            await this.props.dispatch(patchCarts(cart.id, cart))
        }
    }
    handlePlus = async(cart, index) => {
        let quantity = parseInt(cart.qty) + 1
        await this.setState(prevState => ({ ...prevState.carts[index].qty = quantity }))
        await this.props.dispatch(patchCarts(cart.id, cart))
    }
    handleQtyTyping = async(cart, index) => {
        await this.setState(prevState => ({ ...prevState.carts[index].qty = parseInt(prevState.historyQty) }, { historyQty: 0 }))
        await this.props.dispatch(patchCarts(cart.id, cart))
    }

    handleDelete = async (id_cart) => {
        let indexCart = this.props.carts.map((e) => { return e.id }).indexOf(id_cart)
        
        await this.props.dispatch(deleteCart(id_cart)).then(async() => {
            await this.props.carts.splice(indexCart, 1)
            this.setState({ carts: this.props.carts })
        })
    }

    handleCheckout = async() => {
        await this.props.dispatch(postTransaction(this.state.carts)).then(async() => {
            ToastAndroid.showWithGravity(
                'Checkout Success',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            )
            await this.props.dispatch(deleteCart(this.state.carts)).then(async() => {
                await this.props.carts.splice(0, this.state.carts.length)
                await this.setState({ carts: [] })
                this.props.navigation.navigate('Transactions')
            })
        })
    }

    render() {
        let total = 0
        this.state.carts.map(cart => total += (cart.price * cart.qty))

        AsyncStorage.getItem('token').then(token => (token === null) ? this.props.navigation.navigate('AuthStack'):'')
        if(parseInt(this.props.status) !== 200){
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Spinner color='blue' style={{ marginTop: '50%' }} />
                        </View>
                    </ScrollView>
                    <Footer/>
                </View>
            )
        }else{
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <View style={{ flex: 1, marginBottom: 30 }}>
                        <Text style={{ fontSize: 20, marginVertical: 20, marginLeft: 5 }}>Carts :</Text>
                        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                            {
                                (this.state.carts.length) ?
                                    this.state.carts.map((cart, index) => (
                                        <View style={{ flexDirection: 'row', height: 140, borderBottomColor: '#C98F5D', borderBottomWidth: 3 }} key={ cart.id }>
                                            <View style={{ width: '35%', height: '100%' }}>
                                                <Image source={{ uri : cart.image }} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
                                            </View>
                                            <View style={{ flex: 1, padding: 8, height: '100%' }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { product: cart.product })}>
                                                    <Text style={{ fontSize: 22, marginBottom: 15, marginTop: 10 }}>
                                                    {
                                                        (cart.product.length > 20) ? cart.product.substr(0, 20) + '...' : cart.product
                                                    }
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 120 }}>
                                                        <Text style={{ fontSize: 18 }}>Rp. { cart.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, justifyContent: 'center', width: 50 }}>
                                                        <TouchableOpacity style={{ alignSelf: 'center' }}
                                                            onPress={ () => this.handleMinus(cart, index) }
                                                        >
                                                            <Text style={{ fontSize: 25 }}>-</Text>
                                                        </TouchableOpacity>
                                                        <TextInput style={{ fontSize: 15, marginHorizontal: 5, textAlign: 'center', width: 25 }}
                                                            keyboardType='numeric'
                                                            onChangeText={ (text) => this.setState({ historyQty: text }) }
                                                            onSubmitEditing={ () => this.handleQtyTyping(cart, index) }>
                                                            {cart.qty}
                                                        </TextInput>
                                                        <TouchableOpacity style={{ alignSelf: 'center' }}
                                                            onPress={() => this.handlePlus(cart, index)}
                                                        >
                                                            <Text style={{ fontSize: 25 }}>+</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <TouchableOpacity style={{ height: 35, marginHorizontal: 3, width: 35, borderRadius: 50, paddingTop: 2, justifyContent: 'center' }}
                                                        onPress={ () => this.handleDelete(cart.id) }
                                                    >
                                                        <Image source={require('../../assets/image/icon/trash.png')} style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                : null
                            }
                        </ScrollView>
                        </View>
                        {
                            (this.state.carts.length) ? 
                                <View style={{ flexDirection: 'row', alignItems:'center', height: 50, width: '100%' }}>
                                    <View style={{ width: '65%' }}>
                                        <Text style={{ textAlign:'center', fontSize: 20 }}>Total : Rp. {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                    </View>
                                    <TouchableOpacity style={{ flex: 1, height: 50, justifyContent:'center', backgroundColor: '#C98F5D' }}
                                        onPress={this.handleCheckout}
                                    >
                                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15  }}>Checkout</Text>
                                    </TouchableOpacity>
                                </View>
                            : null
                        }
                    <Footer />
                </View>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        carts : state.carts.carts,
        status : state.carts.status
    }
}

export default connect(mapStateToProps)(Carts)

const styles = StyleSheet.create({
})