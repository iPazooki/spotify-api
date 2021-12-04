import Artist from "@/model/artist";
import Song from "@/model/song";

export default interface ISpotifyService {
  spotifyLogin(): void;

  spotifySetToken(): void;

  spotifyRefreshToken(): Promise<void>;

  getRecentlyPlayedList(artistName?: string): Promise<Song[]>;

  getRecentlyPlayedArtists(): Promise<Artist[]>;
}
