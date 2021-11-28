<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <b-container>
      <SongList />
    </b-container>
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
