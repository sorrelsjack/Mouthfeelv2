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
import { AttributeList, CircleButton, LoadingSpinner, FoodList, EmptyView } from '../../Components';
import { VotableAttribute, MouthfeelState, FoodDetails } from '../../Redux/Models';
import { GetLikedFoodsAction } from '../../Redux/Actions';

interface LikedScreenProps {
    liked: {
        data: FoodDetails[];
        loading: boolean;
    }
}

const LikedScreen = (props: LikedScreenProps) => {
    const { liked } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetLikedFoodsAction());
    }, [])

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {liked.loading ? <LoadingSpinner fullScreen /> : liked.data?.length ? <View style={{ alignItems: 'center' }}><FoodList items={liked.data ? liked.data : []} /></View> : null}
            {(!liked.loading && !liked.data?.length) && <EmptyView fullScreen text='No Liked foods found' />}
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        liked: state.foods.liked
    }
})(LikedScreen);