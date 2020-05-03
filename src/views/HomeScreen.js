import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details',
                    {
                        itemId: 106,
                        otherParam: 'anything you want here',
                    })}
            />
        </View>
    );
}

export default HomeScreen