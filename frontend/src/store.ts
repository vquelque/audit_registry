// store.js
import type { Address } from "viem";
import { reactive, unref } from "vue";

interface Store {
  address: Address | undefined;
  chainId: number | undefined;
  pendingTransactions: number;
}

export const store = reactive({
  address: undefined,
  chainId: undefined,
  pendingTransactions: 0,
} as Store);
