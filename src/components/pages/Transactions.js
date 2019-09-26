import { connect } from 'react-redux'
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Spinner } from 'native-base'
import moment from 'moment'

import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
import { getTransactionsByUser } from '../../publics/redux/actions/transactions'

class Transactions extends Component {
    state = {
        transactions : []
    }

    componentDidMount = async() => {
        await AsyncStorage.getItem('id_user').then(async(id_user) => {
            if(!this.props.transactions.length){
                await this.props.dispatch(getTransactionsByUser(id_user))
            }
            await this.setState({transactions: this.props.transactions})
        })
    }

    render() {
        AsyncStorage.getItem('token').then(token => (token === null) ? this.props.navigation.navigate('AuthStack') : '')
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
                        <Text style={{ fontSize: 20, marginVertical: 20, marginLeft: 5 }}>Transactions :</Text>
                        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false}>
                            {
                                (this.state.transactions.length) ?
                                    this.state.transactions.map(transaction => (
                                        <View style={{ flexDirection: 'row', height: 100, borderBottomColor: '#C98F5D', borderBottomWidth: 3 }} key={transaction.id}>
                                            <View style={{ flex: 1, padding: 8, height: '100%', marginTop: 20 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity style={{ width: '65%' }} onPress={() => this.props.navigation.navigate('ProductDetails', { product: transaction.product })}>
                                                        <Text style={{ fontSize: 20 }}>
                                                            {
                                                                (transaction.product.length > 20) ? transaction.product.substr(0, 20) + '...' : transaction.product
                                                            }
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <View style={{ width: '65%' }}>
                                                        <Text style={{ fontSize: 18 }}>Rp. {(transaction.price * transaction.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                                    <View style={{ width: '50%' }}>
                                                        <Text style={{ fontSize: 18, marginRight: 20, alignSelf: 'flex-end' }}>Quantity : {transaction.qty}</Text>
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{ fontSize: 18 }}>{moment(transaction.created_at).format('lll') }</Text>
                                                    </View>
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

const mapStateToProps = state => {
    return {
        transactions : state.transactions.transactions,
        status : state.transactions.status
    }
}

export default connect(mapStateToProps)(Transactions)

const styles = StyleSheet.create({
})