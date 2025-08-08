import 'react-native-gesture-handler/jestSetup'; // Make sure to include this line
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native-gesture-handler', () => {
  const RealComponent = jest.requireActual('react-native-gesture-handler');
  RealComponent.default = RealComponent;
  return RealComponent;
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);