import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        // This is the address to our ERC-1155 membership NFT contract!
        const editionDrop = await sdk.getContract("0x5d5946F1Fa745E8850ce8d88451f22978eE70F89", "edition-drop");
        // This is the address to our ERC-20 contract!
        const token = await sdk.getContract("0x876F1526b481EE99c68D6a51141031446DF67e6F", "token");
        // Grab all the addresses of people who own our membership NFT, which has a token ID of 0.
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddresses.length === 0) {
            console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!");
            process.exit(0)
        }

        // loop through all the addresses and send them some $HOKAGE!
        const airdropTargets = walletAddresses.map((address) => {
            // Pick a random # between 1000 and 2000
            const randomAmount = Math.floor(Math.random() * 901) + 100;
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // set up the target
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
            return airdropTarget;
        })
        // call transferBatch on all our airdrop targets
        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all holders of the NFT!");
    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();