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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ISpotifyService } from "@/services/Interfaces/spotifyService";
import { SpotifyService } from "@/services/spotifyService";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  getlist(): void {
    let spotifyObj: ISpotifyService = new SpotifyService();

    spotifyObj.getRecentlyPlayedList().then((result: any) => {
      console.log(result);
    });
  }
  login(): void {
    window.location.href =
      "https://accounts.spotify.com/authorize?response_type=code&client_id=f0e834a4b9a24469a41bb0dfe9c77d25&scope=user-read-private user-read-email&redirect_uri=http://localhost:8080/&state=FGTVPAOJFUGRWTOS";
    // this.$router.push(
    //   "https://accounts.spotify.com/authorize?response_type=code&client_id=f0e834a4b9a24469a41bb0dfe9c77d25&scope=user-read-private user-read-email&redirect_uri=http://localhost:8080/&state=FGTVPAOJFUGRWTOS"
    // );
    // this.$router.push({
    //   name: "login",
    //   params: {
    //     response_type: "code",
    //     client_id: "f0e834a4b9a24469a41bb0dfe9c77d25",
    //     scope: "user-read-private user-read-email",
    //     redirect_uri: "http://localhost:8080/",
    //     state: "FGTVPAOJFUGRWTOS",
    //   },
    // });
    console.log("Click!");
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
