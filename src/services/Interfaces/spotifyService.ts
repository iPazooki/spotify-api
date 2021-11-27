export interface ISpotifyService {
  getRecentlyPlayedList(
    artistName?: string
  ): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse>;
  getRecentlyPlayedArtists(): any[];
}
