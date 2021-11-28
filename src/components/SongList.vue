<template>
  <div class="row">
    <div class="col">
      <h2>Her you can see list of your recently played tracks:</h2>

      <div>
        <b-alert variant="success" show>Please login:</b-alert>
        <b-button variant="success" v-on:click="login">Login</b-button>
      </div>

      <div>
        <b-button variant="outline-primary" v-on:click="getlist"
          >Retrive list</b-button
        >

        <div>
          <ul>
            <li v-for="song in songList" v-bind:key="song">
              {{ song.track.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import { Inject } from "inversify-props";

@Component
export default class SongList extends Vue {
  @Inject()
  private spotifyService!: ISpotifyService;

  @Prop()
  private songList!: any[];

  protected async mounted(): Promise<void> {
    await this.getInfo();
  }

  async getlist(): Promise<void> {
    let list = await this.spotifyService.getRecentlyPlayedList();
    this.songList = list.items;
    console.log("list: " + this.songList);
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
