import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Routes } from '../../Common';
import { EmptyView, ErrorView, FoodList, LoadingSpinner } from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { GetFoodsToTryAction } from '../../Redux/Actions';

const ToTryScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const all = useAppStore(s => s.foods.all);
    const toTry = useAppStore(s => s.foods.toTry)

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

export default ToTryScreen;