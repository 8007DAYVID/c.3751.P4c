export const sizeLegend = (
	svg,
	{
		sizeScale,
		sizeLegendLabel,
		sizeLegendX,
		sizeLegendY,
		sizeLegendLabelX = -10,
		sizeLegendLabelY = -24,
		tickSpacing = 30,
		tickPadding = 15,
	}
) => {
	const sizeLegendG = svg
		.selectAll("g.size-legend")
		.data([null])
		.join("g")
		.attr("class", "size-legend")
		.attr("transform", `translate(${sizeLegendX},${sizeLegendY})`);

	sizeLegendG
		.selectAll("text.size-legend-label")
		.data([null])
		.join("text")
		.attr("x", sizeLegendLabelX)
		.attr("y", sizeLegendLabelY)
		.attr("class", "size-legend-label")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.text(sizeLegendLabel);

	sizeLegendG
		.selectAll("g.ticks-size")
		.data(sizeScale.ticks(3))
		.join((enter) =>
			enter
				.append("g")
				.attr("class", "tick-size")
				.call((selection) => {
					selection.append("circle");
					selection.append("text");
				})
		)
		.attr("transform", (d, i) => `translate(0, ${i * tickSpacing})`)
		.attr("font-size", 10)
		.attr("font-family", "sans-serif")
		.call((selection) => {
			selection.select("circle").attr("r", sizeScale).attr("fill", "#1f77b4");
			selection
				.select("text")
				.attr("dy", "0.32em")
				.attr("x", tickPadding)
				.text((d) => d);
		});
};
