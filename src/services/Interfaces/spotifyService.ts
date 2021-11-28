export default interface ISpotifyService {
  spotifyLogin(): void;

  spotifySetToken(): void;

  spotifyRefreshToken(): Promise<void>;

  getRecentlyPlayedList(
    artistName?: string
  ): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse>;

  getRecentlyPlayedArtists(): any[];
}
