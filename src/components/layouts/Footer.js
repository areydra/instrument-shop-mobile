import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation'

class Footer extends Component {
    render() {
        return (
        <View style={ styles.footer }>
            <TouchableOpacity style={ styles.touchable } onPress={ () => this.props.navigation.navigate('HomeStack') }>
                <Image source={require('../../assets/image/icon/house.png')} style={ styles.image }/>
                <Text style={ styles.text }>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.touchable }  onPress={ () => this.props.navigation.navigate('CartsStack') }>
                <Image source={require('../../assets/image/icon/cart.png')} style={ styles.image } />
                <Text style={ styles.text }>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.touchable }  onPress={ () => this.props.navigation.navigate('WishlistsStack') }>
                <Image source={require('../../assets/image/icon/wishlist.png')} style={ styles.image } />
                <Text style={ styles.text }>Wishlists</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.touchable }  onPress={ () => this.props.navigation.navigate('ProfileStack') }>
                <Image source={require('../../assets/image/icon/profile.png')} style={ styles.image } />
                <Text style={ styles.text }>Profile</Text>
            </TouchableOpacity>
        </View>
        )
    }
}
export default withNavigation(Footer)

const styles = StyleSheet.create({
  footer: {  
    backgroundColor: 'white',  
    height: '9%',
    flexWrap: 'wrap',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    elevation: 8
  },
  text: {
      alignSelf: 'center', 
      color: '#5D97C9',
  },
  image: {
      alignSelf: 'center', 
      width: 20, 
      height: 20, 
      marginVertical: 6, 
      resizeMode: 'contain'
  },
  touchable: {
      width: '20%', 
      height: '100%'
  }
})