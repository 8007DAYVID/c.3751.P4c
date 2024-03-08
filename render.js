import { select } from "d3";
import { viz } from "./viz";

export const render = (container, { state, setState }) => {
	const { width, height } = state;

	//render the svg to the screen
	const svg = select(container)
		.selectAll("svg")
		.data([null])
		.join("svg")
		.attr("width", width)
		.attr("height", height);

	viz(svg, {
		innerRectFill: "#f2f2f2",
		marginTop: 180,
		marginBottom: 45,
		marginLeft: 60,
		marginRight: 45,
		state,
		setState,
	});
};
