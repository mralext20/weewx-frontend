<template>
  <div>temp: {{tempature}} deg f</div>
</template>

<script>
import { getJson } from "./utils.js";
import config from "./config.js";

export default {
  async mounted() {
    let weatherjson = await getJson(config.weatherURL);
    weatherjson;
    this.tempature = parseFloat(weatherjson.stats.current.outTemp);
  },
  data() {
    return {
      tempature: undefined
    };
  },
  computeds: {}
};
</script>

<style>
</style>