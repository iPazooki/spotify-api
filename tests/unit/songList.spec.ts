import { shallowMount } from "@vue/test-utils";
import SongList from "@/components/SongList.vue";

describe("SongList.vue", () => {
  it("renders props.msg when passed", () => {
    const artists: string[] = ["Jack", "Sam"];

    const wrapper = shallowMount(SongList, {
      data() {
        return {
          artists: artists,
        };
      },
    });

    expect(wrapper.find(".nav-link").exists()).toBeTruthy();
  });
});
