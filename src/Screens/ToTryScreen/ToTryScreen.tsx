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
import { AttributeList, CircleButton, LoadingSpinner, FoodList } from '../../Components';
import LottieView from 'lottie-react-native';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { VotableAttribute, MouthfeelState, FoodDetails } from '../../Redux/Models';
import { GetFoodsToTryAction } from '../../Redux/Actions';

interface ToTryScreenProps {
    toTry: {
        data: FoodDetails[];
        loading: boolean;
    }
}

const ToTryScreen = (props: ToTryScreenProps) => {
    const { toTry } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetFoodsToTryAction());
    }, [])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {toTry.loading ? <LoadingSpinner fullScreen /> : <FoodList items={toTry.data ? toTry.data : []} />}
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        toTry: state.foods.toTry
    }
})(ToTryScreen);