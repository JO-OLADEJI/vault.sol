use anchor_lang::prelude::*;

declare_id!("D47rvdsKkKr6BBVC612tB6oY26yZwJLqNgudZVGGRF8L");

#[program]
pub mod vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
