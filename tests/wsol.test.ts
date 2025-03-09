import * as anchor from "@coral-xyz/anchor";
import {
    AnchorProvider,
    Wallet,
    Program,
    web3,
    setProvider,
} from "@coral-xyz/anchor";
import { describe, it } from "node:test";
import type { Wsol } from "../target/types/wsol";
import { MintLayout } from "@solana/spl-token";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { getRandomTicker } from "./utils";

describe("wSOL", async () => {
    const TICKER = getRandomTicker();
    let signer = web3.Keypair.fromSecretKey(
        new Uint8Array([
            134, 187, 107, 218, 184, 103, 224, 208, 239, 235, 253, 97, 162, 250,
            204, 7, 214, 102, 229, 32, 41, 214, 55, 165, 8, 229, 143, 234, 169,
            230, 250, 102, 45, 13, 103, 182, 81, 191, 228, 165, 215, 109, 233,
            248, 171, 36, 148, 234, 66, 144, 139, 109, 39, 190, 182, 25, 240,
            54, 40, 224, 9, 115, 70, 24,
        ]),
    );
    let connection = new web3.Connection("http://localhost:8899");
    setProvider(new AnchorProvider(connection, new Wallet(signer)));

    const wsolProgram: Program<Wsol> = anchor.workspace.Wsol as Program<Wsol>;

    try {
        // -> CREATION CODE
        let tx = await wsolProgram.methods
            .createToken(TICKER)
            .accounts({
                creator: signer.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
            })
            .signers([signer])
            .rpc();
        console.log({ tx });

        // -> CALCULATE MINT ACCOUNT PDA
        const [mint_account] = anchor.web3.PublicKey.findProgramAddressSync(
            [
                Buffer.from("token-2022"),
                signer.publicKey.toBuffer(),
                Buffer.from(TICKER),
            ],
            wsolProgram.programId,
        );
        const mint_data = await connection.getAccountInfo(mint_account);

        // -> LOGS
        console.log(`Signer: ${signer.publicKey}`);
        console.log(`PDA (mint_account): ${mint_account}`);
        if (mint_data?.data) {
            console.log(MintLayout.decode(mint_data.data));
        }
    } catch (err) {
        console.error(err);
    }
});
