<template>
  <div>
    <div class="container-fluid">
      <div class="row-12 text-center border mb-4 p-5">
        <h1>{{location}}</h1>
        <h2>{{when}}</h2>
      </div>
    </div>
    <div>outside: {{tempature}} deg f</div>
    <div>inside: {{intemp}} deg f</div>
    <div>wind: {{wind}}</div>
    <div>rain Total: {{rainTotal}}</div>
    <div>rain Rate: {{rainRate}}</div>
    <div>High: {{high}} deg f at {{highWhen}}</div>
    <div>Low: {{low}} deg f at {{lowWhen}}</div>
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
    this.fetchWeatherData();
    setTimeout(() => {
      this.fetchWeatherData();
    }, 5 * 60 * 1000); // 5 minutes
  },
  data() {
    return {
      tempature: undefined,
      intemp: undefined,
      rainTotal: undefined,
      rainRate: undefined,
      windSpeed: undefined,
      windDirection: undefined,
      windGust: undefined,
      high: undefined,
      low: undefined,
      selectedMonth: undefined,
      selectedYear: undefined,
      location: undefined,
      when: undefined
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
    },
    wind() {
      if (this.windSpeed == 0) {
        return "No Wind";
      }
      let wind = `${this.windDirection} ${this.windSpeed}`;
      if (this.windGust) {
        wind += `G${this.windGust}`;
      }
      wind += " MPH";
      return wind;
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
    },
    async fetchWeatherData() {
      let weatherjson = await getJson(config.weatherURL);
      weatherjson;
      this.tempature = parseFloat(weatherjson.stats.current.outTemp);
      this.low = parseFloat(weatherjson.stats.sinceMidnight.tempMinValue);
      this.lowWhen = weatherjson.stats.sinceMidnight.tempMinTime;
      this.high = parseFloat(weatherjson.stats.sinceMidnight.tempMaxValue);
      this.highWhen = weatherjson.stats.sinceMidnight.tempMaxTime;
      this.intemp = parseFloat(weatherjson.stats.current.insideTemp);
      this.windSpeed = parseFloat(weatherjson.stats.current.windSpeed);
      this.windDirection = parseFloat(weatherjson.stats.current.windDirection);
      this.windGust = parseFloat(weatherjson.stats.current.windGust);
      this.rainTotal = weatherjson.stats.sinceMidnight.rainSum;
      this.rainRate = weatherjson.stats.current.rainRate;
      this.location = weatherjson.location;
      this.when = weatherjson.time;
    }
  }
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>