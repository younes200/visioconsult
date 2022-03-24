jest.mock('react-native-device-info', () => {
  return {
    getUniqueID: jest.fn(),
    isEmulator: jest.fn(),
  };
});
jest.mock('react-native-onesignal');

jest.mock('NetInfo');
