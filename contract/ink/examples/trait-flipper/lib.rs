#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::trait_definition]
pub trait Flip {
    /// Creates a new flipper smart contract initialized with the given value.
    #[ink(constructor)]
    fn new(init_value: bool) -> Self;

    /// Flips the current value of the Flipper's boolean.
    #[ink(message)]
    fn flip(&mut self);

    /// Returns the current value of the Flipper's boolean.
    #[ink(message)]
    fn get(&self) -> bool;
}

#[ink::contract]
pub mod flipper {
    use super::Flip;

    #[ink(storage)]
    pub struct Flipper {
        value: bool,
    }

    impl Flipper {
        /// Creates a new flipper smart contract initialized to `false`.
        #[ink(constructor)]
        pub fn default() -> Self {
            Self::new(Default::default())
        }
    }

    impl Flip for Flipper {
        #[ink(constructor)]
        fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        #[ink(message)]
        fn flip(&mut self) {
            self.value = !self.value;
        }

        #[ink(message)]
        fn get(&self) -> bool {
            self.value
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;
        use ink_lang as ink;

        #[ink::test]
        fn default_works() {
            let flipper = Flipper::default();
            assert!(!flipper.get());
        }

        #[ink::test]
        fn it_works() {
            let mut flipper = Flipper::new(false);
            // Can call using universal call syntax using the trait.
            assert!(!<Flipper as Flip>::get(&flipper));
            <Flipper as Flip>::flip(&mut flipper);
            // Normal call syntax possible to as long as the trait is in scope.
            assert!(flipper.get());
        }
    }
}
