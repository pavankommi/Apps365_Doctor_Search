import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/dist/Entypo';

export default function Home() {

    // setData(sampleData)
    console.log(data)

    const [searchString, setSearchString] = useState('')
    const [filterData, setFilterData] = useState([])
    const [data, setData] = useState([])

    const [showTable, setShowTable] = useState(true)

    const [reportDates, setReportdates] = useState([])

    const headings = []
    const [body, setBody] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://onehealthassist.com/api/v1/user/getDocData', {
                method: 'POST'
                // headers: {
                //     'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2UxYmJkMy1iZTcwLTRhYmMtOWE3MS0zZWNkMmJlNGY5MGIiLCJqdGkiOiJkN2QyNDljMzFlOWRhOWQ1ZGIyMzI0NWE2OTk0YjlmYjM1NjkyYjlmYTI3ZmY2NWZlNWQyYTQ0NmI0OTFhNzJiYjY1N2YzZWI5Y2Q4YjczMyIsImlhdCI6MTY3MjQ3NTQzNy40ODgwNDksIm5iZiI6MTY3MjQ3NTQzNy40ODgwNTUsImV4cCI6MTcwNDAxMTQzNy40NzgxLCJzdWIiOiI3OSIsInNjb3BlcyI6W119.SakNNGQfoBVOS4HrRmKsx4Mi5v-uO9qQK7FyB_LAZ6NTH-2BrxPd2mZpUq9H-47eisZtkgIL33smN_pXExMLXgrm-TAokDyj3IYj_SepXysTYS-HqxGug9OE19vMRU_FOGFP-mKVBIYMDiLHdG8kA1U01XjKkokWbaXPSdrXlqRSAy5WdsvZjLqTyQE7AfaDOigK_YnbR6qtkLtwpcRTfMMIP3lwijvmJHV9dA5yPFUn-bWa_i2cJ4ysGsNOh8Uf3ublNxofVrcCiIl8dadXNzgIzg04NaND5nW516gPFHaLVgj1HKT5aLU_39TQ9tPxmAbnMcZeA0EA71tJxWqUmiUi938lOh1xoyL5zZscL6f3-g6pzbfQ0ji5Pv-thextORZsE2-gF9eiIDlQvj8cUXNKZf6IqXCdhj3fQTS4xE2tXdGzycvOuzwUj6Uf7RohmSwqg3xT3BjfgSfUjs057pWM-DUU6KJ2d-WIi2ulPFi7LtNAfYmGA8_kOec57fMD2JPPX6xFqw8rbQi8fvS7DmQDmmxMN2b5vogNiSSEGjfkqM1JfBYtkmQw47SwuHi-V5n4fLmKpa3AA2p0CcDQXu7HJaiU4Z8fGmTVEZDGGqk6TRkfA_2A0zNBw_pWNmYYC9qdkWQdkw49hLra3Q12WQymcpx-gPPxuSh9vfMsNIg`, // notice the Bearer before your token
                // },
            });
            const data = await response.json()
            const respData = data?.data?.allData
            respData.map(e => e.map(f => f?.data?.shift()))
            console.log("------------------------response data------------------------")
            // console.log(JSON.stringify(respData.map(e => e.map(f => f.data.map(g => Object.values(g).map(h => h.split('method')[0]))))))
            console.log(JSON.stringify(respData))

            setData(respData)
        }
        // console.log("data")
        // console.log(data.map(e => e.map(f => f.reportDate))[0])
        fetchData()
    }, [])

    const searchHandler = (toSearch) => {
        setSearchString(toSearch)
        if (toSearch.length < 3) {
            setFilterData([])
        }
        if (toSearch.length > 2) {
            if (toSearch.toLowerCase() == "cbc" || toSearch.toLowerCase() == "blood count" || toSearch.toLowerCase() == "complete blood count") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /RED BLOOD|HEMOGLOBIN|HEMATOCRIT|MEAN CORPUSCULAR|RED CELL|PLATELET|WHITE BLOOD/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "wbc differential count" || toSearch.toLowerCase() == "wbc diff" || toSearch.toLowerCase() == "wbc") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /SEGMENTED NEUTROPHILS|EOSINOPHILS|LYMPHOCYTES|MONOCYTES|BASOPHILS|WHITE BLOOD/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "urinalysis" || toSearch.toLowerCase() == "urin" || toSearch.toLowerCase() == "urine") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /COLOR|APPEARANCE|SPECIFIC GRAVITY|GLUCOSE|PROTEIN|KETONES|BILIRUBIN|UROBILINOGEN|NITRITE|EPITHELIAL CELLS|CASTS|CRYSTALS|BACTERIA/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "diabetes" || toSearch.toLowerCase() == "cardiac risk" || toSearch.toLowerCase() == "cardiac") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /FASTING BLOOD GLUCOSE|PLASMA|TRIGLYCERIDES|CHOLESTEROL|HDL CHOLESTEROL|DIRECT LDL CHOLESTEROL|NON HDL CHOLESTEROL|CHOL|HDL RATIO|LDL RATIO|VERY LOW DENSITY LIPOPROTEIN/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "kidney" || toSearch.toLowerCase() == "kidney profile" || toSearch.toLowerCase() == "kidney ") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /BLOOD UREA NITROGEN|CREATININE|URIC ACID/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "liver" || toSearch.toLowerCase() == "liver profile" || toSearch.toLowerCase() == "liver ") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /BILIRUBIN TOTAL|BILIRUBIN|ALANINE AMINOTRANSFERASE|ASPARTATE AMINOTRANSFERASE/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "thyro check" || toSearch.toLowerCase() == "thyro" || toSearch.toLowerCase() == "thyro ") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /T3|T4|TSH 3RD GENERATION/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "hepatitis b" || toSearch.toLowerCase() == "hepatitis" || toSearch.toLowerCase() == "hepatitis b surface antigen") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /HEPATITIS B SURFACE ANTIGEN|PATIENT VALUE/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else if (toSearch.toLowerCase() == "electrolytes" || toSearch.toLowerCase() == "electrolyte" || toSearch.toLowerCase() == "electrolytes ") {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => /SODIUM|POTASSIUM|CHLORIDE/i.test(JSON.stringify(g)))))
                setFilterData(fltrDta)
            } else {
                let removedExtra = data.map(e => e?.map(f => f?.data?.filter(g => Object.keys(g)?.length > 3))).map(f => f.filter(e => e?.length))
                const fltrDta = removedExtra.map(e => e.map(f => f.filter(g => JSON.stringify(g).toLowerCase().includes(toSearch.toLowerCase()))))
                setFilterData(fltrDta)
            }
        }
    }

    if (data == []) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        )
    }

    return (
        <ScrollView style={{ backgroundColor: "white" }}>

            {/* SearchBar */}
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 5, margin: 5, borderColor: "#CA8A66", justifyContent: "space-between" }}>
                <View style={{ width: "90%" }}>
                    <TextInput
                        placeholder='Search anything'
                        style={{ paddingLeft: 10, color: "#000", flex: 1 }}
                        placeholderTextColor="#8F8F8F"
                        onChangeText={(e) => searchHandler(e)}
                        autoFocus={true}
                        value={searchString}
                    />
                </View>
                <TouchableOpacity
                    style={{ paddingRight: "2%" }}
                    onPress={() => setSearchString("")}
                >
                    <Icon name="cross" size={25} color="#8F8F8F" />
                </TouchableOpacity>
            </View>

            {/* Tables */}
            {searchString == "" ? <View></View> :
                <View>
                    {
                        filterData.map((val) => (val.map((item, index) => (
                            <ScrollView style={{ margin: 5 }}>
                                {Object.keys(item[0] || {}).length > 3 ? <View>

                                    {/* Date row */}
                                    <TouchableOpacity
                                        style={{ borderWidth: 1, borderColor: "#CA8A66", justifyContent: "center", marginBottom: 5, height: 25 }}
                                        onPress={() => setShowTable(!showTable)}
                                    >
                                        <Text style={{ color: "black", fontWeight: "bold", paddingLeft: 7 }}>{data.map(e => e.map(f => f.reportDate))[0][index]}</Text>
                                    </TouchableOpacity>

                                    {/* Table */}
                                    <Collapsible collapsed={showTable}>
                                        <Table borderStyle={{ borderWidth: 1, borderColor: '#CA8A66' }}>

                                            <Row
                                                data={filterData.length == 0 ? [] : Object.keys(item[0] || {})}
                                                // style={{ backgroundColor: "red" }}
                                                textStyle={{ fontWeight: 'bold', color: "#000", textAlign: 'center' }}
                                            />

                                            {item.map((e, index) => (
                                                <Rows
                                                    data={Object.values(e).map(f => f.split('METHOD')[0])[0] == "" ? [] : [Object.values(e).map(f => f.split('METHOD')[0])]}
                                                    textStyle={{ color: "#000", textAlign: 'center' }}
                                                />
                                            ))}

                                        </Table>
                                    </Collapsible>
                                </View> : <View style={{ height: 0 }}></View>}
                            </ScrollView>
                        ))))
                    }
                </View>
            }

        </ScrollView>
    )
}
