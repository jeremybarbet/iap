# @jeremybarbet/apple-api-types

Typescript definitions for Apple API services.

## Includes

- [App Store Receipts](https://developer.apple.com/documentation/appstorereceipts)
- [App Store Server API](https://developer.apple.com/documentation/appstoreserverapi)

## Installation

```bash
yarn add @jeremybarbet/apple-api-types
```

## Usage

```ts
import { Environment } from '@jeremybarbet/apple-api-types';

if (Environment === Environment.PRODUCTION) {
  // ...
}
```
