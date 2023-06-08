import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// deployed contract address: 0x5d5946F1Fa745E8850ce8d88451f22978eE70F89

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            // Collection's name: PirateDAO Membership
            name: "PirateDAO Membership",
            // Description of the collection
            description: "A DAO for Pirate Nation fans",
            // The image that will be held for the NFT! The fun part :) 
            image: readFileSync("scripts/assets/rainbowPirate.png"),
            // We need to pass in the address of the person who will be receiving the proceeds from sales of nfts in the contract.
            // We're planning on not charging people for the drop, so we'll pass in the 0x0 address
            // you can set this to your own wallet address if you want to charge for the drop.
            primary_sale_recipient: AddressZero,
        });
        // this initialization returns the address of the contract that was deployed
        // we use this to initialize the contract on the thirdweb sdk
        const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");
        // with this we can get the metadata of our contract
        const metadata = await editionDrop.metadata.get();

        console.log("✅ Successfully deployed edition drop contract:", editionDropAddress);
        console.log("✅ editionDrop metadata:", metadata);
    } catch (err) {
        console.log("failed to deploy editionDrop contract, error")
        console.log({ err })
    }
})();