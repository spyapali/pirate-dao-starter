import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        // This is our governance contract
        const vote = await sdk.getContract(
            "0x620477a2c469645EC7b89C0c08f8Ca8955d65780",
            "vote"
        );
        // This is our ERC-20 contract
        const token = await sdk.getContract(
            "0x876F1526b481EE99c68D6a51141031446DF67e6F",
            "token"
        );
        // Give our treasury the power to mint additional token if needed
        await token.roles.grant("minter", vote.getAddress());

        console.log(
            "Successfully gave vote contract permissions to act on token contract"
        );
    } catch (err) {
        console.error(
            "Failed to grant vote contract permissions on token contract",
            err
        );
        process.exit(1);
    }
    try {
        // This is our governance contract
        const vote = await sdk.getContract(
            "0x620477a2c469645EC7b89C0c08f8Ca8955d65780",
            "vote"
        );

        // This is our ERC-20 contract
        const token = await sdk.getContract(
            "0x876F1526b481EE99c68D6a51141031446DF67e6F",
            "token"
        );

        // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
        const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

        // Grab 90% of the supply we hold 
        const ownedAmount = ownedTokenBalance.displayValue;
        const percent90 = (Number(ownedAmount) / 100) * 90;

        // Transfer 90% of the supply to our voting contract so we can vote on proposals
        await token.transfer(vote.getAddress(), percent90);
        console.log(
            "✅ Successfully transferred " + percent90 + " tokens to vote contract"
        );
    } catch (err) {
        console.error("failed to transfer tokens to vote contract", err);
    }
})();
