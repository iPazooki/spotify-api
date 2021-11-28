<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="container">
      <SongList />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SongList from "@/components/SongList.vue"; // @ is an alias to /src

@Component({
  components: {
    SongList,
  },
})
export default class Home extends Vue {}
</script>
