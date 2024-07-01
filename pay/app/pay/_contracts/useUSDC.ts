import { baseSepolia, base } from "viem/chains";
import { generateContractHook } from "@/hooks/contracts";
import usdcAbi from "./usdcAbi";

/**
 * Returns contract data for the USDC contract.
 */
export const useUSDCContract = generateContractHook({
  abi: usdcAbi,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
  [base.id]: {
    chain: base,
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
});
