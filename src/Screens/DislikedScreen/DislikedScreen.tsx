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
import LottieView from 'lottie-react-native';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { VotableAttribute, MouthfeelState, FoodDetails, ApiData } from '../../Redux/Models';
import { GetDislikedFoodsAction } from '../../Redux/Actions';

interface DislikedScreenProps {
    disliked: ApiData<FoodDetails[]>
}

const DislikedScreen = (props: DislikedScreenProps) => {
    const { disliked } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetDislikedFoodsAction());
    }, [])

    const NoDataView = () => {
        if (disliked.error) return <ErrorView fullScreen text={disliked.error.Message} onButtonPress={() => { dispatch(GetDislikedFoodsAction()) }} />
        if (!disliked.loading && !disliked.data?.length) return <EmptyView fullScreen text='No Disliked foods found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {disliked.loading ? <LoadingSpinner fullScreen /> : disliked.data?.length ? <View style={{ alignItems: 'center' }}><FoodList items={disliked.data ? disliked.data : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        disliked: state.foods.disliked
    }
})(DislikedScreen);