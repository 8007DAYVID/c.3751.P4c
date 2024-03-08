export const colorLegend = (
	svg,
	{
		colorScale,
		colorLegendLabel,
		colorLegendX,
		colorLegendY,
		colorLegendLabelX = -10,
		colorLegendLabelY = -24,
		tickSpacing = 30,
		tickPadding = 15,
	}
) => {
	const colorLegendG = svg
		.selectAll("g.color-legend")
		.data([null])
		.join("g")
		.attr("class", "color-legend")
		.attr("transform", `translate(${colorLegendX},${colorLegendY})`);

	colorLegendG
		.selectAll("text.color-legend-label")
		.data([null])
		.join("text")
		.attr("x", colorLegendLabelX)
		.attr("y", colorLegendLabelY)
		.attr("class", "color-legend-label")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.text(colorLegendLabel);

	colorLegendG
		.selectAll("g.tick")
		.data(colorScale.domain())
		.join((enter) =>
			enter
				.append("g")
				.attr("class", "tick")
				.call((selection) => {
					selection.append("circle");
					selection.append("text");
				})
		)
		.attr("transform", (d, i) => `translate(0, ${i * tickSpacing})`)
		.attr("font-size", 10)
		.attr("font-family", "sans-serif")
		.call((selection) => {
			selection.select("circle").attr("r", 8).attr("fill", colorScale);
			selection
				.select("text")
				.attr("dy", "0.32em")
				.attr("x", tickPadding)
				.text((d) => d);
		});
};
