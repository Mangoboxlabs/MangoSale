#![cfg_attr(not(feature = "std"), no_std)]
extern crate alloc;
use ink_lang as ink;
#[allow(unused_imports)]
#[allow(renamed_and_removed_lints)]
#[ink::contract]
mod token_factory {
    use erc20::Erc20;
    use alloc::string::String;
    use ink_prelude::vec::Vec;
    use ink_storage::{
        collections::HashMap as StorageHashMap,
    };
    const CONTRACT_INIT_BALANCE: u128 = 1000 * 1_000_000_000_000;
    #[ink(storage)]
    pub struct TokenFactory {
        user_tokens: StorageHashMap<AccountId, Vec<AccountId>>
    }

    impl TokenFactory {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                user_tokens:StorageHashMap::new()
            }
        }
        #[ink(message)]
        pub fn new_erc20(
            &mut self,
            erc20_code_hash:Hash,
            version:u8,
            initial_supply: Balance,
            name:String,
            symbol:String,
            decimals:u8,
            owner:AccountId
        ) -> AccountId {
            let salt = version.to_le_bytes();
            let instance_params = Erc20::new(initial_supply,name,symbol,decimals,owner)
                .endowment(CONTRACT_INIT_BALANCE)
                .code_hash(erc20_code_hash)
                .salt_bytes(salt)
                .params();
            let init_result = ink_env::instantiate_contract(&instance_params);
            let contract_addr = init_result.expect("failed at instantiating the `Erc20` contract");
            let mut user_tokens = self.user_tokens.get(&owner).unwrap_or(&Vec::new()).clone();
            user_tokens.push(contract_addr);
            self.user_tokens.insert(owner,user_tokens);
            contract_addr
        }
        /**
        @notice
        Get user's tokens
        @param owner The address to set as the owner of the token. The token  will be owned by this address.
         */
        #[ink(message)]
        pub fn get_user_tokens(&self, owner: AccountId) -> Vec<AccountId> {
            self.user_tokens.get(&owner).unwrap_or(&Vec::new()).clone()
        }
    }
}