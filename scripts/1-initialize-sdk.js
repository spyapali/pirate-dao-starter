import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// Import and configure .env file to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

// some quick checks to make sure our .env file is configured correctly
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY === "") {
    throw new Error("PRIVATE_KEY is not defined");
}

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL === "") {
    throw new Error("ALCHEMY_API_URL is not defined");
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS === "") {
    throw new Error("WALLET_ADDRESS is not defined");
}

const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, process.env.ALCHEMY_API_URL);

(async () => {
    try {
        const address = await sdk.getSigner().getAddress();
        console.log("👋 SDK initialized by address:", address)
    } catch (err) {
        console.error("Failed to get apps from the sdk", err);
        process.exit(1)
    }
}
)()
export default sdk;