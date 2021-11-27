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
  constructor() {
    super();
    this.getInfo();
  }
  @Prop() private msg!: string;
  getlist(): void {
    debugger;
    let spotifyObj: ISpotifyService = new SpotifyService();

    spotifyObj.getRecentlyPlayedList().then((result: any) => {
      console.log(result);
    });
  }
  login(): void {
    window.location.href =
      "https://accounts.spotify.com/authorize?response_type=code&client_id=f0e834a4b9a24469a41bb0dfe9c77d25&scope=user-read-private%20user-read-email&redirect_uri=http://localhost:8080/&state=FGTVPAOJFUGRWTOD";
  }

  getInfo(): void {
    let code = new URL(location.href).searchParams.get("code");

    if (!code) return;

    let client_id = "f0e834a4b9a24469a41bb0dfe9c77d25";
    let client_secret = "fd10c53ef4d945c1b7073338e47db8b9";
    let base64Code: string = btoa(client_id + ":" + client_secret);

    const authOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + base64Code,
      },
      body: JSON.stringify({
        code: code,
        redirect_uri: "http://localhost:8080/",
        grant_type: "authorization_code",
      }),
    };

    // fetch("https://accounts.spotify.com/api/token", authOption)
    //   .then((response) => {
    //     let result = response.json();
    //     console.log(result);
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    fetch("https://accounts.spotify.com/api/token", authOption)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        console.log(data);
        
      })
      .catch((error) => {        
        console.error("There was an error!", error);
      });
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
