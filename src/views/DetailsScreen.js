import * as React from 'react';
import { Button, View, Text } from 'react-native';

function DetailsScreen({ navigation, route }) {

    const { itemId } = route.params;
    const { otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {itemId}</Text>
            <Text>otherParam: {otherParam}</Text>

            <Text>Details Screen</Text>
        </View>
    );
}

export default DetailsScreen;