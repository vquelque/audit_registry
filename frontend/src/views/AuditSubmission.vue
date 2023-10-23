<template>
  <div class="mt-32">
    <div class="flex items-center justify-center">
      <div class="max-w-4xl w-full space-y-4">
        <form
          @submit.prevent="submit"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full"
        >
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="address"
              >Smart-contract address</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              v-model="form.address"
              type="text"
              required
              pattern="^0x[a-fA-F0-9]{40}$"
              title="Smart-contract address must be a valid Ethereum address"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="codeHash"
            >
              Code Hash
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="codeHash"
              v-model="form.codeHash"
              type="text"
              pattern="^0x[a-fA-F0-9]{64}$"
              title="Code hash must start with '0x' and be 66 characters long. If not provided, we'll fetch the codehash from the chain."
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="company"
              >Audit Company</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              v-model="form.company"
              type="text"
              required
              pattern="^[a-zA-Z0-9\s]+$"
              title="Audit company name can only contain alphanumeric characters and spaces"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
              >Audit name</label
            >
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              v-model="form.name"
              type="text"
              required
              pattern="^[a-zA-Z0-9\s]+$"
              title="Audit name name can only contain alphanumeric characters and spaces"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="chainid"
            >
              Network
            </label>
            <select
              class="shadow border appearance-none rounded w-full py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              id="chainid"
              v-model="form.chainid"
              required
            >
              <option
                v-for="chain in SUPPORTED_NETWORKS"
                :key="chain.id"
                :value="chain.id"
              >
                {{ chain.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="link"
            >
              Link
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="link"
              v-model="form.link"
              type="url"
              required
              title="Link must be a valid HTTP or IPFS URL"
            />
          </div>

          <div class="mb-4">
            <h2 class="text-xl font-bold mb-2">Related Addresses</h2>

            <div
              v-for="(related, index) in form.related"
              :key="index"
              class="mb-4 p-4 border rounded"
            >
              <div class="flex justify-between space-x-4 items-center">
                <div class="flex-col flex-grow">
                  <label
                    class="text-gray-700 text-sm font-bold mb-2"
                    :for="'related' + index"
                  >
                    Related Address
                  </label>

                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="'related' + index"
                    :name="'related' + index"
                    v-model="related.address"
                    type="text"
                    :required="isFieldFilled(index)"
                    pattern="^0x[a-fA-F0-9]{40}$"
                    title="Related address must be a valid Ethereum address"
                  />

                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    :for="'codeHash' + index"
                  >
                    Code Hash
                  </label>

                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    :id="'codeHash' + index"
                    :name="'codeHash' + index"
                    v-model="related.codeHash"
                    type="text"
                    pattern="^0x[a-fA-F0-9]{64}$"
                    title="Code hash must start with '0x' and be 66 characters long. If not provided, we'll fetch the codehash from the chain."
                  />
                </div>

                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded-full focus:outline-none focus:shadow-outline h-10 w-10"
                  type="button"
                  @click="removeRelated(index)"
                >
                  -
                </button>
              </div>
            </div>

            <button
              class="h-10 w-10 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              @click="addRelated"
            >
              +
            </button>
          </div>

          <div class="flex flex-col space-y-3">
            <div class="flex items-center justify-center">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
              role="alert"
              v-if="errorMessage"
            >
              <strong class="font-bold">Wait! </strong>
              <span class="block sm:inline">{{ errorMessage }}</span>
            </div>
            <div
              class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
              role="alert"
              v-if="successMessage"
            >
              <strong class="font-bold">Alrighty! </strong>
              <span class="block sm:inline">{{ successMessage }}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <ConnectWalletPopup
    :showAlert="showWalletPopup"
    @showAlert="closeWalletPopup"
  ></ConnectWalletPopup>
</template>

<script setup lang="ts">
import { ref, type Ref, toRaw } from "vue";
import { store } from "@/store";
import {
  SEPOLIA_CHAIN_ID,
  SUPPORTED_NETWORKS,
  SCROLL_SEPOLIA_CHAIN_ID,
} from "@/constants";
import ConnectWalletPopup from "@/components/ConnectWalletPopup.vue";
import { hasDuplicateInArray } from "@/utils/utils";
import { REGISTRY_ABI } from "@/abi/AuditRegistry";
import { waitForTransaction, getWalletClient } from "@wagmi/core";
import { encodeFunctionData, type Address } from "viem";
import { sepolia, scrollSepolia } from "viem/chains";

const registryContract = {
  abi: REGISTRY_ABI,
} as const;

const showWalletPopup = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const closeWalletPopup = (e: Event) => {
  showWalletPopup.value = false;
};

const initialFormState = {
  address: "",
  codeHash: "",
  chainid: 11155111,
  link: "",
  company: "",
  name: "",
  related: [{ address: "", codeHash: "" }],
};

const form = ref({ ...initialFormState });

const isFieldFilled = (index: number) => {
  let related = form.value.related[index];
  return !!(related && (related.address || related.codeHash));
};

const addRelated = () => {
  form.value.related.push({ address: "", codeHash: "" });
};

const removeRelated = (index: number) => {
  form.value.related.splice(index, 1);
};

const resetForm = (form: Ref) => (form.value = initialFormState);

const sanitizeRelated = (
  form: Ref<{
    address: string;
    codeHash: string;
    chainid: number;
    link: string;
    company: string;
    related: {
      address: string;
      codeHash: string;
    }[];
  }>,
) => {
  const addresses = form.value.related
    .map((related) => related.address)
    .filter((r) => r);
  addresses.push(form.value.address);
  const codeHashes = form.value.related
    .map((related) => related.codeHash)
    .filter((c) => c);
  codeHashes.push(form.value.codeHash);

  return !hasDuplicateInArray(addresses) && !hasDuplicateInArray(codeHashes);
};

const getChainForID = (chainId: number) => {
  switch (chainId) {
    case SEPOLIA_CHAIN_ID:
      return sepolia;
    case SCROLL_SEPOLIA_CHAIN_ID:
      return scrollSepolia;
  }
};

const sendToContract = async (form: any) => {
  if (
    !form.value.address ||
    !form.value.link ||
    !form.value.company ||
    !form.value.name ||
    !form.value.chainid
  ) {
    console.log(`missing fields to submit form to blockchain`);
    return;
  }

  const selectedChainId = form.value.chainid;
  const selectedNetwork = SUPPORTED_NETWORKS.find(
    (n) => n.id == selectedChainId,
  );

  if (!selectedNetwork) {
    console.error(`Network with id ${selectedChainId} not supported`);
    return;
  }

  const allRelatedArray = toRaw(form.value.related).filter(
    (r: any) => r.address,
  ); //collect values
  const allRelatedAddresses = allRelatedArray.map(
    (r: { address: string; codehash: string }) => r.address,
  );
  allRelatedAddresses.push(form.value.address);

  //bundle transactions in a multicall for registering an audit entry for the current contract and related contracts
  const allTx = [];
  const allRelated = [
    { address: form.value.address, codeHash: form.value.codeHash },
    ...allRelatedArray,
  ];
  for (const r of allRelated) {
    //for each related entry
    const codeHash =
      r.codeHash !== ""
        ? r.codeHash
        : "0x0000000000000000000000000000000000000000000000000000000000000000";
    const tx = {
      ...registryContract,
      address: selectedNetwork.registryAddress,
      functionName: "add",
      args: [
        r.address,
        form.value.link,
        form.value.company,
        form.value.name,
        codeHash,
        allRelatedAddresses.filter((a: string) => a !== r.address), //remove curr address from related
      ],
    };
    allTx.push(tx);
  }

  const allEncodedTx = allTx.map((tx: any) => encodeFunctionData(tx));

  const walletClient = await getWalletClient({ chainId: selectedChainId });
  if (!walletClient) {
    console.log("No connected web3 wallet");
    return;
  }

  //Simulating a multicall doesn't work for some reason.
  //So we do not simulate to check for errors.
  //Wagmi do not enable to disable simulation for "writeContract"
  //So, instead we just rely on viem simulation

  try {
    const tx = {
      ...registryContract,
      address: selectedNetwork.registryAddress as Address,
      functionName: "multicall",
      chain: getChainForID(selectedChainId),
      args: [allEncodedTx],
    } as const;
    const txHash = await walletClient.writeContract(tx);
    ++store.pendingTransactions;
    waitForTransaction({ hash: txHash }).then(
      (_) => --store.pendingTransactions,
    );
    successMessage.value = `Your audit has been submitted on chain! Here is the tx hash ${txHash}`;
    console.log(`form submitted. tx hash: ${txHash}`);
    resetForm(form);
  } catch (error: any) {
    console.log("error while submitting tx to contract");
    console.log(error);
    if (error.shortMessage) {
      errorMessage.value = error.shortMessage;
    } else {
      errorMessage.value =
        "An unknown error happened while sending the transaction to the registry contract.";
    }
  }
};

const submit = async () => {
  if (!store.address) {
    showWalletPopup.value = true;
    return;
  }
  if (!SUPPORTED_NETWORKS.some((n) => n.id == store.chainId)) {
    //network is not supported
    showWalletPopup.value = true;
    return;
  }

  if (!sanitizeRelated(form)) {
    errorMessage.value =
      "There are duplicate entries (codehash/address) in the related addresses, or it overlaps with the main contract codehash/address. Please check your input.";
    return;
  }
  //success
  errorMessage.value = "";
  sendToContract(form);
};
</script>
