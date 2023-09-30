import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GetFoodDetailsAction, GetRecommendedFoodsAction } from '../../Redux/Actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import { FormatAsTitleCase, Routes } from '../../Common';
import { AttributeList, CircleButton, LoadingSpinner, FoodList, ErrorView, EmptyView } from '../../Components';
import { VotableAttribute, MouthfeelState, FoodDetails, ApiData } from '../../Redux/Models';
import { useNavigation } from '@react-navigation/native';

interface RecommendedScreenProps {
    all: FoodDetails[],
    recommended: ApiData<number[]>
}

const RecommendedScreen = (props: RecommendedScreenProps) => {
    const { all, recommended } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(GetRecommendedFoodsAction());
    }, [])

    const NoDataView = () => {
        if (recommended.error) return <ErrorView fullScreen onButtonPress={() => { dispatch(GetRecommendedFoodsAction()) }} onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        if (!recommended.loading && !recommended.data?.length) return <EmptyView fullScreen text='No Recommended foods found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {recommended.loading ? <LoadingSpinner fullScreen /> : (recommended.data?.length) ? <View style={{ alignItems: 'center', marginTop: 10 }}><FoodList items={recommended.data ? all.filter(f => recommended.data?.includes(f.id)) : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        all: state.foods.all,
        recommended: state.foods.recommended
    }
})(RecommendedScreen);