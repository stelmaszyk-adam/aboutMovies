import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import {
    Container,
    Row,
    Header,
    Col,
    Text,
    Item
} from 'native-base'
import { API_KEY, MOVIE_WEB, LANGUAGE, IMAGE_WEB } from "../const/index"

function DetailsScreen({ navigation, route }) {
    const { movieId } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [productionCountries, setProductionCountries] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetch(MOVIE_WEB + movieId + API_KEY + LANGUAGE)
            .then((response) => response.json())
            .then((json) => {
                setData(json)
                setProductionCountries(json.production_countries)
                setGenres(json.genres)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
            });
    }, [])
    return (
        <Container>
            <Row size={40} style={{ alignItems: "center", justifyContent: "center" }}>
                <Image resizeMethod='resize' source={{ uri: IMAGE_WEB + data.poster_path }} style={{ width: 200, height: 200, margin: 20 }} />
            </Row>
            <Row size={60}>
                <Col>
                    <Row style={{ flex: 1 }}>
                        <Col>
                            <Text >Title: </Text>
                            <Text >{data.title}</Text>
                        </Col>
                    </Row>
                    <Row style={{ flex: 1 }}>
                        <Col>
                            <Row>
                                <Text >Popularity: </Text>
                                <Text>{data.popularity}</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Text >Votes: </Text>
                                <Text>{data.vote_count}</Text>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ flex: 1 }}>
                        <Col>
                            <Text >Production Countries: </Text>
                            <Row>
                                {productionCountries.map(element =>
                                    <Text>{element.name} </Text>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ flex: 1 }}>
                        <Col>
                            <Text>Genres: </Text>
                            <Row>
                                {genres.map(element =>
                                    <Text>{element.name} </Text>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ flex: 5 }}>
                        <Text >{data.overview}</Text>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailsScreen;