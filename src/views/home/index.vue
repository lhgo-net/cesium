<template>
  <v-sheet
    class="mx-auto pa-2"
    color="grey-lighten-4"
  >
    <div v-for="items in 3" :key="items">
      <div class="title">标题{{ items }}</div>
      <div style="display: flex;text-align: center;flex-wrap: wrap;justify-content: space-around;gap:20px 20px">
        <v-card v-for="item in 10"
          :key="item"
          variant="tonal"
          width="300px"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          ></v-img>
          <v-card-actions>案列{{ item }}</v-card-actions>
        </v-card>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
//
</script>

<style scoped>
.title{
  padding: 20px 0;
  font-size: 18px;
  font-weight: 1000;
}
</style>