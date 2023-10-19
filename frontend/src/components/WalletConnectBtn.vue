<script setup lang="ts">
import { SEPOLIA_CHAIN_ID, INFURA_KEY } from "@/constants";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import {
  configureChains,
  createConfig,
  connect,
  switchNetwork,
  watchAccount,
  watchNetwork,
  sepolia,
} from "@wagmi/core";
import { infuraProvider } from "@wagmi/core/providers/infura";
import { publicProvider } from "@wagmi/core/providers/public";
import { store } from "@/store";

const injectedConnector = new InjectedConnector();

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: INFURA_KEY }), publicProvider()],
);

const config = createConfig({
  autoConnect: true,
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
    store.address = account;
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
    store.address = "";
  }
  if (account.isConnected) {
    store.address = account.address;
  }
});

watchNetwork((network) => {
  store.chainId = network.chain.id;
});
</script>

<template>
  <button
    v-if="!store.address"
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
    {{ store.address }}
  </button>
</template>
