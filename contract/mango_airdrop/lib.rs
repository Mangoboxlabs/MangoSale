#![cfg_attr(not(feature = "std"), no_std)]
extern crate alloc;
use ink_lang as ink;
#[allow(unused_imports)]
#[allow(renamed_and_removed_lints)]
#[ink::contract]
mod mango_airdrop {
    use erc20::Erc20;
    use alloc::string::String;
    use ink_prelude::vec::Vec;
    use ink_storage::{
        collections::HashMap as StorageHashMap,
    };
    const CONTRACT_INIT_BALANCE: u128 = 1000 * 1_000_000_000_000;
    #[ink(storage)]
    pub struct MangoAirdrop {
        user_tokens: StorageHashMap<AccountId, Vec<AccountId>>
    }

    impl MangoAirdrop {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                user_tokens:StorageHashMap::new()
            }
        }
        #[ink(message)]
        pub fn new_airdrop(
            &mut self,
            erc20_address:AccountId,
            title:String,
            information:String
        ) -> AccountId {
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