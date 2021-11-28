import { __decorate } from "tslib";
import SpotifyWebApi from "spotify-web-api-js";
import { injectable } from "inversify-props";
let SpotifyService = class SpotifyService {
    constructor() {
        this.redirect_url = "http://localhost:8080/";
        this.client_id = "f0e834a4b9a24469a41bb0dfe9c77d25";
        this.client_secret = "fd10c53ef4d945c1b7073338e47db8b9";
        this.spotify_token_url = "https://accounts.spotify.com/api/token";
        this.spotify_refresh_url = "https://accounts.spotify.com/api/token";
        this.refreshToken = "";
        this.spotify = new SpotifyWebApi();
        this.spotify.setAccessToken("AQAigM6VESZIoBJztOE6b2qnawiUR5HSCDLyMPzgzoVt6VhNe-r4v3Hfe6m_bJz-t9SMFG7XCN1qTfYuQCBtaEEVtIAJGYnAOgBTf6MSphvkaSHuy_X5sXAsiUYV0jEh31jK_yjsu5dwXPttsAA3sU-bnfxGFLjpP_IAoeNFoDsM1iFsRxJ-tybhpRLdgpUoPHsWyxMRKnPHy25vnk0");
    }
    async spotifyRefreshToken() {
        const base64Code = btoa(this.client_id + ":" + this.client_secret);
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
    spotifySetToken() {
        const code = new URL(location.href).searchParams.get("code");
        if (!code)
            return;
        const base64Code = btoa(this.client_id + ":" + this.client_secret);
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
    spotifyLogin() {
        const state = this.generateRandom(16);
        const scope = "user-library-read playlist-read-private user-read-recently-played user-read-currently-playing";
        window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${this.client_id}&scope=${scope}&redirect_uri=${this.redirect_url}&state=${state}`;
    }
    async getRecentlyPlayedList(artistName) {
        await this.spotifyRefreshToken();
        console.log("Here is access key:");
        console.log(this.spotify.getAccessToken());
        return await this.spotify.getMyRecentlyPlayedTracks();
    }
    getRecentlyPlayedArtists() {
        throw new Error("Method not implemented.");
    }
    generateRandom(length) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let index = 0; index < length; index++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
};
SpotifyService = __decorate([
    injectable()
], SpotifyService);
export default SpotifyService;
//# sourceMappingURL=spotifyService.js.map