import React from "react";
import { shallow } from "enzyme";

import PostsList from "./PostsList";
import { Post } from "../../components";

describe("<PostsList/>", () => {
	const posts = [
		{ author: "", createdAt: "", content: "", id: 1223213213 },
		{ author: "", createdAt: "", content: "", id: 2323232332 },
	];

	it("should match the snapshot without props", () => {
		const wrapper = shallow(<PostsList />);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render posts", () => {
		const wrapper = shallow(<PostsList posts={posts} />);

		expect(wrapper.find(Post).length).toBe(2);
	});
});
