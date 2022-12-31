import React, { useState } from 'react'
import { Button, TextInput, View } from 'react-native'
import validator from 'validator' //install this library ---> npm i validator

export default function UrlValidation() {

    const [urlText, setUrlText] = useState('')

    const validateUrl = () => {
        if (validator.isURL(urlText)) {
            console.log('Is Valid URL')
        } else {
            console.log('Is Not Valid URL')
        }
    }

    return (
        <View>
            <TextInput
                placeholder='Enter Url'
                onChangeText={(txt) => setUrlText(txt)}
            />
            <Button
                title='Validate URL'
                onPress={validateUrl}
            />
        </View>
    )
}
