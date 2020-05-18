import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import useResizeObserver from "./useResizeObserver";

function RacingBarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!dimensions) return;

    const yScale = d3.scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height]); 
    

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, entry => entry[1])])
      .range([0, dimensions.width]);

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry[0])
      .join(enter =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill",color(data,(entry)=>entry))
      .attr("fill-opacity", 0.6)
      .attr("class", "bar")
      .attr("cx", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .ease(d3.easeLinear)
      .attr("width", entry => xScale(entry[1]))
      .attr("y", (entry, index) => yScale(index));

    // draw the labels
    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry[0])
      .join(enter =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text(entry => ` ${entry[0]} (${entry[1]})`)
      .attr("class", "label")
      .attr("x", 16)
      .transition()
      .ease(d3.easeLinear)
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5)
      .attr("font-weight", 350)

      function color(entry){
        const scale = d3.scaleOrdinal(d3.schemeTableau10);
        if (entry.some(d => d[0] !== undefined)) {
        const stateByName = new Map(entry.map(d => [d[0], d[1]]))
        scale.domain(Array.from(stateByName.values()));
        return d => scale(stateByName.get(d[0]));
      }
      return d => scale(d[0]);
      }
  }, [data, dimensions]);
  
  return (
    <div ref={wrapperRef} style={{ marginBottom: "1rem" }}>
      <svg id="ss" ref={svgRef}></svg>
    </div>
  );
}

export default RacingBarChart;
