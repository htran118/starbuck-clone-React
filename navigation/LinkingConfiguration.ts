import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
			  UserMainScreen: 'main',
            },
          },
          Scan: {
            screens: {
              ScanScreen: 'scan',
            },
          },
          Order: {
            screens: {
              OrderScreen: 'order',
            },
          },
          Gift: {
            screens: {
              GiftScreen: 'gift',
            },
          },
          Store: {
            screens: {
              StoreScreen: 'store',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
