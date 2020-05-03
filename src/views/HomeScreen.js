import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Container,
    Row,
    Header, Toast, List, ListItem, Thumbnail, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Item, Input
} from 'native-base';
import { WEB, IMAGE_WEB, LANGUAGE, API_KEY } from "../const"


function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [list, setList] = useState([]);
    const [search, setSearch] = useState(true);
    const [pagesNumber, setPagesNumber] = useState(1);

    const doGet = (inNewSearch, inPageNumber) => {

        setSearch(inNewSearch);
        setLoading(inNewSearch);

        console.log(searchText)
        fetch(WEB + API_KEY + LANGUAGE + '&query=' + searchText + '&page=' + inPageNumber + '&include_adult=false')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setData(json.results)
                setPagesNumber(json.total_pages)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    }

    // const goToDetailsView = () => {

    // }

    // const showToast = (text) => {
    //     () => Toast.show({
    //         text: { text },
    //         buttonText: "Okay",
    //         duration: 3000
    //     })
    // }

    useEffect(() => {
        var inNewList = data.map(element => (
            <ListItem thumbnail key={element.id}>
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
                    <Button transparent
                        onPress={() => navigation.navigate('Details', {
                            movieId: element.id
                        })}>
                        <Text>View</Text>
                    </Button>
                </Right>
            </ListItem>
        ))

        if (search) {
            setList(inNewList)
        } else {
            setList([...list, ...inNewList])
            setPagesNumber(pagesNumber - 1)
        }

    }, [data])

    return (
        <Container>
            {/* <Header>
                <Item>
                <Input placeholder='Find your movie' />
                <Icon active name='search' />
                </Item>
            </Header> */}
            <Content>
                <Item>
                    <Input
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholder='Find your movie'
                    />
                    <Icon
                        active
                        name='search'
                        onPress={() => {
                            searchText === "" ? null : doGet(true, 1)
                        }}
                    />
                </Item>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
                    <List>
                        {list}
                        {(list.length !== 0 && pagesNumber !== 1) ?
                            <ListItem thumbnail key={999999}>
                                <Body>
                                    <Button onPress={() => doGet(false, pagesNumber)}>
                                        <Text>Load more movie</Text>
                                    </Button>
                                </Body>
                            </ListItem> : null}
                    </List>}
            </Content>
        </Container>

    );
}

export default HomeScreen