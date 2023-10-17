<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import WalletConnectBtn from "@/components/WalletConnectBtn.vue";
import "./style.css";
</script>

<template>
  <div class="h-screen bg-gray-50 overflow-hidden flex flex-col">
    <header class="absolute top-10 left-0 w-full px-4 sm:px-6 lg:px-12">
      <nav class="flex items-center justify-between">
        <div>
          <RouterLink to="/"
            ><h1
              class="text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white"
            >
              <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                >smart contract</mark
              ><br />audit registry
            </h1></RouterLink
          >
        </div>
        <div>
          <WalletConnectBtn></WalletConnectBtn>
        </div>
      </nav>
    </header>

    <div class="flex-grow overflow-hidden">
      <RouterView />
    </div>
  </div>
</template>
