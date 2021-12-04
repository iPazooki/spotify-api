import "reflect-metadata";
import { shallowMount } from "@vue/test-utils";
import SongList from "@/components/SongList.vue";
import { cid, container, mockSingleton, resetContainer } from "inversify-props";
import ISpotifyService from "@/services/Interfaces/spotifyService";
import SpotifyService from "@/services/spotifyService";
import Song from "@/model/song";

describe("SongList.vue", () => {
  beforeEach(() => {
    resetContainer();
    containerBuilder();
    mockSingleton<ISpotifyService>(cid.ISpotifyService, SpotifyService);
  });

  it("renders artist list when passed", () => {
    
    const wrapper = shallowMount(SongList, {
      data() {
        return {
        };
      },
    });

    expect(wrapper.find(".nav-link").exists()).toBeTruthy();
  });
});

function containerBuilder() {
  container.addSingleton<ISpotifyService>(SpotifyService);
}
