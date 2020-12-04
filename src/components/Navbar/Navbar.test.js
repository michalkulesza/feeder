import React from "react";
import { mount } from "enzyme";
import * as ReactRedux from "react-redux";
import configureStore from "redux-mock-store";
import { Link, StaticRouter } from "react-router-dom";

import Navbar from "./Navbar";

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

describe("<Navbar/>", () => {
	it("should match the snapshot", () => {
		const wrapper = mount(
			<ReactRedux.Provider store={store}>
				<StaticRouter>
					<Navbar />
				</StaticRouter>
			</ReactRedux.Provider>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it("should render logout button when in /login", () => {
		const wrapper = mount(
			<ReactRedux.Provider store={store}>
				<StaticRouter location={"/login"}>
					<Navbar />
				</StaticRouter>
			</ReactRedux.Provider>
		);

		expect(wrapper.find(Link).filterWhere(node => node.prop("to") === "/signup").length).toBe(1);
	});
});
