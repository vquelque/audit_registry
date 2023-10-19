// store.js
import { reactive } from "vue";

export const store = reactive({
  address: "",
  chainId: 0,
  pendingTransactions: 0
});
