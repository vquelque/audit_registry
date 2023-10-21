<template>
  <div>
    <div v-if="isLoading" class="flex justify-center items-center h-screen">
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"
      ></div>
    </div>
    <div class="justify-center mx-auto mt-32 w-1/2">
      <div class="p-6 bg-white shadow-md rounded-lg">
        <h1 class="text-xl font-bold mb-2">
          Audits for contract
          <p class="font-mono inline text-gray-500 font-extralight text-sm">
            {{ contractAddress }}
          </p>
          <br />with codehash
          <p class="font-mono inline text-gray-500 font-extralight text-sm">
            {{ codehash }}
          </p>
          <br />on chain

          <select
            v-model="selectedChainId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-2"
          >
            <option v-for="chain in chains" :key="chain.id" :value="chain.id">
              {{ chain.name }}
            </option>
          </select>
        </h1>
        <div v-if="validAudit" class="flex items-center text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="h-6 w-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>

          <p>
            There is at least one valid audit for the current version of this
            contract.
          </p>
        </div>

        <div v-else class="flex items-center text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
            class="h-6 w-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <p>No valid audit found for the current version of this contract.</p>
        </div>
      </div>
    </div>
    <div class="flex h-full justify-center mx-auto pt-8">
      <div class="w-1/3 pr-4 h-full">
        <h2 class="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Audits
        </h2>
        <div class="overflow-scroll h-full">
          <div
            v-for="audit in audits"
            :key="audit.id"
            @click="selectedAudit = audit"
            class="bg-white shadow overflow-hidden sm:rounded-lg mb-4 cursor-pointer"
          >
            <div class="px-4 py-5 sm:px-6">
              <div class="flex justify-between">
                <h3 class="text-lg leading-6 font-medium text-gray-900 flex">
                  {{ audit.name }}
                </h3>
                <span
                  :class="
                    audit.isValid
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  "
                  class="px-2 py-1 font-semibold leading-tight text-sm rounded-full"
                >
                  {{ audit.isValid ? "OK" : "NOK" }}
                </span>
              </div>
              <p class="mt-1 max-w-2xl text-sm text-gray-600">
                {{ audit.company }}
              </p>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                {{ audit.date }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-1/2 pl-4 h-full sticky top-20 self-start"
        v-if="selectedAudit"
      >
        <h2 class="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Audit Details
        </h2>
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              {{ selectedAudit.name }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Audit Company: {{ selectedAudit.company }}
            </p>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Date: {{ selectedAudit.date }}
            </p>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Contract CodeHash: {{ selectedAudit.codeHash }}
            </p>
            <div
              class="mt-1 max-w-2xl text-sm text-gray-500"
              v-if="selectedAudit.associatedAddresses.length"
            >
              <p>Related Addresses:</p>

              <ul class="list-disc list-inside">
                <li
                  v-for="address in selectedAudit.associatedAddresses"
                  :key="address"
                  class="hover:text-indigo-600 cursor-pointer"
                >
                  <router-link
                    :to="{ name: 'contract', params: { address: address } }"
                    >{{ address }}</router-link
                  >
                </li>
              </ul>
            </div>

            <div class="mt-2">
              <a
                :href="selectedAudit.link"
                class="text-indigo-600 hover:text-indigo-900"
                target="_blank"
                >View Audit</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref, watch } from "vue";
import { useRoute } from "vue-router";
import { readContracts } from "@wagmi/core";
import { SUPPORTED_NETWORKS } from "@/constants";
import { REGISTRY_ABI } from "@/abi/AuditRegistry";
import { isValidAddress } from "@/utils/utils";

const route = useRoute();
const selectedAudit = ref();
const contractAddress = ref();
const codehash = ref();
const audits = ref();
const validAudit = ref();
const isLoading = ref(true);

const chains = SUPPORTED_NETWORKS;
const selectedChainId = ref(11155111); // default value

type Artifact = {
  owner: string;
  codeHash: string;
  chainid: number;
  link: string;
  name: string,
  company: string;
  related: string[];
};

interface AuditEntry {
  id: number;
  name: string;
  link: string;
  company: string;
  date: Date;
  contractHash: string;
  associatedAddresses: Array<string>;
  isValid: boolean;
}

const setRef = (
  data: any,
  r: Ref<any>,
  processData?: (...args: any[]) => any,
  ...processDataArgs: any[]
) => {
  if (data && data.status == "success") {
    r.value = processData
      ? processData(data.result, ...processDataArgs)
      : data.result;
  } else {
    r.value = "";
    console.log("Failed to fetch data from RPC");
    if (data.error) {
      console.log(data.error);
    }
  }
};

const checkValidAudit = (audits: Artifact[], codehash: string) =>
  audits ? audits.some((a) => a.codeHash == codehash) : false;

const processAudits = (audits: Artifact[], codehash: string) => {
  return audits.map<AuditEntry>((a, idx) => ({
    id: idx,
    name: a.name,
    link: a.link,
    company: a.company,
    date: new Date().toLocaleDateString(),
    codeHash: a.codeHash,
    associatedAddresses: a.related,
    isValid: a.codeHash == codehash,
  }));
};

const fetchData = async () => {
  if (!contractAddress.value) {
    return;
  }

  const registryContract = {
    address: chains.find((n) => n.id == selectedChainId.value)?.registryAddress,
    abi: REGISTRY_ABI,
    chainId: selectedChainId.value,
  } as const;
  const data = await readContracts({
    contracts: [
      {
        ...registryContract,
        functionName: "getCodeHash",
        args: [contractAddress.value],
      },
      {
        ...registryContract,
        functionName: "getArtifacts",
        args: [contractAddress.value],
      },
    ],
  });
  setRef(data[0], codehash);
  setRef(data[1], audits, processAudits, codehash.value);
  validAudit.value = checkValidAudit(audits.value, codehash.value);
  isLoading.value = false;
};

watch(
  () => route.params,
  async (newParams, oldParams) => {
    if (newParams.address != oldParams.address) {
      if (isValidAddress(newParams.address)) {
        contractAddress.value = newParams.address;
        fetchData();
      }
    }
  },
);

watch(selectedChainId, async (newChainId, _) => {
  if (chains.some((c) => c.id === newChainId)) {
    fetchData();
  }
});

onMounted(() => {
  contractAddress.value = route.params.address;
  fetchData();
});
</script>
