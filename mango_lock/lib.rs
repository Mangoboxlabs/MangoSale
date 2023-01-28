#![cfg_attr(not(feature = "std"), no_std)]
extern crate alloc;
use ink_lang as ink;
#[allow(unused_imports)]
#[allow(renamed_and_removed_lints)]
#[ink::contract]
mod mango_lock {
    use erc20::Erc20;
    use alloc::string::String;
    use ink_prelude::vec::Vec;
    use ink_storage::{
        collections::HashMap as StorageHashMap,
    };
    const CONTRACT_INIT_BALANCE: u128 = 1000 * 1_000_000_000_000;
    #[derive(scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
    #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    /**
    @member ent_time Time of the end of locking
    @member amount Amount of locking
    @member contract contract of locking
    @member contract contract of locking
    @member is_extract Whether it has been extracted
     */
    pub struct LockDetail {
        end_time: u64,
        amount: u128,
        contract: AccountId,
        is_extract:bool
    }
    #[ink(storage)]
    pub struct MangoLock {
        user_locks: StorageHashMap<AccountId, Vec<LockDetail>>
    }

    impl MangoLock {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                user_locks:StorageHashMap::new()
            }
        }
        #[ink(message)]
        pub fn lock(
            &mut self,
            contract:AccountId,
            amount:u128,
            end_time:u64
        ) -> bool {
            let mut erc20: erc20 = ink_env::call::FromAccountId::from_account_id(contract);
            erc20.transfer_from(self.env().caller(),self.env().account_id(),amount);
            let lock = LockDetail{
                end_time,
                amount,
                contract,
                is_extract:false
            };
            let mut exists_locks = self.user_locks.get(&self.env().caller()).unwrap_or(&Vec::new()).clone();
            exists_locks.push(lock);
            self.user_locks.insert(self.env().caller(),exists_locks);
            true
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