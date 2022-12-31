import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import userData from './Sample2.json'

export default function Home() {

    const [searchString, setSearchString] = useState('')
    const [filterData, setFilterData] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://onehealthassist.com/api/v1/user/getDocData', {
                method: 'POST',
            });
            const data = await response.json()
            console.log(data)
            setData(data?.data?.allData)
        }
        fetchData()
    }, [])


    const omittedProps = ["pavan"];

    const searchHandler = (toSearch) => {
        setSearchString(toSearch)
        const filteredData = data.map(e => e.filter(val => JSON.stringify(val).toLowerCase().includes(toSearch.toLowerCase())))
        setFilterData(filteredData)
    }

    console.log("data")
    console.log(JSON.stringify(data))

    // userData.map(e => e.map(d => (
    //     Object.keys(d).map(prop => (
    //         !omittedProps.includes(prop) && (
    //             console.log(prop)
    //         )
    //     ))
    // )))

    if (data !== [] && searchString !== '') {
        return (
            <ScrollView>
                <TextInput
                    placeholder='Search anything'
                    style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}
                    onChangeText={(e) => searchHandler(e)}
                />
                {filterData.map(e => e.map(d => (
                    Object.keys(d).map((prop, index) => (
                        !omittedProps.includes(prop) && (
                            <View style={{ margin: 5, display: "flex", flexDirection: "row" }}>
                                <Text style={{ fontWeight: "bold" }}>{prop}: </Text>
                                <Text style={{ display: "flex", flexDirection: "row" }}>{d[prop]}</Text>
                                {index === Object.keys(d).length - 1 ? <View style={{ borderBottomWidth: 1, width: "100%" }}></View> : <View></View>}
                            </View>
                        )
                    ))
                )))}
            </ScrollView>
        )
    }


    return (
        <ScrollView >
            <TextInput
                placeholder='Search anything'
                style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}
                onChangeText={(e) => searchHandler(e)}
            />
            {/* {data == [] ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color={"red"} size="large" />
            </View> :
                <ScrollView>
                    {data.map(e => e.map(d => (
                        Object.keys(d).map((prop, index) => (
                            !omittedProps.includes(prop) && (
                                <View style={{ margin: 5, display: "flex", flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold" }}>{prop}: </Text>
                                    <Text style={{ display: "flex", flexDirection: "row" }}>{d[prop]}</Text>
                                    {index === Object.keys(d).length - 1 ? <View style={{ borderBottomWidth: 1, width: "100%" }}></View> : <View></View>}
                                </View>
                            )
                        ))
                    )))}
                </ScrollView>} */}
        </ScrollView>
    )

    // return (
    //     <ScrollView>
    //         <TextInput
    //             placeholder='Search anything'
    //             style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}
    //             onChangeText={(e) => searchHandler(e)}
    //         />
    //         {userData.map(e => e.map(d => (
    //             Object.keys(d).map((prop, index) => (
    //                 !omittedProps.includes(prop) && (
    //                     <View style={{ margin: 5, display: "flex", flexDirection: "row" }}>
    //                         <Text style={{ fontWeight: "bold" }}>{prop}: </Text>
    //                         <Text style={{ display: "flex", flexDirection: "row" }}>{d[prop]}</Text>
    //                         {index === Object.keys(d).length - 1 ? <View style={{ borderBottomWidth: 1, width: "100%" }}></View> : <View></View>}
    //                     </View>
    //                 )
    //             ))
    //         )))}
    //     </ScrollView>
    // )
}
