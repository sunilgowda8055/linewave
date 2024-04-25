import React, { useState } from 'react'
// import { useState } from 'react';
import LineChart from './components/LineChart'
import Card from './components/Card'
import ChartDataLabels from 'chartjs-plugin-datalabels' // Import the datalabels plugin

const chartData = {
  labels: [
    'O3',
    'O4',
    'O5',
    'O6',
    'O7',
    'O8',
    'O9',
    'O10',
    'Center',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'D10',
  ],
  datasets: [
    {
      label: 'Values',
      data: [
        0.398,
        0.34,
        0.32,
        0.4,
        0.4,
        0.43,
        0.398,
        0.399,
        0.3,
        0.401,
        0.399,
        0.397,
        0.2,
        0.396,
        0.3,
        0.398,
        0.399,
      ],
      borderColor: 'rgba(209, 171, 206, 1)',
      fill: false,
    },
  ],
}
const chartOptions = {
  scales: {
    x: {
      grid: {
        display: false, // Hide the vertical grid lines for the x-axis
      },
    },
  },
  y: {
    grid: {
      color: 'pink', // Set grid line color to pink
      lineWidth: 2, // Set grid line width to 2 pixels
      drawBorder: false, // Hide grid line border
    },
  },
  // Other chart options...
  plugins: {
    // legend: {
    //   display: false, // it is turn of wave button
    // },
    datalabels: {
      display: true, // Hide data labels
    },
  },

  onClick: function (event, elements) {
    const chart = this
    const ctx = chart.ctx
    const yScale = chart.scales['y']
    const xScale = chart.scales['x']

    if (elements.length > 0) {
      const index = elements[0].index
      const value = chart.data.labels[index]
      const dataValue = chart.data.datasets[0].data[index]
      const yPosition = yScale.getPixelForValue(dataValue)
      const xPosition = xScale.getPixelForValue(value)

      // Draw vertical line
      ctx.beginPath()
      ctx.moveTo(xPosition, chart.chartArea.bottom)
      ctx.lineTo(xPosition, yPosition)
      ctx.strokeStyle = 'green'
      ctx.stroke()

      const targetYValue = 0.3
      const targetYPosition = yScale.getPixelForValue(targetYValue)
      ctx.beginPath()
      ctx.moveTo(chart.chartArea.left, targetYPosition)
      ctx.lineTo(chart.chartArea.right, targetYPosition)
      ctx.strokeStyle = 'blue'
      ctx.stroke()

      //  // Draw text at intersection point
      //  ctx.fillStyle = 'black';
      //  ctx.textAlign = 'center';
      //  ctx.fillText(`(${value}, ${dataValue})`, xPosition, yPosition);

      // Draw text holder box
      const text = 'Target 3.0'
      const textWidth = ctx.measureText(text).width + 10 // Add some padding to the text width
      const textX =
        (chart.chartArea.left + chart.chartArea.right) / 2 - textWidth / 2
      const textY = targetYPosition - 15 // Adjust the vertical position as needed

      // Draw text holder rectangle
      ctx.fillStyle = 'rgba(0, 0, 255, 0.3)' // Blue with opacity
      ctx.fillRect(textX, textY, textWidth, 30)

      // Draw text
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.fillText(
        text,
        (chart.chartArea.left + chart.chartArea.right) / 2,
        targetYPosition,
      )

      // Draw horizontal line from clicked point
      ctx.beginPath()
      ctx.moveTo(xPosition, yPosition)
      ctx.lineTo(chart.chartArea.left, yPosition)
      ctx.strokeStyle = 'green'
      ctx.stroke()

      // Draw rectangle
      ctx.fillStyle = 'rgba(128, 128, 128, 0.5)'
      ctx.fillRect(xPosition - 25, yPosition - 20, 50, 40)

      // Draw value text
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.fillText(value, yPosition, xPosition)
    }
  },
}

const App = () => {
  return (
    <div>
      <h1>Line Chart Example</h1>
      <Card>
        <div style={{ width: '800px', height: '300px' }}>
          <LineChart
            data={chartData}
            options={chartOptions}
            plugins={[ChartDataLabels]}
          />{' '}
          {/* Pass the datalabels plugin */}
        </div>
      </Card>
    </div>
  )
}

export default App
