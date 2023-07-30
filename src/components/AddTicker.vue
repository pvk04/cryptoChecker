<template>
  <section>
    <div class="flex">
      <div class="max-w-xs">
        <label for="wallet" class="block text-sm font-medium text-gray-700"
          >Тикер</label
        >
        <div class="mt-1 relative rounded-md shadow-md">
          <input
            type="text"
            name="wallet"
            id="wallet"
            v-model="ticker"
            class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            placeholder="Например DOGE"
          />
        </div>
        <div
          v-if="ticker"
          class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap"
        >
          <span
            v-for="coin in filteredCoinList"
            :key="coin"
            @click="ticker = coin"
            class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
          >
            {{ coin }}
          </span>
        </div>
        <div v-if="!isValidTicker" class="text-sm text-red-600">
          Такой тикер уже добавлен
        </div>
      </div>
    </div>
    <add-button
      @click="add($event)"
      type="button"
      class="my-4"
      :disabled="!isValidTicker || ticker.length === 0"
    />
  </section>
</template>

<script>
import AddButton from "./AddButton";

export default {
  components: {
    AddButton,
  },

  props: {
    validate: {
      type: Function,
      required: false,
    },
    filterCoinList: {
      type: Function,
      required: false,
    },
  },

  emits: {
    "add-tikcer": (value) => typeof value === "string" && value.length > 0,
  },

  data() {
    return {
      ticker: "",
    };
  },

  computed: {
    isValidTicker() {
      return this.validate(this.ticker);
    },

    filteredCoinList() {
      return this.filterCoinList(this.ticker);
    },
  },

  methods: {
    add() {
      if (this.ticker.length === 0 || !this.isValidTicker) return;

      this.$emit("add-ticker", this.ticker);
      this.ticker = "";
    },
  },

  watch: {
    ticker() {
      this.ticker = this.ticker.toUpperCase();
    },
  },
};
</script>
