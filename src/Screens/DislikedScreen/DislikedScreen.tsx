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
import LottieView from 'lottie-react-native';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { VotableAttribute, MouthfeelState, FoodDetails, ApiData } from '../../Redux/Models';
import { GetDislikedFoodsAction } from '../../Redux/Actions';
import { useNavigation } from '@react-navigation/native';

interface DislikedScreenProps {
    all: FoodDetails[],
    disliked: ApiData<number[]>
}

const DislikedScreen = (props: DislikedScreenProps) => {
    const { all, disliked } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(GetDislikedFoodsAction());
    }, [])

    const NoDataView = () => {
        if (disliked.error) return <ErrorView fullScreen onButtonPress={() => { dispatch(GetDislikedFoodsAction()) }} onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        if (!disliked.loading && !disliked.data?.length) return <EmptyView fullScreen text='No Disliked foods found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {disliked.loading ? <LoadingSpinner fullScreen /> : disliked.data?.length ? <View style={{ alignItems: 'center' }}><FoodList items={disliked.data ? all.filter(f => f.sentiment === - 1) : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        all: state.foods.all,
        disliked: state.foods.disliked
    }
})(DislikedScreen);