import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        // This is the address of our ERC-20 contract printed out in the step before. 
        const token = await sdk.getContract("0x876F1526b481EE99c68D6a51141031446DF67e6F", "token");
        // What's the max supply you want to set? 
        const amount = 1_000_000;
        // Interact with deployed ERC-20 contract and mint the tokens!
        await token.mint(amount);
        const totalSupply = await token.totalSupply();

        // Print how many of our tokens are out there now!
        console.log("✅ There now is", totalSupply.displayValue, "$GOLD in circulation");
    } catch (error) {
        console.error("Failed to print money, error:", error);
    }
})();