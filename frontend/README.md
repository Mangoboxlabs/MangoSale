# Setup mangosale Front-end

## Install `Polkadot JS Extension`

Please install `Polkadot JS Extension` before you start. You can get it from here https://polkadot.js.org/extension/

### Get source code

Please get the code from https://github.com/Mangoboxlabs/MangoSale.git

```
git clone https://github.com/Mangoboxlabs/MangoSale.git
```

## Project setup

```
cd frontend
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

 Open http://localhost:8080 to view it in your browser. 

### Compiles and minifies for production

```
npm run build
```

### docker

```
npm run build
npm run docker:build
docker run -p8080:80 mangosale/ui1:v1
```

## Way 2: Local Node Test

### Config front-end

Please find the correct address for `src/api/apiMap.js`, and update the correct address in `src/api/apiMap.js`. And replace `src/api/httpConfig.js connectPath` to your connect path.

it should be `ws://127.0.0.1:9900` by default.



#### Ipfs Config

`src/utils/ipfsApi.js`  `pinataConfig`

### gas

1. Open https://polkadot.js.org/apps/
2. Add localhost path(like `ws://127.0.0.1:9900` ) to local node
3. Use an account(like Alice) to wire money into a `Polkadot JS Extension` wallet



### cypress e2e Test

```
npx cypress open
```





## Way 2: Use the online version front-end test deployed contract

### entrance:

[https://sale.mangobox.xyz/](https://sale.mangobox.xyz/)

### gas

1. Open https://polkadot.js.org/apps
2. Add wss://rpc.mangobox.xyz/ to local node
3. Use an account(like Alice) to wire money into a `Polkadot JS Extension` wallet

##### Then

You can use `https://sale.mangobox.xyz/` to create token/multisign wallet. Test Protocol Management.

