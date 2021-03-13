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
import LottieView from 'lottie-react-native';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { VotableAttribute, MouthfeelState, FoodDetails } from '../../Redux/Models';
import { GetDislikedFoodsAction } from '../../Redux/Actions';

interface DislikedScreenProps {
    disliked: {
        data: FoodDetails[];
        loading: boolean;
    }
}

const DislikedScreen = (props: DislikedScreenProps) => {
    const { disliked } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetDislikedFoodsAction());
    }, [])

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {disliked.loading ? <LoadingSpinner fullScreen /> : disliked.data?.length ? <View style={{ alignItems: 'center' }}><FoodList items={disliked.data ? disliked.data : []} /></View> : null}
            {(!disliked.loading && !disliked.data?.length) && <EmptyView fullScreen text='No Disliked foods found' />}
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        disliked: state.foods.disliked
    }
})(DislikedScreen);