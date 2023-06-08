import sdk from "./1-initialize-sdk.js";

import { ethers } from "ethers";

(async () => {
    try {
        // This is our governance contract. 
        const vote = await sdk.getContract("0x620477a2c469645EC7b89C0c08f8Ca8955d65780", "vote");
        // This is our ERC-20 Contract
        const token = await sdk.getContract("0x876F1526b481EE99c68D6a51141031446DF67e6F", "token");
        // Create proposal to mint 420,000 new token to the treasury 
        const amount = 420_000;
        const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
        const executions = [
            {
                // our token contract that actually executes the mint
                toAddress: token.getAddress(),
                // our nativeToken is ETH. nativeTokenValue is the amount of ETH we want to send in the proposal. 
                // In this case, we're sending 0 eth. We're just minting new tokens to the treasury. So set to 0. 
                nativeTokenValue: 0,
                // We're doing a mint! And, we're minting to the vote, which is acting as our treasury.
                // in this case, we need to use etheres.js to convert the amount 
                // to the correct format for the mint function. This is because the amount it requires is in wei. 
                transactionData: token.encoder.encode("mintTo", [vote.getAddress(), ethers.utils.parseEther(amount.toString(), 18)])
            }
        ]
        await vote.propose(description, executions);
        console.log("✅ Successfully created proposal to mint " + amount + " tokens to the treasury");
    } catch (error) {
        console.error("Failed to create proposal to mint tokens to the treasury", error);
        process.exit(1)
    }
    try {
        // This is our governance contract.
        const vote = await sdk.getContract("0x620477a2c469645EC7b89C0c08f8Ca8955d65780", "vote");

        const description = "Should we purchase a ship for the DAO?";

        await vote.propose(description);

        console.log(
            "✅ Successfully created proposal to purchase a ship for the DAO!"
        );
    } catch (error) {
        console.error("failed to create second proposal", error);
    }
})();