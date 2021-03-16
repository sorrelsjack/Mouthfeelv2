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
import { FormatAsTitleCase } from '../../Common';
import { AttributeList, CircleButton, LoadingSpinner, FoodList, EmptyView, ErrorView } from '../../Components';
import { VotableAttribute, MouthfeelState, FoodDetails, ApiData } from '../../Redux/Models';
import { GetLikedFoodsAction } from '../../Redux/Actions';

interface LikedScreenProps {
    liked: ApiData<FoodDetails[]>
}

const LikedScreen = (props: LikedScreenProps) => {
    const { liked } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetLikedFoodsAction());
    }, [])

    const NoDataView = () => {
        if (liked.error) return <ErrorView fullScreen text={liked.error.Message} onButtonPress={() => { dispatch(GetLikedFoodsAction()) }} />
        if (!liked.loading && !liked.data?.length) return <EmptyView fullScreen text='No Liked foods found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {liked.loading ? <LoadingSpinner fullScreen /> : (liked.data?.length) ? <View style={{ alignItems: 'center' }}><FoodList items={liked.data ? liked.data : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        liked: state.foods.liked
    }
})(LikedScreen);