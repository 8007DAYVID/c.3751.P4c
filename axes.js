import { axisBottom, axisLeft } from "d3";

export const axes = (
	svg,
	{
		xScale,
		yScale,
		xAxisLabel,
		yAxisLabel,
		yAxisLabelOffset = 30,
		xAxisLabelOffset = 25,
		tickDensity = 50,
	}
) => {
	const [xMin, xMax] = xScale.range();
	const [yMax, yMin] = yScale.range();
	const xTicks = (xMax - xMin) / tickDensity;
	const yTicks = (yMax - yMin) / tickDensity;

	svg
		.selectAll("g.y-axis")
		.data([null])
		.join("g")
		.attr("class", "y-axis")
		.attr("transform", `translate(${xScale.range()[0]}, 0)`)
		.call(axisLeft(yScale).ticks(yTicks));

	svg
		.selectAll("g.x-axis")
		.data([null])
		.join("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0, ${yScale.range()[0]})`)
		.call(axisBottom(xScale).ticks(xTicks));

	svg
		.selectAll("text.y-axis-label")
		.data([null])
		.join("text")
		.attr("class", "y-axis-label")
		.attr("font-family", "sans-serif")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.attr("x", -(yScale.range()[0] + yScale.range()[1]) / 2)
		.attr("y", xScale.range()[0] - yAxisLabelOffset)
		.text(yAxisLabel);
	svg
		.selectAll("text.x-axis-label")
		.data([null])
		.join("text")
		.attr("class", "x-axis-label")
		.attr("font-family", "sans-serif")
		.attr("text-anchor", "middle")
		.attr("alignment-baseline", "hanging")
		.attr("x", (xScale.range()[0] + xScale.range()[1]) / 2)
		.attr("y", yScale.range()[0] + xAxisLabelOffset)
		.text(xAxisLabel);
};
