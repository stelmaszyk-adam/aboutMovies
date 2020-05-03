import React, { useEffect, useState } from 'react';
// import { Button, ActivityIndicator, FlatList, Text, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Container,
    Row,
    Header, Title, List, ListItem, Thumbnail, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input
} from 'native-base';
import { WEB, IMAGE_WEB } from "../const"


function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(WEB + 'language=en-US&query=a&page=1&include_adult=false')
            .then((response) => response.json())
            .then((json) => setData(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const list = (data.map(element => (
        <ListItem thumbnail>
            <Left>
                <Thumbnail square source={{ uri: IMAGE_WEB + element.poster_path }} />
            </Left>
            <Body>
                <Text>{element.title}</Text>
                <Row style={{ alignItems: "center" }}>
                    <Icon active name="star" />
                    <Text note numberOfLines={1}> {element.popularity}</Text>
                </Row>
                <Row style={{ alignItems: "center" }}>
                    <Text note numberOfLines={1}>Vote: </Text>
                    <Text note numberOfLines={1}>{element.vote_count}</Text>
                </Row>
            </Body>
            <Right>
                <Button transparent>
                    <Text>View</Text>
                </Button>
            </Right>
        </ListItem>
    )))

    return (
        <Container>
            <Content>
                <Item>
                    <Input placeholder='Find your movie' />
                    <Icon active name='search' />
                </Item>
                <List>
                    {list}
                </List>
            </Content>
            <Footer>
                <FooterTab>
                    <Button full>
                        <Text>Footer</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>

    );
}

export default HomeScreen