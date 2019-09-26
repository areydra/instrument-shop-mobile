import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { Home, ProductDetails, ProductLists, Transactions, Carts, Wishlists, Login, Register, Profile, Search, RequestInstrument } from '../components/pages/index'

const HomeStack = createStackNavigator(
    {
        Home, ProductDetails, ProductLists, Search
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
);

const CartsStack = createStackNavigator(
    {
        Carts, Search
    },
    {
        initialRouteName: 'Carts',
        headerMode: 'none'
    }
);

const WishlistsStack = createStackNavigator(
    {
        Wishlists, Search
    },
    {
        initialRouteName: 'Wishlists',
        headerMode: 'none'
    }
);

const ProfileStack = createStackNavigator(
    {
        Profile, Search, Transactions, RequestInstrument
    },
    {
        initialRouteName: 'Profile',
        headerMode: 'none'
    }
);

const AuthStack = createStackNavigator(
    {
        Login, Register
    },
    {
        initialRouteName : 'Login',
        headerMode: 'none'
    }
);

const Router = createSwitchNavigator(
    {
        HomeStack, CartsStack, WishlistsStack, ProfileStack, AuthStack
    },
    {
        initialRouteName : 'HomeStack',
        headerMode: 'none'
    }
);

export default createAppContainer(Router);