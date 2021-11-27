import SpotifyWebApi from "spotify-web-api-js";
import { ISpotifyService } from "@/services/Interfaces/spotifyService";

export class SpotifyService implements ISpotifyService {
  private spotify: SpotifyWebApi.SpotifyWebApiJs;

  constructor() {
    this.spotify = new SpotifyWebApi();

    this.spotify.setAccessToken("AQAigM6VESZIoBJztOE6b2qnawiUR5HSCDLyMPzgzoVt6VhNe-r4v3Hfe6m_bJz-t9SMFG7XCN1qTfYuQCBtaEEVtIAJGYnAOgBTf6MSphvkaSHuy_X5sXAsiUYV0jEh31jK_yjsu5dwXPttsAA3sU-bnfxGFLjpP_IAoeNFoDsM1iFsRxJ-tybhpRLdgpUoPHsWyxMRKnPHy25vnk0");
  }

  getRecentlyPlayedList(
    artistName?: string
  ): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> {
    console.log("Here is access key:");
    console.log(this.spotify.getAccessToken());
    return this.spotify.getMyRecentlyPlayedTracks();
  }
  getRecentlyPlayedArtists(): any[] {
    throw new Error("Method not implemented.");
  }
}
