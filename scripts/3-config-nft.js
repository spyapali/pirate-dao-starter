import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDrop = await sdk.getContract("0x5d5946F1Fa745E8850ce8d88451f22978eE70F89", "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Pirate's Chest",
                description: "An NFT to signify that you are a member of PirateDAO",
                image: readFileSync("scripts/assets/treasureChest.png"),
            }
        ])
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (err) {
        console.log("failed to create a new NFT in the drop, error")
        console.log({ err })
    }
})();