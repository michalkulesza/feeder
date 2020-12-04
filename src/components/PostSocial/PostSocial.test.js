import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";

import PostSocial from "./PostSocial";

describe("<PostSocial/>", () => {
	const post = { likesUsers: ["test", "test", "test", "test"], disableLike: false };

	it("should match the snapshot without props", () => {
		const wrapper = shallow(<PostSocial />);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render likes", () => {
		const wrapper = shallow(<PostSocial post={post} />);

		expect(wrapper.find(Link).length).toBe(4);
	});

	it("should call handleLike", () => {
		const handleLike = jest.fn();

		const wrapper = shallow(<PostSocial post={post} handleLike={handleLike} />);
		const button = wrapper.find(".button");

		button.simulate("click");

		expect(handleLike).toBeCalled();
	});
});
