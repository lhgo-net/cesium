<template>
  <div class="bottom-container">
    <v-card class="mx-auto" max-width="400" height="260">
      <v-card-item>
        <template v-slot:title>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <strong>今天</strong>
            <p style="font-size: 12px">{{ upDate }}更新</p>
          </div>
        </template>
        <template v-slot:subtitle>
          {{ days() }}
        </template>
      </v-card-item>
      <v-card-text class="py-0">
        <v-row align="center" no-gutters>
          <v-col class="text-h3" cols="12"> {{ now.temperature }}℃ </v-col>

          <!-- <v-col class="text-right" cols="6">
            <v-icon
              color="error"
              icon="mdi-weather-hurricane"
              size="88"
            ></v-icon>
          </v-col> -->
        </v-row>
      </v-card-text>

      <div class="d-flex py-3 justify-space-between">
        <v-list-item density="compact" prepend-icon="mdi-wind-turbine">
          <v-list-item-subtitle>{{ now.windDirection }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item density="compact" prepend-icon="mdi-weather-windy">
          <v-list-item-subtitle>{{ now.windScale }}</v-list-item-subtitle>
        </v-list-item>
      </div>
      <div class="d-flex py-3 justify-space-between">
        <v-list-item
          density="compact"
          prepend-icon="mdi-car-brake-low-pressure"
        >
          <v-list-item-subtitle>{{ now.pressure }}hPa</v-list-item-subtitle>
        </v-list-item>
        <v-list-item density="compact" prepend-icon="mdi-cup-water">
          <v-list-item-subtitle>{{ now.precipitation }}mm</v-list-item-subtitle>
        </v-list-item>
      </div>
    </v-card>
    <v-card
      v-for="item in data"
      :key="item"
      class="mx-auto"
      max-width="400"
      height="260"
      border
    >
      <v-card-item>
        <template v-slot:title>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <strong>{{ dayToWeek(item.date) }}</strong>
            <p style="font-size: 12px">{{ upDate }}更新</p>
          </div>
        </template>
        <template v-slot:subtitle>
          {{ item.date }}
        </template>
      </v-card-item>
      <v-card-text style="width: 250px">
        <!-- <v-row align="center" no-gutters>
          <v-col class="text-h4" cols="6"> 64&deg;F </v-col>

          <v-col class="text-right" cols="6">
            <v-icon
              color="error"
              icon="mdi-weather-hurricane"
              size="88"
            ></v-icon>
          </v-col>
        </v-row> -->
        <div class="d-flex align-center">
          <v-list-item>
            <v-list-item-subtitle>{{ item.dayText }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-subtitle>{{ item.nightText }}</v-list-item-subtitle>
          </v-list-item>
        </div>
        <div class="d-flex align-center">
          <v-list-item>
            <v-list-item-subtitle>{{
              item.dayWindDirection
            }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-subtitle>{{
              item.nightWindDirection
            }}</v-list-item-subtitle>
          </v-list-item>
        </div>
        <div class="d-flex align-center">
          <v-list-item>
            <v-list-item-subtitle>{{ item.dayWindScale }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-subtitle>{{
              item.nightWindScale
            }}</v-list-item-subtitle>
          </v-list-item>
        </div>
      </v-card-text>

      <div class="d-flex py-3 align-center">
        <v-list-item>
          <v-list-item-subtitle
            ><strong>{{ item.low }}℃</strong></v-list-item-subtitle
          >
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-subtitle
            ><strong>{{ item.high }}℃</strong></v-list-item-subtitle
          >
        </v-list-item>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import moment from "moment";

const data = ref([]);

const now = ref({
  precipitation: 0,
  temperature: 28.6,
  pressure: 879,
  humidity: 59,
  windDirection: "",
  windDirectionDegree: 171,
  windSpeed: 2.6,
  windScale: "",
});

const upDate = ref();

const days = () => {
  return moment().format("YYYY/MM/DD");
};

const dayToWeek = (day) => {
  const week = moment(day).weekday();
  switch (week) {
    case 1:
      return "星期一";
    case 2:
      return "星期二";
    case 3:
      return "星期三";
    case 4:
      return "星期四";
    case 5:
      return "星期五";
    case 6:
      return "星期六";
    case 0:
      return "星期天";
  }
};

onMounted(() => {
  axios
    .get("/weather", {
      params: {
        url: "https://weather.cma.cn/api/weather/view?stationid=57905",
      },
    })
    .then((res) => {
      data.value = res.data.data.daily;
      now.value = res.data.data.now;
      upDate.value = res.data.data.lastUpdate;
    });
});
</script>

<style scoped>
.v-card {
  background: rgba(46, 96, 153, 0.8);
  color: white;
}
.bottom-container {
  color: white;
  display: flex;
  /* align-items: center; */
  justify-content: center;
}
</style>
