import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Routes } from '../../Common';
import { EmptyView, ErrorView, FoodList, LoadingSpinner } from '../../Components';
import { useAppStore } from '../../Hooks/useAppStore';
import { GetLikedFoodsAction } from '../../Redux/Actions';

const LikedScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const all = useAppStore(s => s.foods.all);
    const liked = useAppStore(s => s.foods.liked)

    useEffect(() => {
        dispatch(GetLikedFoodsAction());
    }, [])

    const NoDataView = () => {
        if (liked.error) return <ErrorView fullScreen onButtonPress={() => { dispatch(GetLikedFoodsAction()) }} onSecondButtonPress={() => navigation.navigate(Routes.ContactUs)} />
        if (!liked.loading && !liked.data?.length) return <EmptyView fullScreen text='No Liked foods found' />
        return null;
    }

    return (
        <View style={styles.wrapper}>
            {liked.loading ? <LoadingSpinner fullScreen /> : (liked.data?.length) ? <View style={styles.container}><FoodList items={liked.data ? all.filter(f => f.sentiment === 1) : []} /></View> : null}
            <NoDataView />
        </View>
    )
}

export default LikedScreen;

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        height: '100%'
    },
    container: {
        alignItems: 'center',
        marginTop: 10
    }
})