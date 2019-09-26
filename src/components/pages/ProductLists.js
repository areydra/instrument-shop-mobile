import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'native-base'
import Header from '../layouts/Header'
import { Spinner } from 'native-base'

import { getProductsByCategory, getSearchProducts } from '../../publics/redux/actions/products'

class ProductLists extends Component{
  state = {
    products : [],
    status : 0,
    limit : 20,
    offset : 0
  }
  componentDidMount = async () => {
    let search = await this.props.navigation.getParam('search')
    if(!search){
      await this.props.dispatch(getProductsByCategory(this.props.navigation.getParam('category'), this.state.offset, this.state.limit))
    }else{
      await this.props.dispatch(getSearchProducts(this.props.navigation.getParam('search'), this.state.offset, this.state.limit))
    }
    await this.setState({ products: this.props.products, status: this.props.status })
  }
  render(){
    const { navigation } = this.props
    const { products, status } = this.state
    if(status === 0){
      return(
        <View style={{ flex: 1 }}>
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              (!navigation.getParam('category'))?
                <View style={styles.textSection}>
                  <Text style={styles.textForCard}> Search for : </Text>
                  <Text style={{ marginLeft: 10 }}>{ navigation.getParam('search') }</Text>
                </View>
              : null
            }

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Spinner color='blue' style={{ marginTop: '50%' }}/>
            </View>
          </ScrollView>
        </View>
      )
    }else{
      return (
        <View style={{ flex: 1 }}>
          <Header />
          <ScrollView showsVerticalScrollIndicator={false}>
            {
              (!navigation.getParam('category')) ?
                <View style={styles.textSection}>
                  <Text style={styles.textForCard}> Search for : </Text>
                  <Text style={{ marginLeft: 10 }}>{ navigation.getParam('search') }</Text>
                </View>
                : null
            }

            <View style={(navigation.getParam('category')) ? { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 25, marginTop: 20 } : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingBottom: 25 }}>
              {
                (products.length) ?
                  products.map((product) => (
                    <Card style={styles.cardProducts} key={product.id}>
                      <TouchableOpacity onPress={ () => this.props.navigation.navigate('ProductDetails', {product: product.name}) }>
                        <Image source={{ uri: product.image }} style={styles.cardImage} />
                        <Text style={styles.cardText}>{
                          (product.name.length > 13) ? product.name.substr(0, 13) + '...' : product.name
                        }</Text>
                        <Text style={styles.cardText}>Rp. {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                        <View style={styles.cardLine}></View>
                      </TouchableOpacity>
                    </Card>
                  ))
                : 
                  <Text style={{ alignSelf: 'center', marginTop: '55%' }}>No more items</Text>
              }
            </View>
          </ScrollView>
        </View>
      )
    }
    }
}

const mapStateToProps = state => {
  return{
    products : state.products.products,
    status : state.products.status
  }
}
export default connect(mapStateToProps)(ProductLists)

const styles = StyleSheet.create({
  textSection: {
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  textForCard: {
    fontSize: 20,
    alignSelf: 'center'
  },

  cardText: {
    alignSelf: 'center',
    marginVertical: 5,
    marginBottom: 5
  },
  cardProducts: {
    width: 110,
    height: 140
  },
  cardImage: {
    alignSelf: 'center',
    marginTop: 3,
    width: 110,
    height: 70,
    resizeMode: 'contain'
  },
  cardLine: {
    height: 3,
    backgroundColor: '#C98F5D',
    marginHorizontal: 15
  }
})
