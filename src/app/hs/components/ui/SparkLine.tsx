'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import React from 'react'

ChartJS.register(CategoryScale, Filler, LinearScale, LineElement, PointElement)
const options = {
  responsive: true,
  scales: {
    x: {
      border: {
        display: false
      },
      grid: {
        display: false
      },
      ticks: {
        display: false
      }
    },
    y: {
      ticks: {
        display: false
      },
      border: {
        display: false
      },
      grid: {
        display: false
      }
    }
  }
}

interface SparkLineProps {
  labels: string[]
  data: number[]
}
export default function SparkLine({ labels, data }: SparkLineProps) {
  const dataConfig = React.useMemo(() => {
    return {
      labels,
      datasets: [
        {
          fill: true,
          data,
          borderColor: 'rgb(217, 70, 239)',
          backgroundColor: 'rgba(217, 70, 239, 0.3)',
          pointRadius: 0,
          tension: 0.7
        }
      ]
    }
  }, [labels, data])
  return <Line options={options} data={dataConfig} width={150} height={80} />
}
