import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import {
    Container,
    Row,
    List,
    ListItem,
    Thumbnail,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Item,
    Input
} from 'native-base';
import { WEB, IMAGE_WEB, LANGUAGE, API_KEY } from "../const"

function HomeScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [list, setList] = useState([]);
    const [search, setSearch] = useState(true);
    const [pagesNumber, setPagesNumber] = useState(1);
    const [textForUser, setTextForUser] = useState("");

    const doGet = (inNewSearch, inPageNumber) => {

        setSearch(inNewSearch);
        setLoading(inNewSearch);
        setTextForUser("");

        fetch(WEB + API_KEY + LANGUAGE + '&query=' + searchText + '&page=' + inPageNumber + '&include_adult=false')
            .then((response) => response.json())
            .then((json) => {
                setData(json.results)
                setPagesNumber(json.total_pages)
                setTextForUser("Currently your movie is not available")
            })
            .catch((error) => {
                setData([])
                setList([])
                setPagesNumber(1)
                setTextForUser("Problem with internet connection")
                // console.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }

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
                        <Text note numberOfLines={1}>Votes: </Text>
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
        <Container style={{ padding: 10 }}>
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
                    <View >
                        {list.length === 0 ?
                            <Text
                                style={{
                                    marginTop: 20,
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    color: "red"
                                }}>
                                {textForUser}
                            </Text>
                            :
                            <List>
                                {list}
                                {(list.length !== 0 && pagesNumber !== 1) ?
                                    <ListItem thumbnail key={999999}>
                                        <Body>
                                            <Button
                                                onPress={() => doGet(false, pagesNumber)}
                                            >
                                                <Text>Load more movies</Text>
                                            </Button>
                                        </Body>
                                    </ListItem> : null}
                            </List>}
                    </View>}
            </Content>
        </Container>
    );
}

export default HomeScreen