import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'native-base'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

import { getCategories } from '../../publics/redux/actions/categories'
import { getBestProducts, getMostFavorites } from '../../publics/redux/actions/products';

const {width,height} = Dimensions.get('window')

class Home extends Component {
  state = {
    categories : [],
    mostFavorites : [],
    bestProducts : [],
    status: 0
  }

  componentDidMount = async() => {
    if(!this.props.categories.length && !this.props.mostFavorites.length && !this.props.bestProducts.length){
      await this.props.dispatch(getCategories())
      await this.props.dispatch(getMostFavorites())
      await this.props.dispatch(getBestProducts())
    }
    await this.setState({ categories: this.props.categories, mostFavorites: this.props.mostFavorites, bestProducts: this.props.bestProducts, status : this.props.status })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header />        
        <ScrollView style={ styles.main }>
        {
          (parseInt(this.state.status) !== 200) ? 
              <Spinner color='blue' style={{ marginTop: '60%' }} />
          :
            <View>
              <View style={styles.banner}>
                <Image source={{ uri: 'https://cdn3.pitchfork.com/longform/683/Year_In_Streaming_v2.jpg' }} style={styles.bannerImage}></Image>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {
                    this.state.categories.map(category => (
                      <View style={{ width: 80, height: 110 }} key={category.id}>
                        <TouchableOpacity style={styles.cardCategory} onPress={() => this.props.navigation.navigate('ProductLists', { category: category.name })}>
                          <Image source={{ uri: category.image }} style={{ alignSelf: 'center', width: 50, height: 50, marginTop: 13, resizeMode: 'contain' }}>
                          </Image>
                        </TouchableOpacity>
                        <Text style={styles.cardText}>{category.name}</Text>
                      </View>                
                    ))
                }
                </View>
                <View style={{ height: 3, backgroundColor: '#C98F5D', marginVertical: 10, marginHorizontal: 25 }}></View>

                <View style={styles.textSection}>
                  <Text style={styles.textForCard}>
                    Most Favorites :
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {
                    this.state.mostFavorites.map((favorite, index) => (
                      <Card style={styles.cardProducts} key={index}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { product: favorite.name })}>
                          <Image source={{ uri : favorite.image }} style={styles.cardImage} />
                          <Text style={styles.cardText}>
                            {
                              (favorite.name.length > 13) ? favorite.name.substr(0, 13) + '...' : favorite.name
                            }
                          </Text>
                          <Text style={styles.cardText}>Rp. {favorite.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                          <View style={styles.cardLine}></View>
                        </TouchableOpacity>
                      </Card>
                    ))
                  }
                </ScrollView>

                <View style={styles.textSection}>
                  <Text style={styles.textForCard}>
                    Best Instruments :
                  </Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
                  {
                    this.state.bestProducts.map((best, index) => (
                      <Card style={styles.cardProducts} key={index}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProductDetails', { product: best.name })}>
                          <Image source={{ uri: best.image }} style={styles.cardImage} />
                          <Text style={styles.cardText}>
                            {
                              (best.name.length > 13) ? best.name.substr(0, 13) + '...' : best.name
                            }
                          </Text>
                          <Text style={styles.cardText}>Rp. {best.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                          <View style={styles.cardLine}></View>
                        </TouchableOpacity>
                      </Card>
                    ))
                  }
                </ScrollView>
            </View>
          }
        </ScrollView>
        <Footer />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return{
    categories: state.categories.categories,
    mostFavorites: state.products.mostFavorites,
    bestProducts: state.products.bestProducts,
    status : state.products.status
  }
}

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  main : {
    backgroundColor: 'white',
    flex: 1, 
    paddingHorizontal: 10
  },

  banner : {
    height: height / 3.5, 
    width: '100%', 
    borderRadius: 15, 
    alignSelf: 'center', 
    marginTop: '5%', 
    alignItems: 'center'
  },
  bannerImage : {
    height: '100%', 
    width: '100%', 
    borderRadius: 15
  },

  seeAllContainer : {
    flexDirection: 'row', 
    width: 100, 
    height: 25, 
    alignItems: 'center', 
    borderRadius: 5
  },
  seeAllText : {
    width: 100, 
    color: '#5D97C9', 
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#5D97C9'
  },

  textSection : {
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textForCard : {
    fontSize: 20,
    alignSelf: 'center'
  },
  cardText: {
    alignSelf: 'center', 
    marginVertical: 5, 
    marginBottom: 5
  },
  cardCategory : {
    width: 75, 
    height: 75,
    borderRadius: 25,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#C98F5D'
  },
  imageCategory: {
    alignSelf: 'center', 
    marginTop: 3, 
    width: 100, 
    height: 80, 
    resizeMode: 'contain'
  },
  cardProducts : {
    width: 120, 
    height: 150
  },
  cardImage: {
    alignSelf: 'center', 
    marginTop: 3, 
    width: 120, 
    height: 80, 
    resizeMode: 'contain'
  },
  cardLine: {
    height: 3, 
    backgroundColor: '#C98F5D', 
    marginHorizontal: 15
  }
})