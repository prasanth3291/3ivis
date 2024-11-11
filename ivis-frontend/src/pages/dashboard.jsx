import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const Dashboard = () => {
  const [data, setData] = useState([5.1, 4.9, 8.6, 6.2, 5.1, 7.1, 6.7, 6.1, 5.0, 5.2, 7.9, 11.1, 5.9, 5.5, 6.5, 4.8, 9.5]); // More varied sample data

  const renderChart = (data) => {
    d3.select('#histogram').selectAll('*').remove(); // Clear previous chart

    const width = 960;
    const height = 500;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    const svg = d3
      .select('#histogram')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    // Reduced the threshold to 10 bins for clearer variation
    const bins = d3.bin().thresholds(10).value(d => d)(data);

    const x = d3
      .scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height - marginBottom, marginTop]);

    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(bins)
      .join('rect')
      .attr('x', d => x(d.x0) + 1)
      .attr('width', d => x(d.x1) - x(d.x0) - 1)
      .attr('y', d => y(d.length))
      .attr('height', d => y(0) - y(d.length));

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
      .call(g =>
        g
          .append('text')
          .attr('x', width)
          .attr('y', marginBottom - 4)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'end')
          .text('Unemployment Rate')
      );

    svg
      .append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select('.domain').remove())
      .call(g =>
        g
          .append('text')
          .attr('x', -marginLeft)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text('Frequency')
      );
  };

  const fetchChartData = async () => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const token = authTokens ? authTokens.access : null; // Extract the access token

    try {
      const response = await axios.get('http://localhost:8000/api/chart-data/', {
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in header
        },
      });
      const apiData = response.data.values;
      setData(apiData);
    } catch (error) {
      console.error('Error fetching chart data', error);
    }
  };

  useEffect(() => {
    renderChart(data);
  }, [data]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div id="histogram"></div>
      <button onClick={fetchChartData}>Load Data from API</button>
    </div>
  );
};

export default Dashboard;
