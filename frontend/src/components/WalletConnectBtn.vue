<script setup lang="ts">
import { SEPOLIA_CHAIN_ID } from "@/constants";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import {
  configureChains,
  mainnet,
  createConfig,
  connect,
  switchNetwork,
  watchAccount,
} from "@wagmi/core";
import { publicProvider } from "@wagmi/core/providers/public";
import { ref } from "vue";

const address = ref("");

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
);

const injectedConnector = new InjectedConnector();

const config = createConfig({
  autoConnect: false,
  publicClient,
  webSocketPublicClient,
  connectors: [injectedConnector],
});

const connectWallet = async () => {
  try {
    const { account } = await connect({
      chainId: SEPOLIA_CHAIN_ID,
      connector: injectedConnector,
    });
    address.value = account;
    console.log(`Wallet ${account} connected`);
    await switchNetwork({
      chainId: SEPOLIA_CHAIN_ID,
    });
  } catch (e) {
    console.log(e);
  }
};

watchAccount((account) => {
  if (account.isDisconnected == true && !account.isReconnecting) {
    console.log(`Account is disconnected`);
    address.value = "";
  }
});
</script>

<template>
  <button
    v-if="!address"
    type="button"
    @click="connectWallet"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
  >
    Connect to a Wallet
  </button>
  <button
    v-else
    type="button"
    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
  >
    {{ address }}
  </button>
</template>
