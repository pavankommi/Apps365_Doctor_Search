import React, { useState } from 'react'
import { Button, ToastAndroid, View } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker'
import smplText from './textExtractSample.json'

export default function CaptureImage() {

    const [uploadedPrescriptionFile, setUploadedPrescriptionFile] = useState({})
    const [prescriptionDate, setPrescriptiondate] = useState("")
    const [doctorName, setDoctorName] = useState("")

    const uploadFile = async () => {
        const res = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.images],
        })
        console.log("uploaded files")
        console.log(res)

        setPrescriptiondate("")
        setDoctorName("")

        const body = new FormData()
        body.append('image', res)

        const requestOptions = {
            body,
            method: 'POST',
            headers: {
                'X-Api-Key': 'd3pp/aTRgrDZzYpGWUO4qA==xCW3UqDKilgBGtX5',
            },
        }

        const extractText = await fetch("https://api.api-ninjas.com/v1/imagetotext", requestOptions)
        const result = await extractText.json()

        let word = "Dr."
        let extractedTextFromImage = result

        if (Array.isArray(extractedTextFromImage)) {
            let combineExtractedText = extractedTextFromImage.map(val => val.text)

            console.log("combineExtractedText", combineExtractedText)
            let includesDr = combineExtractedText.includes(word)
            let datesInRaw = JSON.stringify(combineExtractedText).match(/\d{2}([\/.-])\d{2}\1\d{4}/g)

            if (datesInRaw) {
                let pxDate = datesInRaw[0]
                let replaceSlash = pxDate.replace("/", "-").replace("/", "-")
                console.log("PX DATE: ", drName)
                setPrescriptiondate(replaceSlash)
            }

            if (includesDr) {
                let getIndexOfDr = combineExtractedText.indexOf(word)
                var drName = combineExtractedText.splice(getIndexOfDr, 3).join(" ")
                console.log("DOCTOR NAME: ", drName)
                setDoctorName(drName)
            }
        }

        console.log("prescriptionDate", "doctorName")
        console.log(prescriptionDate, doctorName)

        detailsExist()

    }

    const detailsExist = () => {
        if (prescriptionDate != "" || doctorName != "") {

            let drName = doctorName
            let pxDate = prescriptionDate.split("-").reverse().join("-")
            let uploadedfile = uploadedPrescriptionFile

            console.log("pxDate ", pxDate)

            const body = new FormData()
            body.append('document_type', 'image')
            body.append('title', drName)
            body.append('date', pxDate)
            body.append('file', uploadedfile)

            const requestOptions = {
                body,
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2UxYmJkMy1iZTcwLTRhYmMtOWE3MS0zZWNkMmJlNGY5MGIiLCJqdGkiOiI1NjBmOWU4YzFkZjdhOTVmMWU2MDIxZDEyN2QxMzFkM2FiMDAzMzNhZWQ1MmFkODZkOGUyZDI4Mzk5MzllOTU2N2EzMGRiYzU3YTNjYjNjYSIsImlhdCI6MTY3MjI5MjU5OC45MDY5OTMsIm5iZiI6MTY3MjI5MjU5OC45MDY5OTcsImV4cCI6MTcwMzgyODU5OC45MDA5OTQsInN1YiI6IjYwIiwic2NvcGVzIjpbXX0.qHFnpaiKK7JNWxSJ1ubnFtfovbuNGUprNucKD2-2i87Iho2n936H4mMdBrvPn9sPG6Pq3SyduP5H3lXIwyELJb_6VfeCnPjozSxqDtdnvNqMAWIWThBsbPjZFag6D40NpUR4f4Zw-L-1_1LoI3HqqamA3Yhe3RelWdgOzmVfv0wb2KxJLLsq_UgQVd53M0kLOWOir3nAIbLfbRox1VBMTBj5YpVq4l3XAoxUoYn__MbsBvQ_Zh-ehJAPWbOko-Zk8YxIASDWphbgsybZucJ13wAgUSxOKkgqj3SxY1gZcEJIjd-3EWmzpaOZKmm64AbeNp7evhVaaaNiZs-cj5gxA7bY7W37-skmsa3BNiUL2tKBzF0Rlwfx1toJP0jWE4xUDRhYlLOYg2Lpg5_-xwqNj_8KCRhZM6Jt3IekuFrDi54pgT5ApOo6sJm7_Rg23cfkSbhFi1Mtiw_J6AQxzvzesoWjs9FLfPDRtmdP0uP1UjqHWWU98TXSdZnzzDK5pPzZ-7AEbte0ECYbeamQpkjRWLo7ELbw2za88wRSXp_9IzjsO98A3YeGUwGJ3QW0NfRUf5fqKUx9IwNSZ5c6VmulvFMKmFTL5YxOlXSwPLGEfyZ8eytdnUIqpPy9wyoBnZojSzOa1gNfRUApQKAP7TAT9ofYg53ISGC0UCMTgKjc8YY',
                },
            }

            fetch('https://onehealthassist.com/api/v1/user/prescription-reports', requestOptions)
                .then(async (response) => await response.json())
                .then((data) => console.log(data))
                .then((data) => ToastAndroid.show("You have successfuly uploaded", ToastAndroid.SHORT))
                .then((data) => { setDoctorName(""), setPrescriptiondate("") })
                .catch(err => { console.log(err), setDoctorName(""), setPrescriptiondate("") })

        } else {
            console.log("-------------------open text i/p (doesn't have Dr. or Date)----------------------")
        }
    }


    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
                title='Upload file'
                onPress={uploadFile}
            />
        </View>
    )
}
