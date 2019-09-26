import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { getProductDetails } from '../../publics/redux/actions/products'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getWishlistsByUser, deleteWishlist, postWishlist } from '../../publics/redux/actions/wishlist'
import { getCartsByUser, postCart, deleteCart } from '../../publics/redux/actions/carts'

class ProductDetails extends Component {
    state = {
      carts: [],
      product : [],
      wishlists: [],
      user: {
        id : null
      },
      checkInWishlists : []
    }

    componentDidMount = async() => {
      await this.props.dispatch(getProductDetails(this.props.navigation.getParam('product')))
      await this.setState({ product: this.props.product })

      await AsyncStorage.getItem('id_user').then(async (id_user) => {
        if (!this.props.wishlists.length) {
          await this.props.dispatch(getWishlistsByUser(id_user))
          await this.props.dispatch(getCartsByUser(id_user))
        }
        await this.setState({ wishlists: this.props.wishlists, carts: this.props.carts, user: { id: id_user } })
      })
    }

    checkInCarts = id_product => {
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
          id_product: products.id,
          id_user: id_user,
          qty: 1,
        }

        await this.props.dispatch(postCart(product)).then(() => {
            let newCart = {
              id: this.props.newCart.id,
              id_product: products.id,
              id_user: id_user,
              qty: 1,
              image: products.image,
              price: products.price,
              product: products.name
            }
            this.props.carts.push(newCart)
            carts.push(this.props.newCart)
            this.setState({ carts })
        })
      })        
    }

    handleDeleteCart = async (id_product) => {
        let indexCart = this.props.carts.map((e) => {return e.id_product} ).indexOf(id_product)
        let cart = this.checkInCarts(id_product)[0]

        await this.props.dispatch(deleteCart(cart.id)).then(async() => {
            await this.props.carts.splice(indexCart, 1)
            this.setState({ carts: this.props.carts })
        })
    }

    checkInWishlists = id_product => {
        return(
          this.state.wishlists.filter(wishlist => wishlist.id_product === id_product)
        )
    }

    handleAddToWishlists = async(products) => {
      let wishlists = []
      await this.state.wishlists.map(wishlist => {
        wishlists.push(wishlist)
      })
      await AsyncStorage.getItem('id_user').then(async(id_user) => {
        let product = {
          id_product: products.id,
          id_user: id_user,
          qty: 1,
        }
        
        await this.props.dispatch(postWishlist(product)).then(() => {
            let newWishlist = {
              id: this.props.newWishlist.id,
              id_product: products.id,
              id_user: id_user,
              qty: 1,
              image: products.image,
              price: products.price,
              product: products.name
            }
            this.props.wishlists.push(newWishlist)
            wishlists.push(this.props.newWishlist)
            this.setState({ wishlists })
        })
      })        
    }

    handleDeleteWishlists = async (id_product) => {
        let indexWishlists = this.props.wishlists.map((e) => {return e.id_product} ).indexOf(id_product)
        let wishlist = this.checkInWishlists(id_product)[0]
        await this.props.wishlists.splice(indexWishlists, 1)
        await this.props.dispatch(deleteWishlist(wishlist.id)).then(async() => {
            await this.setState({ wishlists: this.props.wishlists })
        })
    }

    render() {
      const { id, name, price, image, description, qty } = this.state.product
      if (!this.state.product.id) {
        return (
          <View style={{ flex: 1 }}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Spinner color='blue' style={{ marginTop: '50%' }} />
              </View>
            </ScrollView>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1 }}>
            <Header />
            <ScrollView style={{ flex: 1 }}>
              <View style={{ alignItems: 'center', marginTop: 35 }}>
                <Text style={{ fontSize: 25, textAlign: 'center' }}>{ name }</Text>
              </View>
              <View style={{ height: 3, backgroundColor: '#C98F5D', marginVertical: 10, marginHorizontal: 25 }} />

              <View style={{ flexDirection: 'row', height: 250, marginTop: 15 }}>
                <View style={{ width: '50%', height: '100%' }}>
                  <Image source={{ uri: image }} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                </View>
                <View style={{ width: '50%', height: '100%', padding: 10 }}>
                  <Text style={{ fontSize: 20 }}>Rp. { price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }</Text>
                  <Text style={{ marginTop: 5 }}>Quantity : { qty }</Text>
                  {
                    (this.state.user.id !== null) ?
                      <View style={{ height: 35, marginTop: 25, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {
                          (this.state.wishlists.length) ?
                            (this.checkInWishlists(id).length) ?
                              <TouchableOpacity style={{ height: '100%', marginHorizontal: 10, width: 35, borderRadius: 50, backgroundColor: '#C98F5D', paddingTop: 2, justifyContent: 'center' }} 
                                onPress={() => this.handleDeleteWishlists(id)} 
                              >
                                <Image source={require('../../assets/image/icon/heart.png')} style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }} />
                              </TouchableOpacity>
                            :
                              <TouchableOpacity style={{ height: '100%', marginHorizontal: 10, width: 35, borderRadius: 50, paddingTop: 2, justifyContent: 'center' }} 
                                onPress={() => this.handleAddToWishlists(this.state.product)} 
                              >
                                <Image source={require('../../assets/image/icon/heart-black.png')} style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }} />
                              </TouchableOpacity>
                          :
                            <TouchableOpacity style={{ height: '100%', marginHorizontal: 10, width: 35, borderRadius: 50, paddingTop: 2, justifyContent: 'center' }}
                              onPress={() => this.handleAddToWishlists(this.state.product)}
                            >
                              <Image source={require('../../assets/image/icon/heart-black.png')} style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }

                        {
                          (this.checkInCarts(id).length) ?
                            <TouchableOpacity style={{ height: '100%', marginHorizontal: 10, width: 35, borderRadius: 50, backgroundColor: '#5D97C9', paddingTop: 1, justifyContent: 'center' }} 
                              onPress={ () => this.handleDeleteCart(id) }
                            >
                              <Image source={require('../../assets/image/icon/shopping-bag.png')} style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }} />
                            </TouchableOpacity>
                          :
                            <TouchableOpacity style={{ height: '100%', marginHorizontal: 10, width: 35, borderRadius: 50, paddingTop: 1, justifyContent: 'center' }}
                              onPress={() => this.handleAddToCart(this.state.product)}
                            >
                              <Image source={require('../../assets/image/icon/shopping-bag-black.png')} style={{ width: 25, height: 15, alignSelf: 'center', resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        }
                      </View>
                    : null
                  }
                </View>
              </View>

              <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20 }}>Description :</Text>
                <Text style={{ marginTop: 5 }}>
                  { description }
              </Text>
              </View>
            </ScrollView>
            <Footer />
          </View>
        )
      }
    }
}

const mapStateToProps = state => {
  return {
    product : state.products.products[0],
    wishlists: state.wishlists.wishlists,
    newWishlist: state.wishlists.newWishlist[0],
    carts: state.carts.carts,
    newCart: state.carts.newCart[0]
  }
}

export default connect(mapStateToProps)(ProductDetails)