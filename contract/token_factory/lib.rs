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
        traits::{
            PackedLayout,
            SpreadLayout,
        },
    };
    const CONTRACT_INIT_BALANCE: u128 = 1000 * 1_000_000_000_000;
    #[derive(Debug,scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
    #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    /**
    @member buy_burn_tax
    @member buy_marketing_tax
    @member sell_burn_tax
    @member sell_marketing_tax
    @member address
     */
    pub struct TaxFee {
        buy_burn_tax:u128,
        buy_marketing_tax: u128,
        sell_burn_tax: u128,
        sell_marketing_tax: u128,
        address: AccountId,
    }

    #[derive(Debug,scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
    #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    /**
    @member kill_block  kill block Switch on or not
    @member swap_limit swap limit switch on or not
    @member wallet_limit wallet limit switch on or not
     */
    pub struct FunctionalLimitation {
        kill_block:bool,
        swap_limit:bool,
        wallet_limit:bool
    }

    #[ink(storage)]
    pub struct TokenFactory {
        user_tokens: StorageHashMap<AccountId, Vec<AccountId>>,
        token_tax_fee:StorageHashMap<AccountId,TaxFee>,
        token_functional_limitation:StorageHashMap<AccountId,FunctionalLimitation>,
    }

    impl TokenFactory {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                user_tokens:StorageHashMap::new(),
                token_tax_fee:Default::default(),
                token_functional_limitation:Default::default(),
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
            owner:AccountId,
            tax_fee:TaxFee,
            functional_limitation:FunctionalLimitation
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
            self.token_tax_fee.insert(contract_addr.clone(),tax_fee);
            self.token_functional_limitation.insert(contract_addr.clone(),functional_limitation);
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
        /**
        @notice
        Get token tax fee
        @param token the address of token
        */
        #[ink(message)]
        pub fn get_token_tax_fee(&self,token:AccountId) -> TaxFee{
            let default = TaxFee{
                sell_burn_tax:0,
                sell_marketing_tax:0,
                buy_burn_tax:0,
                buy_marketing_tax:0,
                address:AccountId::default()
            };
            self.token_tax_fee.get(&token).unwrap_or(&default).clone()
        }
        /**
        @notice
        Get token functional limitation
        @param token the address of token
         */
        #[ink(message)]
        pub fn get_token_functional_limitation(&self,token:AccountId) -> FunctionalLimitation{
            let default = FunctionalLimitation{
                kill_block:false,
                swap_limit:false,
                wallet_limit:false
            };
            self.token_functional_limitation.get(&token).unwrap_or(&default).clone()
        }

    }
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        /// Imports `ink_lang` so we can use `#[ink::test]`.
        use ink_lang as ink;
        #[ink::test]
        fn get_user_tokens_works() {
            let mp = TokenFactory::new();
            assert!(mp.get_user_tokens(AccountId::default()).len() == 0);
        }
        #[ink::test]
        fn get_token_tax_fee() {
            let mp = TokenFactory::new();
            assert!(mp.get_token_tax_fee(AccountId::default()).sell_burn_tax == 0);
        }
        #[ink::test]
        fn get_token_functional_limitation() {
            let mp = TokenFactory::new();
            assert!(mp.get_token_functional_limitation(AccountId::default()).kill_block == false);
        }
    }
}