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
import { GetFoodsToTryAction } from '../../Redux/Actions';
import { useNavigation } from '@react-navigation/native';

interface ToTryScreenProps {
    all: FoodDetails[];
    toTry: ApiData<FoodDetails[]>;
}

const ToTryScreen = (props: ToTryScreenProps) => {
    const { all, toTry } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(GetFoodsToTryAction());
    }, [])

    const NoDataView = () => {
        if (toTry.error) return <ErrorView fullScreen onButtonPress={() => { dispatch(GetFoodsToTryAction()) }} onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        if (!toTry.loading && !toTry.data?.length) return <EmptyView fullScreen text='No foods To Try found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {toTry.loading ? <LoadingSpinner fullScreen /> : toTry.data?.length ? <View style={{ alignItems: 'center', marginTop: 10 }}><FoodList items={toTry.data ? all.filter(f => f.toTry) : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        all: state.foods.all,
        toTry: state.foods.toTry
    }
})(ToTryScreen);