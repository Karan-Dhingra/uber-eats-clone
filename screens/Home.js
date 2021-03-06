import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Categories from '../components/Home/Categories'
import HeaderTab from '../components/Home/HeaderTab'
import SearchBar from '../components/Home/SearchBar'
import ResturantItems, { localRestaurants } from '../components/Home/ResturantItems'
import { useState, useEffect } from 'react'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import BottomTabs from '../components/Home/BottomTabs'
import { Button } from 'react-native-elements/dist/buttons/Button'

const YELP_API_KEY = 'bdRJutLhFAQJ36t7b89CWjHFBU4OKzjt9wvZzcY-nkgmvTqlNMjZWV1eG7iBQ9R74SyfxRg9LWnBAkZY06BtAZAe4d2dfX-2vuX8a1l5V7foctHfX9UKEyoM5ts3YXYx'

export default function Home({ navigation }) {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState("San Francisco");
    const [activeTab, setActiveTab] = useState("Delivery");

    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

        const apiOptions = {
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`,
            },
        };

        return fetch(yelpUrl, apiOptions)
            .then((res) => res.json())
            .then((json) =>
                setRestaurantData(
                    json.businesses.
                    filter(business.transactions.
                        include(activeTab.toLowerCase()))
                )
            );
    };

    useEffect(() => {
        // getRestaurantsFromYelp();
    }, [city, activeTab]);

    return (
        <SafeAreaView style={
            {
                // marginTop: 5,
                backgroundColor: '#eee',
                flex: 1
            }
        }>
            <View style={
                {
                    backgroundColor: 'white',
                    padding: 15
                }
            }>          
                <HeaderTab activeTab={activeTab} setActiveTab={setActiveTab} />
                <SearchBar cityHandler={setCity} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Categories/>
                <ResturantItems resturantData={restaurantData} navigationPress={() => navigation.navigate('RestaurantDetail')}  />
            </ScrollView>

            <Divider width={1} />
            <BottomTabs />
        </SafeAreaView>
    )
}
