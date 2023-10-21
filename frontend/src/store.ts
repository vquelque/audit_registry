// store.js
import { reactive } from "vue";

export const store = reactive({
  address: "",
  chainId: undefined,
  pendingTransactions: 0,
});
