<template>
  <div class="flex h-full items-center justify-center">
    <div class="max-w-4xl w-full space-y-4">
      <form
        @submit.prevent="submit"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
            required
            pattern="^0x[a-fA-F0-9]{64}$"
            title="Code hash must start with '0x' and be 66 characters long"
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
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="chainid"
          >
            Chain ID
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="chainid"
            v-model="form.chainid"
            type="number"
            required
            min="1"
            title="Chain ID must be a stricly positive number"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="link">
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
                  v-model="related.address"
                  type="text"
                  required
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
                  v-model="related.codeHash"
                  type="text"
                  required
                  pattern="^0x[a-fA-F0-9]{64}$"
                  title="Code hash must start with '0x' and be 66 characters long"
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

        <div class="flex items-center justify-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  address: '',
  codeHash: '',
  chainid: '',
  link: '',
  company: '',
  related: [{ address: '', codeHash: '' }],
});

const addRelated = () => {
  form.value.related.push({ address: '', codeHash: '' });
};

const removeRelated = (index) => {
  form.value.related.splice(index, 1);
};

const submit = () => {
  console.log(form);
  //send form to audit contract
};
</script>
