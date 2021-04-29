import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GetFoodDetailsAction, AddOrRemoveFoodToTryAction, ManageFoodSentimentAction, GetCurrentUserAction } from '../../Redux/Actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  IngredientsList,
  CommentsSection,
} from './Components';
import {
  FormatAsTitleCase,
  GetDefaultPrimaryThemeColor,
  GetDefaultPrimaryThemeTextColor,
  DetermineColorBrightness,
  GetTextColorBasedOnBrightness,
  InvertColor,
  GetDeltaE,
  ConvertHexToRgbaArray,
  GetDefaultHeartSelectedColor,
  GetDefaultHeartBrokenSelectedColor
} from '../../Common';
import { AttributeList, CircleButton, LoadingSpinner } from '../../Components';
import { getColorFromURL } from 'rn-dominant-color';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { FoodDetails, VotableAttribute, MouthfeelState } from '../../Redux/Models';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';

interface FoodDetailsScreenProps {
  userId: number,
  theme: ThemeProp,
  updateTheme: UpdateTheme,
  selected: {
    loading: boolean,
    data: FoodDetails
  }
}

const FoodDetailsScreen = (props: FoodDetailsScreenProps) => {
  const { userId, theme, updateTheme } = props;
  const { loading } = props.selected || {};
  const {
    id,
    name,
    imageUrl,
    toTry,
    sentiment,
    textures,
    flavors,
    miscellaneous
  } = props.selected?.data ?? {};

  const [markedLiked, setMarkedLiked] = useState(false);
  const [markedDisliked, setMarkedDisliked] = useState(false);
  const [markedToTry, setMarkedToTry] = useState(false);

  const delayedDispatch = useCallback(_.debounce((foodId: number, sentiment: number) =>
  dispatch(ManageFoodSentimentAction(foodId, sentiment)), 2000), []);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const styles = createStyles(theme);

  const handleLikedPressed = () => {
    const updatedStatus = !markedLiked;

    setMarkedLiked(updatedStatus);
    if (updatedStatus === true) setMarkedDisliked(false);
    delayedDispatch(id, updatedStatus === true ? 1 : 0);
  }

  const handleDislikedPressed = () => {
    const updatedStatus = !markedDisliked;

    setMarkedDisliked(updatedStatus);
    if (updatedStatus === true) setMarkedLiked(false);
    delayedDispatch(id, updatedStatus === true ? -1 : 0);
  }

  const handleToTryButtonPressed = () => {
    const initialMarkedToTry = markedToTry;
    setMarkedToTry(!markedToTry);
    Toast.show(`'${FormatAsTitleCase(name)}' ${!initialMarkedToTry ? 'added to' : 'removed from'} list of foods to try!`);
    dispatch(AddOrRemoveFoodToTryAction(id));
  }

  // TODO: There's an issue where if you hit back after marking a food as liked / disliked, it won't be reflected in the list item. Maybe we can resolve this by having the API return the object once the manage request has finished, and then we can spread the new response into the reducer
  // TODO: Fix strange issue where going to tags screen back to details makes the tags colors funny :(

  useEffect(() => {
    navigation.addListener('blur', e => {
      updateTheme({
        ...theme,
        primaryThemeColor: GetDefaultPrimaryThemeColor(),
        primaryThemeTextColor: GetDefaultPrimaryThemeTextColor(),
        clickableTextColor: GetDefaultPrimaryThemeColor(),
        heartSelectedColor: GetDefaultHeartSelectedColor(),
        heartBrokenSelectedColor: GetDefaultHeartBrokenSelectedColor()
      })
    });

    navigation.addListener('focus', e => {
      if (!imageUrl) return;

      const GetThemeColor = async () => {
        const res = await getColorFromURL(imageUrl);
        updateTheme({
          ...theme,
          primaryThemeColor: res.primary,
          primaryThemeTextColor: GetTextColorBasedOnBrightness(res.primary),
          clickableTextColor: DetermineColorBrightness(res.primary) === 'light' ? InvertColor(res.primary) : res.primary,
          heartSelectedColor: GetDeltaE(ConvertHexToRgbaArray(GetDefaultHeartSelectedColor()), ConvertHexToRgbaArray(res.primary)) <= 49 ? InvertColor(res.primary) : GetDefaultHeartSelectedColor(),
          heartBrokenSelectedColor: GetDeltaE(ConvertHexToRgbaArray(GetDefaultHeartBrokenSelectedColor()), ConvertHexToRgbaArray(res.primary)) <= 49 ? InvertColor(GetTextColorBasedOnBrightness(res.primary)) : GetDefaultHeartBrokenSelectedColor(),
        })
        navigation.setOptions({ headerStyle: { backgroundColor: res.primary } })
      }
      GetThemeColor();
    });
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: FormatAsTitleCase(name),
      headerTintColor: theme.primaryThemeTextColor,
      headerRight: () => (
        <TouchableOpacity onPress={handleToTryButtonPressed}>
          <Icon
            style={{ padding: 15 }}
            solid={markedToTry}
            size={20}
            name='bookmark'
            color={theme.primaryThemeTextColor} />
        </TouchableOpacity>
      )
    });
  }, [navigation, theme, markedToTry])

  useEffect(() => {
    if (!userId) dispatch(GetCurrentUserAction());
  }, [])

  useEffect(() => {
    dispatch(GetFoodDetailsAction(id));
  }, [props.selected.data.id])

  useEffect(() => {
    if (sentiment === 1) setMarkedLiked(true);
    if (sentiment === -1) setMarkedDisliked(true);
  }, [sentiment])

  useEffect(() => {
    setMarkedToTry(toTry);
  }, [toTry]);

  useEffect(() => {
    if (!imageUrl) return;

    const GetThemeColor = async () => {
      const res = await getColorFromURL(imageUrl);
      updateTheme({
        ...theme,
        primaryThemeColor: res.primary,
        primaryThemeTextColor: GetTextColorBasedOnBrightness(res.primary),
        clickableTextColor: DetermineColorBrightness(res.primary) === 'light' ? InvertColor(res.primary) : res.primary,
        heartSelectedColor: GetDeltaE(ConvertHexToRgbaArray(GetDefaultHeartSelectedColor()), ConvertHexToRgbaArray(res.primary)) <= 49 ? InvertColor(res.primary) : GetDefaultHeartSelectedColor(),
        heartBrokenSelectedColor: GetDeltaE(ConvertHexToRgbaArray(GetDefaultHeartBrokenSelectedColor()), ConvertHexToRgbaArray(res.primary)) <= 49 ? InvertColor(GetTextColorBasedOnBrightness(res.primary)) : GetDefaultHeartBrokenSelectedColor()
      })
      navigation.setOptions({ headerStyle: { backgroundColor: res.primary } })
    }
    GetThemeColor();

  }, [imageUrl])

  const ingredients = ['yeast', 'water', 'flour', 'oil', 'salt', 'sugar'];

  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {loading ? <LoadingSpinner fullScreen /> :
          <>
            <View style={styles.heartsContainer}>
              <CircleButton icon='heart' iconSelectedColor={theme.heartSelectedColor} onPress={handleLikedPressed} isActive={markedLiked} />
              <CircleButton icon='heart-broken' iconSelectedColor={theme.heartBrokenSelectedColor} onPress={handleDislikedPressed} isActive={markedDisliked} />
            </View>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </View>
              <View style={styles.titleSection}>
                <Text style={styles.titleText}>{FormatAsTitleCase(name)}</Text>
              </View>
              {/*<IngredientsList items={ingredients} />*/}
              <View style={styles.attributeListsContainer}>
                <AttributeList
                  title={`What textures does ${name} have?`}
                  attributeType='texture'
                  items={textures ? textures : []} />
                <AttributeList
                  title={`What flavors does ${name} have?`}
                  attributeType='flavor'
                  items={flavors ? flavors : []} />
                <AttributeList
                  title={`What makes ${name} unique?`}
                  attributeType='miscellaneous'
                  items={miscellaneous ? miscellaneous : []} />
              </View>
              <CommentsSection />
            </View>
          </>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default withTheme(connect((state: MouthfeelState) => {

  return {
    selected: state.foods.selected,
    userId: state.user.profile.data?.id
  }

})(FoodDetailsScreen));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: theme.page.backgroundColor
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  heartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  attributeListsContainer: {
    paddingTop: 15,
    paddingBottom: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 175,
    width: '80%'
  },
  titleSection: {
    padding: 20,
    backgroundColor: theme.section.backgroundColor,
    marginTop: 30,
    marginBottom: 10 // Remove this line after ingredients are added back
    //marginVertical: 30
  },
  titleText: {
    fontSize: 28
  }
});