/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
import { name as appName } from './app.json';
// import AccordionTest from './src/AccordionTest';
// import CaptureImage from './src/CaptureImage';
// import Example from './src/Example';
import Home from './src/Home';
// import MultipleImages from './src/MultipleImages';
// import UrlValidation from './src/UrlValidation';

AppRegistry.registerComponent(appName, () => Home);
