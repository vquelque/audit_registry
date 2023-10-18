<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import WalletConnectBtn from "@/components/WalletConnectBtn.vue";
import "./style.css";
</script>

<template>
  <div class="h-screen bg-gray-50 overflow-auto flex flex-col">
    <header class="absolute py-3 sm:py-6 left-0 w-full px-4 sm:px-6 lg:px-12 bg-gray-50">
      <nav class="flex items-center justify-between">
        <div>
          <RouterLink to="/"
            ><h1
              class="text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white"
            >
              <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"
                >smart contract</mark
              ><br />audit registry
            </h1></RouterLink>
        </div>
        <div class="flex items-center space-x-5">
          <RouterLink to="/submit"><h1
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >Submit an audit</h1></RouterLink>
          <WalletConnectBtn></WalletConnectBtn>
        </div>
      </nav>
    </header>

    <div class="flex-grow overflow-auto">
      <RouterView />
    </div>
  </div>
</template>
