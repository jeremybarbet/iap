# In App Purchase

Libraries to server-side verify in-app purchases for iOS and Android. Additionally, with Google Play Billing Library version 3, can acknowledge a subscription to be successfully process by the Google Play Store.

## Features

- 💸 Verify in-app purchases for iOS and Android receipts in Node.js
- 🔌 [NestJS](https://nestjs.com) wrapper to easily integrates the library in your project.
- Uses [axios](https://github.com/axios/axios) under the hood for the requests.
- Typescript definition for App Store Receipts, App Store Server API, Google Play Developer API and Google Play Real-time developer notifications.
- All types come with their descriptions extracted from the Apple and Google documentations.

## Installation and usage

- [Node.js IAP](./packages/node-iap/README.md) - Core library wrapping the Apple and Google IAP APIs to get and verify in-app purchases
- [NestJS IAP](./packages/nest-iap/README.md) - NestJS wrapper for the Node.js library.
- [Apple API types](./packages/apple-api-types/README.md) - Typescript definitions for Apple API services.
- [Google API types](./packages/google-api-types/README.md) - Typescript definitions for Google API services.

## Acknowledgments

I build this library for my side-project [hello aurora](https://github.com/hello-aurora). If you find this library useful, please consider donating.

## License

This library is licensed under the MIT License.
