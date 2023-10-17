<template>
  <ConnectWalletPopup :showAlert="showWalletPopup" @showAlert="closeWalletPopup"></ConnectWalletPopup>
  <div class="flex h-full items-center justify-center">
    <div class="max-w-4xl w-full space-y-1">
      <form @submit.prevent="submit()">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="flex">
            <input
              id="contract-address"
              name="contract-address"
              type="text"
              autocomplete="contract-address"
              required
              class="appearance-none rounded-l-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Input smart-contract address"
              v-model="address"
            />

            <button
              type="submit"
              class="inline-flex items-center justify-center w-12 rounded-r-md border border-transparent text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        role="alert"
        v-if="errorMessage"
      >
        <strong class="font-bold">Wait! </strong>
        <span class="block sm:inline">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router/index";
import { isValidAddress } from "@/utils/utils";
import { store } from "@/store";
import ConnectWalletPopup from "@/components/ConnectWalletPopup.vue";

const address = ref("");
const errorMessage = ref("");
const showWalletPopup = ref(false)

const closeWalletPopup = (e) => {
  showWalletPopup.value = false
}

const submit = () => {
  if (!isValidAddress(address.value)) {
    errorMessage.value = "This is not a valid smart-contract address";
    return;
  }

  if (!store.address) {
    showWalletPopup.value = true;
    return;
  }

  router.push({ name: "contract", params: { address: address.value } });
};
</script>
