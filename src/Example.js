import React from 'react'
import { Button, ToastAndroid, View } from 'react-native'
import splData from './Sample3.json'

export default function Example() {

    const makeCall = async () => {
        let arr = []
        const bodyData = splData
        arr.push(bodyData)
        const body2 = new FormData()
        body2.append('data', JSON.stringify(arr))
        // let loginData = await retrieveData(LOGIN_DETAILS);
        const requestOptions = {
            body: body2,
            method: 'POST',
            headers: {
                'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5N2UxYmJkMy1iZTcwLTRhYmMtOWE3MS0zZWNkMmJlNGY5MGIiLCJqdGkiOiJmY2IwNTg4YTdmMDUwMWVjNjRlNjk2YjkzZTVkZjBkYjgyNmQ0ZTFiZjU0MWU0M2Y3MTUxYTY2YWY0YjNlODlmNzA4ZDA3NDIzNTQ4NWI2MSIsImlhdCI6MTY3MjMwNzM5MS44OTE1OSwibmJmIjoxNjcyMzA3MzkxLjg5MTU5NiwiZXhwIjoxNzAzODQzMzkxLjg2NjQxNywic3ViIjoiNjAiLCJzY29wZXMiOltdfQ.KCTj-Kzth2TXkQhGCVCNfDXlkG58_Xv59G52gbxPOZUhUtrjeuIFJ18Ak45yPp83jSWZRbPd46j0VgqUI23W9n12zoWlxpISfudXJvQ5_fZchSSCoKDQlwjJ59g0HB5MZUZ7IQX5Z6l_MLZ0oKM9HHzccWJKu1N_4klK1OF6NwRJ3K4rUXDWHS8CzTdKucxnkL-ETtAitg46u4Ypv9OIQre_yiXom2SoNacBpbNe0BCfPtlyLW_at8rh1kcxz9r5y41xV49al5PW1Mijhwra6Fexq3znwgGI3kOZpbY98_1mN6-fflWJPuyxrQ9rP-4iqnqlRjzE3HiJZvi6GGooHjlb-EMtR61OjJGSpurvw6e6af0CWSygqhGg_vbfCm_JgqpUnN6GXi3we0J7RT-Twrufd8-hQOtADcN7rLEGH1fOK7LWP1uRJqnGlXewQ6tfQl3J37FTiqoDiJ98b4sHTaZvR9Mm5-cNJYNhcfkk1LtQfUEJaBFm2yQT5MoXgwVOcgTzG2hfN-kFcCy4B4QEQkc_2KPgCjoaYzudpZLGMwYUt3aW2V_RoaiJFXEDCD3UIAnHZHRifu9_1U1rlaWPduCmGeNHjIMbP8Y_WseYzCNOaXEsoVqvFqt0LiYnObVmKBakDFRiDG3MbTlnm3X3xXeXLUONcksjEDFNrYyt-S8`, // notice the Bearer before your token
            },
        }
        fetch('https://onehealthassist.com/api/v1/user/sendDocData', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            // .then((data) => setLoading(false))
            .then((data) => ToastAndroid.show("You have successfuly uploaded", ToastAndroid.SHORT))
            .catch(err => console.log(err))
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Button
                title='Call'
                onPress={makeCall}
            />
        </View>
    )
}
