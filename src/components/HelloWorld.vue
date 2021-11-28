<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>

    <h2>Recentrly played list:</h2>
    <button v-on:click="login">Login</button>
    <button v-on:click="getlist">Show list</button>
    <div>
      <ul>
        <li v-for="song in songList" v-bind:key="song">
          {{ song.track.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import { Inject } from "inversify-props";

@Component
export default class HelloWorld extends Vue {
  @Inject()
  private spotifyService!: ISpotifyService;

  @Prop()
  private msg!: string;

  @Prop()
  private songList!: any[];

  protected async mounted(): Promise<void> {
    await this.getInfo();
  }

  async getlist(): Promise<void> {
    let list = await this.spotifyService.getRecentlyPlayedList();
    this.songList = list.items;
  }

  login(): void {
    this.spotifyService.spotifyLogin();
  }

  getInfo(): void {
    this.spotifyService.spotifySetToken();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
