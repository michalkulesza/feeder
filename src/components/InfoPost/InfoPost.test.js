import React from "react";
import { shallow } from "enzyme";
import InfoPost from "./InfoPost";

describe("<InfoPost/>", () => {
	it("should match the snapshot", () => {
		const wrapper = shallow(
			<InfoPost>
				<h1>test</h1>
			</InfoPost>
		);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it("should render children props", () => {
		const wrapper = shallow(
			<InfoPost>
				<h1>test</h1>
				<h1>test</h1>
				<h1>test</h1>
			</InfoPost>
		);

		expect(wrapper.find("h1").length).toBe(3);
	});
});
