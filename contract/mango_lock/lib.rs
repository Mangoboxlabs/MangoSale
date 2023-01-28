#![cfg_attr(not(feature = "std"), no_std)]
extern crate alloc;
use ink_lang as ink;
#[allow(unused_imports)]
#[allow(renamed_and_removed_lints)]
#[ink::contract]
mod mango_lock {
    use erc20::Erc20;
    use std::convert::TryInto;
    use alloc::string::String;
    use ink_prelude::vec::Vec;
    use ink_storage::{
        collections::HashMap as StorageHashMap,
        traits::{
            PackedLayout,
            SpreadLayout,
        },
    };
    #[derive(Debug,scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
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
        owner:AccountId,
        end_time: u64,
        amount: u128,
        contract: AccountId,
        is_extract:bool
    }
    #[ink(storage)]
    pub struct MangoLock {
        user_locks: StorageHashMap<AccountId, Vec<LockDetail>>,
        all_locks : Vec<LockDetail>

    }

    impl MangoLock {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                user_locks:StorageHashMap::new(),
                all_locks:Vec::new()
            }
        }
        /**
        @notice
        Add a new token lock

        @param contract Token address
        @param amount Number of locks
        @end_time Lock end time
         */
        #[ink(message)]
        pub fn lock(
            &mut self,
            contract:AccountId,
            amount:u128,
            end_time:u64
        ) -> bool {
            let mut erc20: Erc20 = ink_env::call::FromAccountId::from_account_id(contract);
            let _ret = erc20.transfer_from(self.env().caller(),self.env().account_id(),amount);
            let lock = LockDetail{
                owner:self.env().caller(),
                end_time,
                amount,
                contract,
                is_extract:false
            };
            let mut exists_locks = self.user_locks.get(&self.env().caller()).unwrap_or(&Vec::new()).clone();
            exists_locks.push(lock.clone());
            self.user_locks.insert(self.env().caller(),exists_locks);
            self.all_locks.push(lock);
            true
        }
        /**
        @notice
        Add a new token lock

        @param contract Token address
        @param amount Number of locks
        @end_time Lock end time
         */
        #[ink(message)]
        pub fn additional_tokens(
            &mut self,
            index:u128,
            amount:u128
        ) ->bool {
            let mut exists_locks = self.user_locks.get(&self.env().caller()).unwrap_or(&Vec::new()).clone();
            for i in  0..exists_locks.len(){
                if i == index.try_into().unwrap() {
                    let mut erc20: Erc20 = ink_env::call::FromAccountId::from_account_id(exists_locks[i].contract);
                    exists_locks[i].amount += amount;
                    let _ret = erc20.transfer_from(self.env().caller(),self.env().account_id(),amount);
                }
            }
            self.user_locks.insert(self.env().caller(),exists_locks);
            true
        }
        /**
        @notice
        Get user's locks
         */
        #[ink(message)]
        pub fn get_user_locks(&self) -> Vec<LockDetail> {
            self.user_locks.get(&self.env().caller()).unwrap_or(&Vec::new()).clone()
        }
    }
}