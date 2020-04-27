<template>
  <div>
    <div>temp: {{tempature}} deg f</div>
    <div>
      <h1>Archival Data</h1>
      <select @change="goToYear" v-model="selectedYear">
        <option disabled selected>-select Year-</option>
        <option v-for="year in years" :key="year" :value="year">{{year}}</option>
      </select>
      <select @change="goToMonth" v-model="selectedMonth">
        <option disabled selected>-select Month-</option>
        <option v-for="month in months" :key="month" :value="month">{{month}}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { getJson, arrayFromRange, dateRange } from "./utils.js";
import config from "./config.js";

export default {
  name: "weather",
  async mounted() {
    let weatherjson = await getJson(config.weatherURL);
    weatherjson;
    this.tempature = parseFloat(weatherjson.stats.current.outTemp);
  },
  data() {
    return {
      tempature: undefined,
      selectedMonth: undefined,
      selectedYear: undefined
    };
  },
  computed: {
    years() {
      let now = new Date();
      return arrayFromRange(config.startingYear, now.getFullYear());
    },
    months() {
      let now = new Date();
      return dateRange(
        `${config.startingYear}-${config.startingMonth}`,
        `${now.getFullYear()}-${now.getMonth()}`
      );
    }
  },
  methods: {
    goToYear() {
      let target = `NOAA/NOAA-${this.selectedYear}.txt`;
      window.location = config.baseURL + target;
    },
    goToMonth() {
      let target = `NOAA/NOAA-${this.selectedMonth}.txt`;
      window.location = config.baseURL + target;
    }
  }
};
</script>

<style>
</style>