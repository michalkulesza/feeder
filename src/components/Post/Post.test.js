import React from "react";
import { mount } from "enzyme";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";

import Post from "./Post";
import { StaticRouter } from "react-router-dom";

const store = configureStore()({
	firebase: {
		auth: {
			uid: "123123test",
		},
		profile: {
			username: "tester",
		},
	},
});

const postProp = {
	author: "tester",
	createadAt: "01200340",
	content: "test",
	postKey: "11",
};

describe("<Post/>", () => {
	it("should match the snapshot", () => {
		const wrapper = mount(
			<ReactRedux.Provider store={store}>
				<StaticRouter>
					<Post post={postProp} />
				</StaticRouter>
			</ReactRedux.Provider>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
