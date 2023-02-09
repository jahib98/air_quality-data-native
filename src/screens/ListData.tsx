import React, { useContext } from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {DataContext} from '../context/DataContext';


// @ts-ignore
const ListData = ({ navigation }) => {
    const { data, loading } = useContext(DataContext);
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <><Text style={styles.titleText}>Air quality</Text><ScrollView>
            {data.map((item, index) => (
                <View key={index} style={styles.mainListItem}>
                    <Text
                        style={styles.listItems}
                        onPress={() => navigation.navigate('ListDataDetails', {id: item.sensorId})}
                    >
                        {item.sensorId}
                    </Text>
                </View>
            ))}
        </ScrollView></>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
    },
    mainListItem: {
        padding: 10,
        margin: 10,
        backgroundColor: '#6a96c9',
        borderRadius: 5,
        textAlign: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    listItems: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
    }
});
export default ListData;