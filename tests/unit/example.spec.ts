import { shallowMount } from "@vue/test-utils";
import SongList from "@/components/SongList.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(SongList, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
