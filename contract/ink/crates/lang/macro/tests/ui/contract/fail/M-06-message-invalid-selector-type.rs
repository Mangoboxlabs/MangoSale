use ink_lang as ink;

#[ink::contract]
mod message_invalid_selector {
    #[ink(storage)]
    pub struct MessageInvalidSelector {}

    impl MessageInvalidSelector {
        #[ink(constructor)]
        pub fn constructor() -> Self {
            Self {}
        }

        #[ink(message, selector = true)]
        pub fn invalid_selector(&self) {}
    }
}

fn main() {}
