import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import {
    Container,
    Row,
    Col,
    Text,
} from 'native-base'
import { API_KEY, MOVIE_WEB, LANGUAGE, IMAGE_WEB } from "../const/index"

function DetailsScreen({ navigation, route }) {
    const { movieId } = route.params;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [productionCountries, setProductionCountries] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        setLoading(true)
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
        <Container style={{ padding: 10 }}>
            {isLoading ?
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} /> :
                <Container>
                    <Row
                        size={40}
                        style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image
                            resizeMethod='resize'
                            source={{ uri: IMAGE_WEB + data.poster_path }}
                            style={{ width: 200, height: 200, margin: 20 }} />
                    </Row>
                    <Row size={60}>
                        <Col>
                            <Row>
                                <Col style={styles.columnStyle}>
                                    <Text >Title: </Text>
                                    <Text >{data.title}</Text>
                                </Col>
                            </Row>
                            <Row style={styles.rowStyle, { paddingTop: 5 }}>
                                <Col style={styles.columnStyle}>
                                    <Row>
                                        <Text >Popularity: </Text>
                                        <Text>{data.popularity}</Text>
                                    </Row>
                                </Col>
                                <Col style={styles.columnStyle}>
                                    <Row>
                                        <Text >Votes: </Text>
                                        <Text>{data.vote_count}</Text>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={styles.columnStyle}>
                                <Col >
                                    <Text >Production Countries: </Text>
                                        <Row>
                                            {productionCountries.map(element =>
                                                <Text>{element.name} </Text>
                                            )}
                                        </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <Text>Genres: </Text>
                                    <Row>
                                        <ScrollView>
                                            {genres.map(element =>
                                                <Text>{element.name} </Text>
                                            )}
                                        </ScrollView>
                                    </Row>
                                </Col>
                            </Row>
                            <Row style={{ flex: 4, paddingTop: 10, }}>
                                <Col>
                                    <Text >Description: </Text>
                                    <ScrollView>
                                        <Text >{data.overview}</Text>
                                    </ScrollView>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            }
        </Container>
    );
}

export default DetailsScreen;

const styles = StyleSheet.create({
    columnStyle: {
        paddingBottom: 5,
    }
})