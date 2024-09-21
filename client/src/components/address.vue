<template>
  <div>Tọa Độ X: {{ coords.latitude }}</div>
  <div>Tọa Độ Y: {{ coords.longitude }}</div>
  <button @click="openMap()">Open Map</button>
</template>

<script setup>
import { ref } from "vue";

let coords = ref({});

navigator.geolocation.getCurrentPosition(
  (position) => {
    coords.value = position.coords;
  },
  (err) => {
    console.log(err);
  }
);

const openMap = () => {
  console.log(position.coords);
};
</script>
