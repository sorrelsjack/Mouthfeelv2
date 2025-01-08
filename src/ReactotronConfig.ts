import Reactotron from "reactotron-react-native";
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron.configure({ name: 'Mouthfeel' }) // controls connection & communication settings
    .useReactNative()
    .use(reactotronRedux()) // add all built-in react native plugins
    .connect(); // let's connect!

export default reactotron;