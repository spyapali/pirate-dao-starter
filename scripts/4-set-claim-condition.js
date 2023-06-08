import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

(async () => {
    try {
        const editionDrop = await sdk.getContract("0x5d5946F1Fa745E8850ce8d88451f22978eE70F89", "edition-drop");
        const claimConditions = [{
            // When people are going to start claiming NFTs (now)
            startTime: new Date(),
            // The number of NFTs that can be claimed by a single address
            maxClaimable: 50_000,
            // The price of our NFT (free)
            price: 0,
            // The amount of NFTs people can claim in one transaction
            maxClaimablePerWallet: 1,
            // We set the wait between transactions to be unlimited, which means people are only allowed to claim once.
            waitInSeconds: MaxUint256
        }]
        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("✅ Successfully set claim condition!");
    } catch (err) {
        console.error("Failed to set claim condition", err);
    }
})()