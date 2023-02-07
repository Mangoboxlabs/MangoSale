# MangoSale
## Contract introduction
- TokenFactory: TokenFactory can create ERC20 tokens with tax functions.
- MangoLock:MangoLock can realize the lock-up and linear release of Token.
- MangoAirdrop:MangoAirdrop can implement different types of token airdrops.


## Installing
### Before you begin
```
sudo apt install build-essential
```

At a minimum, you need the following packages before you install Rust:

```
clang curl git make
```
### Install required packages and Rust
```
sudo apt install --assume-yes git clang curl libssl-dev llvm libudev-dev make protobuf-compiler
```

Download the rustup installation program and use it to install Rust by running the following command:
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
Update your current shell to include Cargo by running the following command:
```
source $HOME/.cargo/env
```
Please make sure that you have these prerequisites installed on your computer:

```bash
rustup default stable
rustup update
rustup update nightly
rustup component add rust-src --toolchain nightly
rustup target add wasm32-unknown-unknown --toolchain nightly
```

Then you have to install ink! command line utility which will make setting up Substrate smart contract projects easier:

```bash
cargo install cargo-contract --vers 0.15.0 --force --locked
```

You also need the [binaryen](https://github.com/WebAssembly/binaryen) package installed on your computer which is used to optimize the WebAssembly bytecode of the contract, you can use npm to install it:

```bash
npm install -g binaryen
```

## Testing
### Command  test
First of all you need to clone the repository, run:

```bash
https://github.com/Mangoboxlabs/MangoSale.git
cd MangoSale/contract
```

Then, You can enter any folder and enter the following command.

```bash
cargo +nightly test
```
### Test by polkadot.js apps
visit [polkadot.js apps](https://polkadot.js.org/apps/), and connect Mangobox node(wss://rpc.mangobox.xyz/).
then `Develpoer`->`Contract`->`upload & deploy`.Then upload your compiled `.contract` file.

#### Contract deployment steps
erc20 > token_factory > mango_lock > mango_airdrop
## Building

To build the WASM of your contract and metadata, You can enter any folder and enter the following command.
```bash
cargo +nightly contract build
```

