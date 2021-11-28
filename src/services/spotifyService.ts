import SpotifyWebApi from "spotify-web-api-js";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import { injectable } from "inversify-props";

@injectable()
export default class SpotifyService implements ISpotifyService {
  private spotify: SpotifyWebApi.SpotifyWebApiJs;
  private readonly redirect_url = "http://localhost:8080/";
  private readonly client_id = "f0e834a4b9a24469a41bb0dfe9c77d25";
  private readonly client_secret = "fd10c53ef4d945c1b7073338e47db8b9";
  private readonly spotify_token_url = "https://accounts.spotify.com/api/token";
  private readonly spotify_refresh_url =
    "https://accounts.spotify.com/api/token";
  private refreshToken = "";

  constructor() {
    this.spotify = new SpotifyWebApi();

    this.spotify.setAccessToken(
      "AQAigM6VESZIoBJztOE6b2qnawiUR5HSCDLyMPzgzoVt6VhNe-r4v3Hfe6m_bJz-t9SMFG7XCN1qTfYuQCBtaEEVtIAJGYnAOgBTf6MSphvkaSHuy_X5sXAsiUYV0jEh31jK_yjsu5dwXPttsAA3sU-bnfxGFLjpP_IAoeNFoDsM1iFsRxJ-tybhpRLdgpUoPHsWyxMRKnPHy25vnk0"
    );
  }

  async spotifyRefreshToken(): Promise<void> {
    const base64Code: string = btoa(this.client_id + ":" + this.client_secret);

    const authOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + base64Code,
      },
      body: new URLSearchParams({
        refresh_token: this.refreshToken,
        grant_type: "refresh_token",
      }),
    };

    await fetch(this.spotify_refresh_url, authOption)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.spotify.setAccessToken(data.access_token);
        this.refreshToken = data.refresh_token;
        console.log("New TOKEN: " + this.spotify.getAccessToken());
        console.log("NEW Refresh TOKEN: " + this.refreshToken);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  spotifySetToken(): void {
    const code = new URL(location.href).searchParams.get("code");

    if (!code) return;

    const base64Code: string = btoa(this.client_id + ":" + this.client_secret);

    const authOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + base64Code,
      },
      body: new URLSearchParams({
        code: code,
        redirect_uri: this.redirect_url,
        grant_type: "authorization_code",
      }),
    };

    fetch(this.spotify_token_url, authOption)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.spotify.setAccessToken(data.access_token);
        this.refreshToken = data.refresh_token;

        console.log("TOKEN: " + this.spotify.getAccessToken());
        console.log("Refresh TOKEN: " + this.refreshToken);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  spotifyLogin(): void {
    const state = this.generateRandom(16);
    const scope = "user-library-read playlist-read-private user-read-recently-played user-read-currently-playing";

    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${scope}&redirect_uri=${this.redirect_url}&state=${state}`;
  }

  public async getRecentlyPlayedList(
    artistName?: string
  ): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> {
    await this.spotifyRefreshToken();
    console.log("Here is access key:");
    console.log(this.spotify.getAccessToken());
    return await this.spotify.getMyRecentlyPlayedTracks();
  }

  getRecentlyPlayedArtists(): any[] {
    throw new Error("Method not implemented.");
  }

  private generateRandom(length: number): string {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let index = 0; index < length; index++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }
}
