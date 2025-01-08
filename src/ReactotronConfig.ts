import Reactotron from "reactotron-react-native";
import { reactotronRedux } from 'reactotron-redux'

// if (__DEV__) {
//     console.tron = Reactotron;
// }

Reactotron.configure({ name: 'Mouthfeel' }) // controls connection & communication settings
    .useReactNative()
    .use(reactotronRedux()) // add all built-in react native plugins
    .connect(); // let's connect!