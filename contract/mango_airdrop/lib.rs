#![cfg_attr(not(feature = "std"), no_std)]
extern crate alloc;
use ink_lang as ink;

#[allow(unused_imports)]
#[allow(renamed_and_removed_lints)]
#[ink::contract]
mod mango_airdrop {
    use core::convert::TryFrom;
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
    #[derive(Debug,scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
    #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    /**
    @member owner Airdrop owner
    @member title Airdrop title
    @member information Airdrop information
    @member description Airdrop  description
    @member token Airdrop  token
     */
    pub struct AirdropDetail {
        id:u128,
        owner:AccountId,
        title: String,
        information: String,
        description: String,
        token:AccountId,
        start_time:u64
    }
    #[derive(Debug,scale::Encode, scale::Decode, Clone, SpreadLayout, PackedLayout)]
    #[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink_storage::traits::StorageLayout)
    )]
    pub struct DistributionInformation {
        account:AccountId,
        amount:u128,
        is_extract:bool
    }
    #[ink(storage)]
    pub struct MangoAirdrop {
        all_airdrops: Vec<AirdropDetail>,
        user_airdrops: StorageHashMap<AccountId, Vec<AirdropDetail>>,
        id_airdrops: StorageHashMap<u128, AirdropDetail>,
        user_distribution:StorageHashMap<(u128,AccountId),DistributionInformation>,
        id_distribution:StorageHashMap<u128, u128>,
        id_collect:StorageHashMap<u128, u128>
    }

    impl MangoAirdrop {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                all_airdrops:Vec::new(),
                user_airdrops:StorageHashMap::new(),
                id_airdrops:StorageHashMap::new(),
                user_distribution:StorageHashMap::new(),
                id_distribution:StorageHashMap::new(),
                id_collect:StorageHashMap::new(),
            }
        }
        /**
        @notice
        Get add a airdrops
        @member title Airdrop title
        @member information Airdrop information
        @member description Airdrop  description
        @member token Airdrop  token
         */
        #[ink(message)]
        pub fn new_airdrop(
            &mut self,
            token:AccountId,
            title:String,
            information:String,
            description:String,
            start_time:u64
        ) -> bool {
            let new_id = self.all_airdrops.clone().len() + 1;
            let new_airdrop = AirdropDetail{
                id:u128::try_from(new_id).unwrap(),
                owner:self.env().caller(),
                title,
                information,
                description,
                token,
                start_time
            };
            self.all_airdrops.push(new_airdrop.clone());
            let mut user_info = self.user_airdrops.get(&self.env().caller()).unwrap_or(&Vec::new()).clone();
            user_info.push(new_airdrop.clone());
            self.user_airdrops.insert(self.env().caller(),user_info);
            self.id_airdrops.insert(u128::try_from(new_id).unwrap(),new_airdrop);
            true
        }
        /**
        @notice
        Allocate funds to users
        @param id The id of airdrops
        @param information Details of assignment
         */
        #[ink(message)]
        pub fn distribution(&mut self, id:u128,information:Vec<DistributionInformation>) -> bool {

            let airdrop = self.id_airdrops.get(&id).unwrap().clone();
            if airdrop.token == AccountId::default() { return  false}
            let mut erc20: Erc20 = ink_env::call::FromAccountId::from_account_id(airdrop.token);
            assert!(airdrop.owner == self.env().caller());
            let mut all_amount = 0;
            for i in 0..information.len()  {
                let account = information[i].account.clone();
                all_amount+=information[i].amount.clone();
                self.user_distribution.insert((id,account),information[i].clone());
            }
            self.id_distribution.insert(id,all_amount.clone());
            let _ret = erc20.transfer_from(self.env().caller(),self.env().account_id(),all_amount);
            true
        }
        /**
        @notice
        Get distribution details
        @param id The id of airdrops
         */
        #[ink(message)]
        pub fn get_id_distribution(&self, id:u128) -> u128 {
            self.id_distribution.get(&id).unwrap_or(&0).clone()
        }
        /**
        @notice
        Get collect details
        @param id The id of airdrops
         */
        #[ink(message)]
        pub fn get_id_collect(&self, id:u128) -> u128 {
            self.id_collect.get(&id).unwrap_or(&0).clone()
        }
        /**
        @notice
        Collect token
        @param id The id of airdrops
        @param information Details of assignment
         */
        #[ink(message)]
        pub fn collect(&mut self, id:u128) -> bool {
            let airdrop = self.id_airdrops.get(&id).unwrap().clone();
            assert!(airdrop.start_time <= self.env().block_timestamp());
            if airdrop.token == AccountId::default() { return  false}
            let mut erc20: Erc20 = ink_env::call::FromAccountId::from_account_id(airdrop.token);
            let mut info =  self.get_user_collect(id);
            assert!(info.amount > 0);
            assert!(info.is_extract == false);
            let _ret = erc20.transfer(self.env().caller(),info.amount);
            let mut user_collect = self.id_collect.get(&id).unwrap_or(&0).clone();
            user_collect+=info.amount.clone();
            info.amount = 0;
            info.is_extract = true;
            self.id_collect.insert(id,user_collect);
            self.user_distribution.insert((id,self.env().caller()),info);
            true
        }
        /**
        @notice
        Collect token
        @param id The id of airdrops
         */
        #[ink(message)]
        pub fn get_user_collect(&self,id:u128) -> DistributionInformation {
            let default = DistributionInformation{
                account:AccountId::default(),
                amount:0,
                is_extract:true
            };
            let info =  self.user_distribution.get(&(id,self.env().caller())).unwrap_or(&default).clone();
            info
        }
        /**
        @notice
        Get user's airdrops
        @param owner The address to set as the owner of the airdrops. The airdrops  will be owned by this address.
         */
        #[ink(message)]
        pub fn get_user_airdrops(&self, owner: AccountId) -> Vec<AirdropDetail> {
            self.user_airdrops.get(&owner).unwrap_or(&Vec::new()).clone()
        }
        /**
        @notice
        Get user's airdrops
        @param owner The address to set as the owner of the airdrops. The airdrops  will be owned by this address.
         */
        #[ink(message)]
        pub fn get_all_airdrops(&self) -> Vec<AirdropDetail> {
            self.all_airdrops.clone()
        }
    }
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;
        /// Imports `ink_lang` so we can use `#[ink::test]`.
        use ink_lang as ink;
        #[ink::test]
        fn new_airdrop_works() {
            let mut mp = MangoAirdrop::new();
            assert!(mp.new_airdrop(AccountId::default(),String::from("test"),String::from("test"),String::from("test"),0) == true);
        }
        #[ink::test]
        fn distribution_works() {
            let mut mp = MangoAirdrop::new();
            let _ret = mp.new_airdrop(AccountId::default(),String::from("test"),String::from("test"),String::from("test"),0);
            let default = DistributionInformation{
                account:AccountId::default(),
                amount:0,
                is_extract:true
            };
            let mut vec = Vec::new();
            vec.push(default);
            assert!(mp.distribution(1,vec) == false);
        }
        #[ink::test]
        fn collect_works() {
            let mut mp = MangoAirdrop::new();
            let _ret = mp.new_airdrop(AccountId::default(),String::from("test"),String::from("test"),String::from("test"),0);
            assert!(mp.collect(1) == false);
        }
        #[ink::test]
        fn get_user_collect_works() {
            let  mp = MangoAirdrop::new();
            assert!(mp.get_user_collect(1).amount == 0);
        }
        #[ink::test]
        fn get_user_airdrops_works() {
            let  mp = MangoAirdrop::new();
            assert!(mp.get_user_airdrops(AccountId::default()).len() == 0);
        }
        #[ink::test]
        fn get_all_airdrops_works() {
            let  mp = MangoAirdrop::new();
            assert!(mp.get_all_airdrops().len() == 0);
        }
    }
}