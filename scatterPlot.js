import {
	color,
	extent,
	scaleLinear,
	scaleOrdinal,
	scaleSqrt,
	schemeCategory10,
	select,
} from "d3";
import { axes } from "./axes";
import { colorLegend } from "./colorLegend";
import { sizeLegend } from "./sizeLegend";

export function scatterPlot(
	svg,
	{
		data,
		width,
		height,
		xValue,
		yValue,
		sizeValue,
		colorValue,
		margins,
		xAxisLabel,
		yAxisLabel,
		circleOpacity,
		colorLegendLabel,
		colorLegendX,
		colorLegendY,
		circleLabel,
		// sizeLegendLabel,
		// sizeLegendX,
		// sizeLegendY,
	}
) {
	const { marginLeft, marginRight, marginBottom, marginTop } = margins;

	const xScale = scaleLinear()
		.domain(extent(data, xValue))
		.range([marginLeft, width - marginRight]);

	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([height - marginBottom, marginTop]);

	const sizeScale = scaleSqrt().domain(extent(data, sizeValue)).range([4, 12]);

	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range(schemeCategory10);

	svg.call(axes, {
		xScale,
		yScale,
		xAxisLabel,
		yAxisLabel,
	});

	svg.call(colorLegend, {
		colorScale,
		colorLegendLabel,
		colorLegendX,
		colorLegendY,
	});

	// svg.call(sizeLegend, {
	// 	sizeScale,
	// 	sizeLegendLabel,
	// 	sizeLegendX,
	// 	sizeLegendY,
	// });

	const circle = svg
		.selectAll("circle.mark")
		.data(data)
		.join("circle")
		.attr("class", "mark")
		.attr("fill", (d) => colorScale(colorValue(d)))
		.on("mouseover", function () {
			select(this)
				.transition()
				.attr("r", (d) => sizeScale(sizeValue(d)) * 2);

			select(this)
				.append("title")
				.text((d) => circleLabel(d));
		})
		.on("mouseout", function () {
			select(this)
				.transition()
				.attr("r", (d) => sizeScale(sizeValue(d)));
			select(this).select("title").remove();
		})
		.transition()
		.duration(1500)
		.attr("cx", (d) => xScale(xValue(d)))
		.attr("cy", (d) => yScale(yValue(d)))
		.attr("fill", (d) => colorScale(colorValue(d)))
		.attr("opacity", circleOpacity)
		.attr("r", (d) => sizeScale(sizeValue(d)));
}
