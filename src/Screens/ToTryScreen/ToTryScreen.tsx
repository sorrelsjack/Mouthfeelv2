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
import { GetFoodsToTryAction } from '../../Redux/Actions';

interface ToTryScreenProps {
    toTry: ApiData<FoodDetails[]>
}

const ToTryScreen = (props: ToTryScreenProps) => {
    const { toTry } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetFoodsToTryAction());
    }, [])

    const NoDataView = () => {
        if (toTry.error) return <ErrorView fullScreen text={toTry.error.Message} onButtonPress={() => { dispatch(GetFoodsToTryAction()) }} />
        if (!toTry.loading && !toTry.data?.length) return <EmptyView fullScreen text='No foods To Try found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {toTry.loading ? <LoadingSpinner fullScreen /> : toTry.data?.length ? <View style={{ alignItems: 'center' }}><FoodList items={toTry.data ? toTry.data : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        toTry: state.foods.toTry
    }
})(ToTryScreen);