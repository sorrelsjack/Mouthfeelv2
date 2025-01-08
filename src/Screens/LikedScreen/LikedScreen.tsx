import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GetFoodDetailsAction } from '../../Redux/Actions';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image
} from 'react-native';
import { FormatAsTitleCase, Routes } from '../../Common';
import { AttributeList, CircleButton, LoadingSpinner, FoodList, EmptyView, ErrorView } from '../../Components';
import { VotableAttribute, MouthfeelState, FoodDetails, ApiData } from '../../Redux/Models';
import { GetLikedFoodsAction } from '../../Redux/Actions';
import { useNavigation } from '@react-navigation/native';

interface LikedScreenProps {
    all: FoodDetails[],
    liked: ApiData<number[]>
}

const LikedScreen = (props: LikedScreenProps) => {
    const { all, liked } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(GetLikedFoodsAction());
    }, [])

    const NoDataView = () => {
        if (liked.error) return <ErrorView fullScreen onButtonPress={() => { dispatch(GetLikedFoodsAction()) }} onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        if (!liked.loading && !liked.data?.length) return <EmptyView fullScreen text='No Liked foods found' />
        return null;
    }

    return (
        <View style={styles.wrapper}>
            {liked.loading ? <LoadingSpinner fullScreen /> : (liked.data?.length) ? <View style={styles.container}><FoodList items={liked.data ? all.filter(f => f.sentiment === 1) : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        all: state.foods.all,
        liked: state.foods.liked
    }
})(LikedScreen);

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        height: '100%'
    },
    container: {
        alignItems: 'center', 
        marginTop: 10
    }
})