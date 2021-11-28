<template>
  <div>
    <b-row>
      <div class="col">
        <h2>Your recently played tracks:</h2>
      </div>
    </b-row>

    <b-row>
      <div class="col">
        <p>
          Please click on the login button and then click on the retrive button
          to get your played tracks.
        </p>
      </div>
    </b-row>

    <b-row>
      <div class="col">
        <b-button variant="success" v-on:click="login" class="m-1"
          >Login</b-button
        >
        <b-button variant="outline-primary" v-on:click="getlist"
          >Retrive list</b-button
        >
      </div>
    </b-row>

    <b-row>
      <div class="col-2">
        <b-nav vertical class="left-menu">
          <b-nav-item v-for="artist in artists" v-bind:key="artist">{{
            artist
          }}</b-nav-item>
        </b-nav>
      </div>
      <div class="col-8">
        <div>
          <div class="d-flex">
            <b-card
              v-for="song in songList"
              v-bind:key="song"
              v-bind:title="song.Title"
              v-bind:img-src="song.ImageUrl"
              img-alt="track image"
              img-top
              style="max-width: 20rem"
              class="mb-2"
            >
              <b-card-text>
                <p>
                  <span class="font-weight-bold">Artist:</span>
                  {{ song.Artist }}
                </p>
              </b-card-text>

              <b-button href="#" variant="primary" class="w-100"
                ><b-icon icon="play-circle"></b-icon
              ></b-button>
            </b-card>
          </div>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import { Inject } from "inversify-props";
import Song from "@/model/song";

@Component
export default class SongList extends Vue {
  @Inject()
  private spotifyService!: ISpotifyService;

  @Prop()
  private songList!: Song[];

  @Prop()
  private artists!: string[];

  protected async mounted(): Promise<void> {
    await this.getInfo();
  }

  async getlist(): Promise<void> {
    this.songList = await this.spotifyService.getRecentlyPlayedList();
    this.artists = await this.spotifyService.getRecentlyPlayedArtists();
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
.font-weight-bold {
  font-weight: bold;
}
.card-title {
  height: 5rem;
}
.left-menu {
  background-color: #eeeeee;
  border-radius: 10px;
}
</style>
