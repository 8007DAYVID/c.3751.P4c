import "./style.css";
import { select } from "d3";
import { render } from "./render";

//select the div with id of app from the DOM
const container = select("#app").node();

//store the initial width and height in state
const height = innerHeight * 1.2;

let state = { width: innerWidth, height, xSelectedAxis: "matches_played", ySelectedAxis: "goals" };

const setState = (next) => {
	state = next(state);
	render(container, { state, setState });
};

//listen for resize and update the state appropiately
addEventListener("resize", () => {
	setState((state) => ({ ...state, width: innerWidth, height }));
});

render(container, { state, setState });
