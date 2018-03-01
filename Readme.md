# 🇫🇷 Get INSEE municipality code

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![npm version](https://badge.fury.io/js/insee-municipality-code.svg)](http://badge.fury.io/js/insee-municipality-code) [![CircleCI Build Status](https://circleci.com/gh/aymericbouzy/insee-municipality-code.svg?style=shield)](https://circleci.com/gh/aymericbouzy/insee-municipality-code) [![codecov](https://codecov.io/gh/aymericbouzy/insee-municipality-code/branch/master/graph/badge.svg)](https://codecov.io/gh/aymericbouzy/insee-municipality-code)

Simply provide the postal code and / or name of a French municipality and get the most likely INSEE municipality code

## Installation

```sh
yarn add insee-municipality-code
```

or

```sh
npm i --save insee-municipality-code
```

## Usage

```js
import InseeCode from "insee-municipality-code"

InseeCode.getCode({ postalCode: "14710", name: "Colombières" }) // "14168"
InseeCode.getCode({ name: "Collonbier", postalCode: "15710" }) // "14168"
InseeCode.getCode({ name: "Lyon" }) // "69381"
InseeCode.getMunicipality("14168") // { postalCode: "14710", name: "COLOMBIERES" }
InseeCode.getMunicipality("96501") // null
```

## Api

| Method | arguments | returned value | throws |
| ------ | --------- | -------------- | ------ |
| `getCode` | `params: { postalCode: string? \| number?, name: string? }` | `string`: the most likely Insee code regarding your input | will throw if both params are empty |
| `getMunicipality` | `string` | `{ postalCode: string, name: string }?`: the corresponding city (if it exists) | will throw if insee code is not well formated (`/(\d{2}|2[AB])\d{3}/i`) |

## Dependencies

* fuse.js : [http://fusejs.io/](http://fusejs.io/)

## Limitations

This package loads in memory the name and postal code of 39k+ French towns. You should probably not try to send this package client side.

## Contributing

Please fork this package, and run

```sh
yarn install
yarn test
```

## Issues

Something is not working as expected? Some result is wrong? Documentation is missing? You need a different feature / API? Please file an [issue](https://github.com/aymericbouzy/insee-municipality-code/issues/new), we'll be in touch.

## References

(in French)

* [https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/](https://public.opendatasoft.com/explore/dataset/correspondance-code-insee-code-postal/)

## Financial Support

Gofer 🤝 (the human-centric work-on-demand solution) is the main support of this package.
