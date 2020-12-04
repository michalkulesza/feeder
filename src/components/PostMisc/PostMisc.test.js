import React from "react";
import { shallow } from "enzyme";

import PostMisc from "./PostMisc";

describe("<PostMisc/>", () => {
	const handleNewPost = jest.fn();

	it("should match the snapshot without props", () => {
		const wrapper = shallow(<PostMisc />);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should match the snapshot with props", () => {
		const active = false;
		const wrapper = shallow(<PostMisc active={active} handleNewPost={handleNewPost} />);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render component with active class", () => {
		const active = true;
		const wrapper = shallow(<PostMisc active={active} handleNewPost={handleNewPost} />);
		const activeClass = wrapper.find(".active");

		expect(activeClass).toBeTruthy();
	});

	it("should call the click handler", () => {
		const active = true;
		const wrapper = shallow(<PostMisc active={active} handleNewPost={handleNewPost} />);
		const button = wrapper.find(".button");

		button.simulate("click");
		expect(handleNewPost).toBeCalled();
	});
});
