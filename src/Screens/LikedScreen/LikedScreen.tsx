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
import { GetLikedFoodsAction } from '../../Redux/Actions';

interface LikedScreenProps {
    liked: {
        data: FoodDetails[];
        loading: boolean;
    }
}

// TODO: Fix issue here where loading indicator isnt in the center of the screen
const LikedScreen = (props: LikedScreenProps) => {
    const { liked } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetLikedFoodsAction());
    }, [])

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {liked.loading && <LoadingSpinner />}
            {<FoodList items={liked.data ? liked.data : []} />}
        </View>
    )
}

export default connect((state: MouthfeelState) => {
    return {
        liked: state.foods.liked
    }
})(LikedScreen);