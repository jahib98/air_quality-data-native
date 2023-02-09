import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {DataContext} from "../context/DataContext";
import { Select } from "native-base";
import {AirData} from "../config";


// @ts-ignore
const ListDataDetails = ({ navigation, route }) => {
    const [selectedValue, setSelectedValue] = useState("pm10");
    const { data, loading } = useContext(DataContext);
    const [sensor, setSensor] = useState<AirData | undefined>();
    const [averageLast12Hours, setAverageLast12Hours] = useState<number | undefined>();
    const [average24Hours, setAverage24Hours] = useState<number | undefined>();
    const { id } = route.params;

    useEffect(() => {
        if (!loading) {
            const sensor = data.find((item: AirData) => item.sensorId === id);
            setSensor(sensor);
            filterBasedOnType(selectedValue);
        }
    }, [id, data]);

const filterBasedOnType = (type: string) => {
    const filteredData = data.filter((item: AirData) => item.type === type && item.sensorId === id);
    const currentTime = new Date();
    const twelveHoursAgo = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000);
    let sum12 = 0;
    let sum24 = 0;
    filteredData.forEach((item: AirData) => {
        const itemDate = new Date(item.stamp);
        if (itemDate > twelveHoursAgo) {
            sum12 += parseInt(item.value);
        }});

    filteredData.forEach((item: AirData) => {
        sum24 += parseInt(item.value);
    });
    sum12 = sum12 / filteredData?.length
    sum24 = sum24 / filteredData?.length
    setAverageLast12Hours(sum12);
    setAverage24Hours(sum24);
}

    const handleChange = (value: string) => {
        setSelectedValue(value);
        filterBasedOnType(value);
    };

    return (
        <View style={styles.viewContainer}>
            <Text style={styles.detailsTitle}>{id}</Text>
            <>
                <Select
                    selectedValue={selectedValue}
                    onValueChange={handleChange}
                    minWidth={200}
                    accessibilityLabel='Choose Type'>
                    <Select.Item label="PM10" value="pm10" />
                    <Select.Item label="PM2.5" value="pm25" />
                </Select>
            </>
            <View style={styles.viewDetails}>
            {averageLast12Hours && average24Hours ?
                <>
                    <Text style={styles.detailsText}>Average last 12 hours is : {averageLast12Hours?.toFixed(3)}</Text>
                    <Text style={styles.detailsText}>Average last 24 hours is : {average24Hours?.toFixed(3)}</Text></>
                :
                <Text>No data found</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    detailsTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6a96c9',
        paddingBottom: 25,
    },
    viewContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
    },
    viewDetails: {
        marginTop: 50,
        backgroundColor: '#6a96c9',
        padding: 15,
        borderRadius: 5,
    },
    detailsText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
        marginVertical: 5,
    }
});

export default ListDataDetails;
