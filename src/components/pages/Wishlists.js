import React, { Component } from 'react';
import { StyleSheet, ScrollView, ToastAndroid, View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { getWishlistsByUser, deleteWishlist } from '../../publics/redux/actions/wishlist'
import { getCartsByUser, postCart, deleteCart } from '../../publics/redux/actions/carts'

class Wishlists extends Component {
    state = {
        wishlists: [],
        carts : [],
    }

    componentDidMount = async() => {
        await AsyncStorage.getItem('id_user').then(async(id_user) => {
            if(!this.props.wishlists.length){
                await this.props.dispatch(getWishlistsByUser(id_user))
                await this.props.dispatch(getCartsByUser(id_user))
            }
            await this.setState({ wishlists: this.props.wishlists, carts: this.props.carts })
        })
    }

    checkFavoriteInCart = id_product => {
        return(
            this.state.carts.filter(cart => cart.id_product === id_product)
        )
    }

    handleAddToCart = async(products) => {
      let carts = []
      await this.state.carts.map(cart => {
          carts.push(cart)
      })
      await AsyncStorage.getItem('id_user').then(async(id_user) => {
        let product = {
          id_product: products.id_product,
          id_user: id_user,
          qty: 1,
        }

        await this.props.dispatch(postCart(product)).then(async() => {
            let newCart = {
              id: this.props.newCart.id,
              id_product: products.id_product,
              id_user: id_user,
              qty: 1,
              image: products.image,
              price: products.price,
              product: products.product
            }
            await this.props.carts.push(newCart)
            carts.push(this.props.newCart)
            this.setState({ carts })
        })
      })        
    }

    handleDeleteCart = async (id_product) => {
        let indexCart = this.props.carts.map((e) => {return e.id_product} ).indexOf(id_product)
        let cart = this.checkFavoriteInCart(id_product)[0]

        await this.props.dispatch(deleteCart(cart.id)).then(() => {
            this.props.carts.splice(indexCart, 1)
            let carts = this.state.carts.filter(carts => carts.id !== cart.id)
            this.setState({ carts })
        })
    }

    handleDelete = async(id) => {
        await this.props.dispatch(deleteWishlist(id)).then(() => {
            let wishlists = this.state.wishlists.filter(wishlist => wishlist.id !== id)
            this.setState({ wishlists })
        })
    }

    render() {
        AsyncStorage.getItem('token').then(token => (token === null) ? this.props.navigation.navigate('AuthStack') : '')
        if (parseInt(this.props.status) !== 200) {
            return (
                <View style={{ flex: 1 }}>
                    <Header />
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <Spinner color='blue' style={{ marginTop: '50%' }} />
                        </View>
                    </ScrollView>
                    <Footer />
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Header />

                    <View style={{ flex: 1, marginBottom: 30 }}>
                        <Text style={{ fontSize: 20, marginVertical: 20, marginLeft: 5 }}>Wishlists :</Text>
                        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                            {
                                (this.state.wishlists.length) ?
                                    this.state.wishlists.map(wishlist => (
                                        <View style={{ flexDirection: 'row', height: 140, borderBottomColor: '#C98F5D', borderBottomWidth: 3 }} key={ wishlist.id }>
                                            <View style={{ width: '35%', height: '100%' }}>
                                                <Image source={{ uri: wishlist.image }} style={{ height: '100%', width: '100%', resizeMode: 'contain' }} />
                                            </View>
                                            <View style={{ flex: 1, padding: 8, height: '100%' }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', {product: wishlist.product})}>
                                                    <Text style={{ fontSize: 22, marginBottom: 15, marginTop: 10 }}>
                                                        {
                                                            (wishlist.product.length > 20) ? wishlist.product.substr(0, 20) + '...' : wishlist.product
                                                        }
                                                    </Text>
                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 18, marginRight: 3, width: 100 }}>Rp. {wishlist.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                                    {
                                                        (this.checkFavoriteInCart(wishlist.id_product).length) ?
                                                            <TouchableOpacity style={{ height: 35, marginHorizontal: 5, width: 35, borderRadius: 50, backgroundColor: '#5D97C9', paddingTop: 1, justifyContent: 'center' }} 
                                                                onPress={ () => this.handleDeleteCart(wishlist.id_product) }
                                                            >
                                                                <Image
                                                                    source={require('../../assets/image/icon/shopping-bag.png')}
                                                                    style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }}
                                                                />
                                                            </TouchableOpacity>
                                                        : 
                                                            <TouchableOpacity style={{ height: 35, marginHorizontal: 5, width: 35, borderRadius: 50, paddingTop: 1, justifyContent: 'center' }}
                                                                onPress={() => this.handleAddToCart(wishlist)}
                                                            >
                                                                <Image
                                                                    source={require('../../assets/image/icon/shopping-bag-black.png')}
                                                                    style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }}
                                                                />
                                                            </TouchableOpacity>
                                                    }
                                                    <TouchableOpacity style={{ height: 35, marginHorizontal: 5, width: 35, borderRadius: 50, paddingTop: 2, justifyContent: 'center' }}
                                                        onPress={() => this.handleDelete(wishlist.id) }
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
                    <Footer />
                </View>
            )
        }
    }
}

const mapStateProps = state => {
    return {
        wishlists: state.wishlists.wishlists,
        carts : state.carts.carts,
        newCart: state.carts.newCart[0],
        status: state.wishlists.status
    }
}

export default connect(mapStateProps)(Wishlists)

const styles = StyleSheet.create({
})