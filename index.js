/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { SetTypography } from './src/Config';

SetTypography();

AppRegistry.registerComponent(appName, () => App);
