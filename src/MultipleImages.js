import React, { useRef, useState } from 'react'
import { ActivityIndicator, Button, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import userData from './NewSample.json'
import splData from './Sample3.json'

export default function MultipleImages() {

    //ashok's
    const extracttext_api_key1 = "JXov3YhSVHYaNka8FB5jZtgbNcdgyt6xcwc7pB5N"

    //revanth's
    const extracttext_api_key2 = "FUNBLQ5nw3eUXTmY4iABqfvCfQxaxiIvuFkOwcYa"

    const [photoFile, setPhotoFile] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    const responses = []
    const finalOp = []

    let api_key = "ZySdOgDj4nPlDo4KrVVG2wf3TGWubleM6BE2iMq1"

    let val = [{
        "11/08/2022 02:39 PM": "11/08/2022 02:39 PM",
        "Registered on:": "Registered on:",
        "undefined": undefined
    }, {
        "11/08/2022 02:39 PM": "11/08/2022 02:57 PM",
        "Registered on:": "Collected on:",
        "undefined": undefined
    }, {
        "11/08/2022 02:39 PM": "11/08/2022 02:57 PM",
        "Registered on:": "Received on:",
        "undefined": undefined
    }, {
        "11/08/2022 02:39 PM": "11/08/2022 06:39 PM",
        "Registered on:": "Reported on:",
        "undefined": undefined
    }]

    let string1 = JSON.stringify(val)
    var res = string1.match(/\d{2}([\/.-])\d{2}\1\d{4}/g);

    var resExamp = ["11/08/2022", "12/08/2022", "13/08/2022", "11/08/2023", "01/08/2022", "19/08/2022", "30/08/2022", "11/08/2020"]

    let sortedArr = resExamp.sort(function (a, b) {
        var aa = a.split('/').reverse().join(),
            bb = b.split('/').reverse().join();
        return aa < bb ? -1 : (aa > bb ? 1 : 0);
    });

    // console.log("|")
    // console.log("|")
    // console.log("V")
    // console.log(sortedArr.reverse())

    const uploadPhoto = async () => {
        setIsLoading(true)
        // const res = await DocumentPicker.pickMultiple({
        //     type: [DocumentPicker.types.allFiles],
        // })
        // console.log("uploaded files")
        // console.log(res)
        // console.log(res.length)

        // await Promise.all(
        //     res.map(async (id, index) => {
        //         const fileToUpload = res[index]
        //         console.log(res[index])
        //         const body = new FormData()
        //         body.append('dup_check', false)
        //         body.append('input', fileToUpload)
        //         const requestOptions = {
        //             body,
        //             method: 'POST',
        //             headers: {
        //                 'x-api-key': 'kZWlhErdWfNOkmH7QMKHcSxwRbbggdDDHFQIx5Qg',
        //                 'Content-Type': 'multipart/form-data'
        //             },
        //         }
        //         const response = await fetch('https://trigger.extracttable.com', requestOptions)
        //         const table = await response.json()
        //         responses.push(table)
        //         console.log("table")
        //         console.log(table)
        //     })
        // )

        // let rawText = JSON.stringify(responses)
        // var datesInRawText = rawText.match(/\d{2}([\/.-])\d{2}\1\d{4}/g)

        // let sortedArr = datesInRawText.sort(function (a, b) {
        //     var aa = a.split('/').reverse().join(),
        //         bb = b.split('/').reverse().join();
        //     return aa < bb ? -1 : (aa > bb ? 1 : 0);
        // }).reverse()

        // console.log("datesInRawText")
        // console.log("|")
        // console.log("|")
        // console.log("V")
        // console.log(sortedArr)

        // const repDate = sortedArr[0]

        // if (sortedArr.length != 0) {
        //     for (var i = 0; i < responses?.length; i++) {
        //         const stringify = JSON.stringify(responses[i])

        //         for (var j = 0; j < JSON.parse(stringify).Tables?.length; j++) {
        //             const tableData = JSON.parse(stringify)?.Tables[j]?.TableJson
        //             console.log(tableData)
        //             var myData = Object.keys(tableData).map(key => {
        //                 return tableData[key];
        //             })
        //             const properties = Object.values(myData[0])
        //             const formattedObj = myData.map(item => (
        //                 {
        //                     [properties[0]]: item[`${0}`],
        //                     [properties[1]]: item[`${1}`],
        //                     [properties[2]]: item[`${2}`],
        //                     [properties[3]]: item[`${3}`],
        //                     [properties[4]]: item[`${4}`],
        //                     [properties[5]]: item[`${5}`],
        //                     [properties[6]]: item[`${6}`]
        //                 }
        //             ))
        //             let obj1 = {}
        //             obj1.path = "file://filePath"
        //             obj1.data = formattedObj
        //             obj1.reportDate = repDate
        //             console.log("formattedObj")
        //             console.log(JSON.stringify(obj1))
        //             finalOp.push(obj1)
        //         }
        //     }

        //     setIsLoading(false)
        //     console.log("responses")
        //     console.log(responses)
        //     console.log("finalOp")
        //     console.log(finalOp)

        //     // const finalOp = userData

        //     const filteredKeys = finalOp.filter(e => console.log(Object.keys(e.data[0] || {})))
        //     // const filteredKeys = finalOp.map(e => e?.data?.filter(item => Object.keys(item).length > 3))
        //     // console.log("filteredKeys----")
        //     // console.log(JSON.stringify(filteredKeys))

        // if (finalOp != []) {
        let arr = []
        let bodyData = splData
        arr.push(bodyData)
        console.log("bodyData")
        console.log(bodyData)
        const body = new FormData()
        body.append('data', JSON.stringify(arr))
        // console.log(body)
        const requestOptions = {
            body: body,
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2UxYmJkMy1iZTcwLTRhYmMtOWE3MS0zZWNkMmJlNGY5MGIiLCJqdGkiOiI1NjBmOWU4YzFkZjdhOTVmMWU2MDIxZDEyN2QxMzFkM2FiMDAzMzNhZWQ1MmFkODZkOGUyZDI4Mzk5MzllOTU2N2EzMGRiYzU3YTNjYjNjYSIsImlhdCI6MTY3MjI5MjU5OC45MDY5OTMsIm5iZiI6MTY3MjI5MjU5OC45MDY5OTcsImV4cCI6MTcwMzgyODU5OC45MDA5OTQsInN1YiI6IjYwIiwic2NvcGVzIjpbXX0.qHFnpaiKK7JNWxSJ1ubnFtfovbuNGUprNucKD2-2i87Iho2n936H4mMdBrvPn9sPG6Pq3SyduP5H3lXIwyELJb_6VfeCnPjozSxqDtdnvNqMAWIWThBsbPjZFag6D40NpUR4f4Zw-L-1_1LoI3HqqamA3Yhe3RelWdgOzmVfv0wb2KxJLLsq_UgQVd53M0kLOWOir3nAIbLfbRox1VBMTBj5YpVq4l3XAoxUoYn__MbsBvQ_Zh-ehJAPWbOko-Zk8YxIASDWphbgsybZucJ13wAgUSxOKkgqj3SxY1gZcEJIjd-3EWmzpaOZKmm64AbeNp7evhVaaaNiZs-cj5gxA7bY7W37-skmsa3BNiUL2tKBzF0Rlwfx1toJP0jWE4xUDRhYlLOYg2Lpg5_-xwqNj_8KCRhZM6Jt3IekuFrDi54pgT5ApOo6sJm7_Rg23cfkSbhFi1Mtiw_J6AQxzvzesoWjs9FLfPDRtmdP0uP1UjqHWWU98TXSdZnzzDK5pPzZ-7AEbte0ECYbeamQpkjRWLo7ELbw2za88wRSXp_9IzjsO98A3YeGUwGJ3QW0NfRUf5fqKUx9IwNSZ5c6VmulvFMKmFTL5YxOlXSwPLGEfyZ8eytdnUIqpPy9wyoBnZojSzOa1gNfRUApQKAP7TAT9ofYg53ISGC0UCMTgKjc8YY',
                // 'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            },
        }
        fetch('https://onehealthassist.com/api/v1/user/sendDocData', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch(err => console.log(err))

        // fetch('https://onehealthassist.com/api/v1/user/sendDocData', requestOptions)
        //     .then(async response => {
        //         try {
        //             const data = await response.json()
        //             console.log('response data?', data)
        //         } catch (error) {
        //             console.log('Error happened here!')
        //             console.error(error)
        //         }
        //     })
        //     .then((data) => console.log(data))
        //     .catch(err => console.log(err))

        // }
        // }
        setIsLoading(false)
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {isLoading ? <ActivityIndicator /> :
                <Button
                    title='Upload photo'
                    // onPress={uploadPhoto}
                    onPress={() => setModalVisible(true)}
                />}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ display: "flex", justifyContent: "flex-end", flex: 1, marginBottom: 16 }}>
                    <View style={{ width: "91%", height: 148, backgroundColor: "#fff", borderRadius: 8, alignSelf: "center" }}>
                        <View >
                            <TouchableOpacity
                                style={{ alignItems: "center", justifyContent: "center", height: 148 / 2 }}
                                onPress={() => console.log("Open camera")}
                            >
                                <Text style={{ color: "#484848", fontSize: 20, fontWeight: "600" }}>Take Photo</Text>
                            </TouchableOpacity>
                            <View style={{ borderBottomWidth: 1, borderColor: "#e4e4e5" }} />
                            <TouchableOpacity
                                style={{ alignItems: "center", justifyContent: "center", height: 148 / 2 }}
                                onPress={uploadPhoto}
                            >
                                <Text style={{ color: "#484848", fontSize: 20, fontWeight: "600" }}>Choose from Library</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                        style={{ width: "91%", height: 60, backgroundColor: "#4D4D4D", marginTop: 16, borderRadius: 8, alignSelf: "center", alignItems: "center", justifyContent: "center" }}
                    >
                        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </View>
    )
}
