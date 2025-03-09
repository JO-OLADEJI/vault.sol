use anchor_lang::prelude::*;
use anchor_spl::token_interface::{Mint, TokenInterface};

declare_id!("789JRYzNE9SMo2p6fL2NJyFTBxr8CPngiMuQGAQFJo4B");

#[program]
pub mod wsol {
    use super::*;

    pub fn create_token(ctx: Context<CreateTokenCalldata>, _ticker: String) -> Result<()> {
        msg!(
            "Creating a new Mint Account: {}",
            ctx.accounts.mint_account.key()
        );
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(ticker: String)]
pub struct CreateTokenCalldata<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 9,
        mint::authority = creator,
        seeds = [b"token-2022".as_ref(), creator.key().as_ref(), ticker.as_bytes()],
        bump
    )]
    pub mint_account: InterfaceAccount<'info, Mint>,

    pub token_program: Interface<'info, TokenInterface>,

    pub system_program: Program<'info, System>,
}
