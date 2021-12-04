import SpotifyWebApi from "spotify-web-api-js";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import { injectable } from "inversify-props";
import Song from "@/model/song";
import _ from "lodash";
import Artist from "@/model/artist";

@injectable()
export default class SpotifyService implements ISpotifyService {
  private spotify: SpotifyWebApi.SpotifyWebApiJs;
  private readonly redirect_url = "http://localhost:8080/";
  private readonly client_id = "f0e834a4b9a24469a41bb0dfe9c77d25";
  private readonly client_secret = "fd10c53ef4d945c1b7073338e47db8b9";
  private readonly spotify_token_url = "https://accounts.spotify.com/api/token";
  private refreshToken = "";

  constructor() {
    this.spotify = new SpotifyWebApi();
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

    console.log("GET NEW AC, REFRESH TOKEN: " + this.refreshToken);

    await fetch(this.spotify_token_url, authOption)
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.spotify.setAccessToken(data.access_token);
        this.refreshToken = data.refresh_token;
        console.log("NEW REFRESH TOKEN IS: " + this.refreshToken);
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
        console.log("REFRESH IS: " + this.refreshToken);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  spotifyLogin(): void {
    const state = this.generateRandom(16);
    const scope =
      "user-library-read playlist-read-private user-read-recently-played user-read-currently-playing";

    window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${scope}&redirect_uri=${this.redirect_url}&state=${state}`;
  }

  public async getRecentlyPlayedList(artistName?: string): Promise<Song[]> {
    await this.spotifyRefreshToken();

    const option: SpotifyApi.RecentlyPlayedParameterObject = { limit: 5 };

    const result: SpotifyApi.UsersRecentlyPlayedTracksResponse =
      await this.spotify.getMyRecentlyPlayedTracks(option);

    const songList: Song[] = result.items
      .map((item: SpotifyApi.PlayHistoryObject) => {
        return new Song(
          item.track.id,
          item.track.name,
          (<any>item.track).album.images[0].url,
          new Artist(item.track.artists[0].id, item.track.artists[0].name),
          new Date(item.played_at)
        );
      })
      .sort((x) => x.playedDate.getTime());

    if (artistName) {
      return songList.filter((s: Song) => s.artist.name == artistName);
    } else {
      return songList;
    }
  }

  async getRecentlyPlayedArtists(): Promise<string[]> {
    const songList = await this.getRecentlyPlayedList();

    if (songList) {
      const songGouped = _.groupBy(songList, (s: Song) => {
        return s.artist;
      });

      const result: string[] = [];

      _.forEach(songGouped, (song: [Song, ...Song[]]) => {
        result.push(song[0].artist.name);
      });
      return result;
    } else {
      return [];
    }
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
