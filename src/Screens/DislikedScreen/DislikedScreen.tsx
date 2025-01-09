import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Routes } from '../../Common';
import { EmptyView, ErrorView, FoodList, LoadingSpinner } from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { GetDislikedFoodsAction } from '../../Redux/Actions';

const DislikedScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const all = useAppStore(s => s.foods.all);
    const disliked = useAppStore(s => s.foods.disliked)

    useEffect(() => {
        dispatch(GetDislikedFoodsAction());
    }, [])

    if (!disliked?.data || !all) return null;

    const NoDataView = () => {
        if (disliked.error) return (
            <ErrorView
                fullScreen
                onButtonPress={() => { dispatch(GetDislikedFoodsAction()) }}
                onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        )
        if (!disliked.loading && !disliked.data?.length) return <EmptyView fullScreen text='No Disliked foods found' />
        return null;
    }

    return (
        <View style={{ justifyContent: 'center', height: '100%' }}>
            {disliked.loading ? <LoadingSpinner fullScreen /> : disliked.data?.length ? <View style={{ alignItems: 'center', marginTop: 10 }}><FoodList items={disliked.data ? all.filter(f => f.sentiment === - 1) : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default DislikedScreen