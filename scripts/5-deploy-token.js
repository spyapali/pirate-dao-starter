import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const tokenAddress = await sdk.deployer.deployToken({
            // what's your token's name? Ex. "Ethereum"
            name: "PirateDAO Governance Token",
            // what's your token's symbol? Ex. "ETH"
            symbol: "GOLD",
            // This will be in the case we want to sell our token, because we don't, we set it to Address Zero
            primary_sale_recipient: AddressZero,

        });
        console.log(
            "✅ Successfully deployed token contract, address:",
            tokenAddress,
        );
    } catch (error) {
        console.error("Failed to deploy token contract, error:", error);
    }
})();