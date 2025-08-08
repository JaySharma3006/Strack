module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native/jest/setup.js'],
  // C:\Users\jayjs\OneDrive\Desktop\Strack\Strack\strack-frontend\node_modules\react-native\jest\setup.js
  // strack-frontend\jest.config.js
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|@react-native-community|@react-navigation|@react-native\/js-polyfills)"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest', // if you are using CSS modules
    '^.+\\.svg$': '<rootDir>/path/to/svgMock.js', // if you are using SVGs
    // Add the following line for handling ES modules
    '^.+\\.js$': 'babel-jest',
  },
};
