import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import userData from './Sample2.json'

export default function Home() {

    const [searchString, setSearchString] = useState('')
    const [filterData, setFilterData] = useState([])
    const [data, setData] = useState([])

    const headings = []
    const [body, setBody] = useState([])

    // console.log("headings")
    // console.log(JSON.stringify(data.map(e => e.map(f => Object.keys(f[0])))))

    console.log("data")
    console.log(JSON.stringify(data.map(e => e.map(f => f.map(g => Object.values(g))))))

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
    }, [filterData])

    const searchHandler = (toSearch) => {
        setSearchString(toSearch)
        if (toSearch.toLowerCase() == "cbc" || toSearch.toLowerCase() == "blood count" || toSearch.toLowerCase() == "complete blood count") {
            const filteredData = data.map(val => val.map(e => e.filter(val => /RED BLOOD|HEMOGLOBIN|HEMATOCRIT|MEAN CORPUSCULAR|RED CELL|PLATELET|WHITE BLOOD/i.test(JSON.stringify(val)))))
            setFilterData(filteredData)
        } else if (toSearch.toLowerCase() == "wbc differential count" || toSearch.toLowerCase() == "wbc diff" || toSearch.toLowerCase() == "wbc") {
            const filteredData = data.map(val => val.map(e => e.filter(val => /RED BLOOD|HEMOGLOBIN|HEMATOCRIT|MEAN CORPUSCULAR|RED CELL|PLATELET|WHITE BLOOD/i.test(JSON.stringify(val)))))
            setFilterData(filteredData)
        } else {
            const filteredData = data.map(val => val.map(e => e.filter(val => JSON.stringify(val).toLowerCase().includes(toSearch.toLowerCase()))))
            setFilterData(filteredData)
        }
    }

    // const searchHandler = (toSearch) => {
    //     setSearchString(toSearch)
    //     const filteredData = data.map(e => e.map(item => item.map(val => val.findIndex(JSON.stringify(val)))))
    //     setFilterData(filteredData)
    //     console.log("filterData")
    //     console.log(JSON.stringify(filterData))
    // }

    // console.log("data")
    // console.log(JSON.stringify(data[0]))

    if (data == []) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        )
    }

    // if (filterData.length == 0) {
    //     return (
    //         <View>
    //             <TextInput
    //                 placeholder='Search anything'
    //                 style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}
    //                 onChangeText={(e) => searchHandler(e)}
    //                 autoFocus={true}
    //             />
    //             <Text>No result</Text>
    //         </View>
    //     )
    // }

    if (searchString != "") {
        return (
            <ScrollView>
                <TextInput
                    placeholder='Search anything'
                    style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}
                    onChangeText={(e) => searchHandler(e)}
                    autoFocus={true}
                />
                <View>
                    {/* {filterData?.map(val => val?.map(e => e?.map(item => (
                        <View>
                            {Object.entries(item).map(([key, val], index) => {
                                return (
                                    <View style={{ marginHorizontal: 5 }}>
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "bold" }}>{key}: </Text>
                                            <Text>{val.split('METHOD')[0]}</Text>
                                        </View>
                                        {index == Object.keys(item).length - 1 ? <View style={{ borderBottomWidth: 1, width: "100%", margin: 5, alignSelf: "center" }}></View> : <View></View>}
                                    </View>
                                )
                            })}
                        </View>
                    ))))} */}
                    {filterData.map(val => (
                        <View style={{ margin: 5 }}>
                            <Table borderStyle={{ borderWidth: 0.5, borderColor: '#c8e1ff', margin: 5 }}>
                                {val?.map(e => (
                                    <Text>{JSON.stringify(Object.keys(e[0] || {}))}</Text>
                                    // <Row
                                    //     data={filterData.length == 0 ? [] : Object.keys(e[0] || {})}
                                    // />
                                ))}
                                {val.map(f => f.map(g => (
                                    // <Text>{JSON.stringify(Object.values(g))}</Text>
                                    <Table>
                                        <Row
                                            data={Object.keys(g)}
                                        />
                                        {/* <Text>{JSON.stringify(Object.keys(g))}</Text> */}
                                        <Rows
                                            data={[Object.values(g)]}
                                        />
                                    </Table>
                                )))}
                                {/* <Rows data={filterData.map(e => e.map(f => f.map(g => Object.values(g))))} /> */}
                            </Table>
                        </View>
                    ))}
                </View>
            </ScrollView>
        )
    }

    return (
        <ScrollView>
            <TextInput
                placeholder='Search anything'
                style={{ borderWidth: 1, borderRadius: 5, margin: 5 }}
                onChangeText={(e) => searchHandler(e)}
                autoFocus={true}
            />
            {/* <View>
                {data?.map(val => val?.map(e => e?.map(item => (
                    <View>
                        {Object.entries(item).map(([key, val]) => {
                            return (
                                <Text>{key}, {val}</Text>
                            )
                        })}
                    </View>
                ))))}
            </View> */}
        </ScrollView>
    )
}
