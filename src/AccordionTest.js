import React, { useState } from 'react'
import { Button, View, Text } from 'react-native'
import Collapsible from 'react-native-collapsible';

export default function AccordionTest() {

    const [showTable, setShowTable] = useState(true)

    return (
        <View style={{ backgroundColor: "white" }}>
            <Button
                title='Open/Close'
                onPress={() => setShowTable(!showTable)}
            />
            <Collapsible collapsed={showTable}>
                <View style={{ height: 400, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "black" }}>Hello......</Text>
                </View>
            </Collapsible>
        </View>
    )
}
