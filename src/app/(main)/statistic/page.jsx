"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Generates random data for a 24-hour period for BPM, Oxygen, and Temperature.
const generate24HourData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    saves: Math.floor(Math.random() * 3) + 1, // Daily saves, typically low (e.g., 1-5 per hour)
  }))
}

// Static data for the last 7 days.
const weeklyData = [
  { day: "Mon", saves: Math.floor(Math.random() * 10) + 5 }, // Daily saves (e.g., 5-14)
  { day: "Tue", saves: Math.floor(Math.random() * 10) + 5 },
  { day: "Wed", saves: Math.floor(Math.random() * 10) + 5 },
  { day: "Thu", saves: Math.floor(Math.random() * 10) + 5 },
  { day: "Fri", saves: Math.floor(Math.random() * 10) + 5 },
  { day: "Sat", saves: Math.floor(Math.random() * 10) + 5 },
  { day: "Sun", saves: Math.floor(Math.random() * 10) + 5 },
]

// Static data for the last 4 weeks.
const monthlyData = [
  { week: "Week 1", saves: Math.floor(Math.random() * 80) + 20 },
  { week: "Week 2", saves: Math.floor(Math.random() * 80) + 20 },
  { week: "Week 3", saves: Math.floor(Math.random() * 80) + 20 },
  { week: "Week 4", saves: 78},
]
// --- Component Configuration ---

// Centralized data object
const allData = {
  "24h": generate24HourData(),
  "7d": weeklyData,
  "30d": monthlyData,
}

// Chart configuration for styling
const chartConfig = {
  saves: {
    label: "Lives Saved",
    color: "hsl(var(--chart-1))",
  }
}

export default function HealthChartComponent() {
  const [timeRange, setTimeRange] = useState("24h")

  const dataKeyMap = {
    "24h": "time",
    "7d": "day",
    "30d": "week",
  }

  const descriptionMap = {
    "24h": "Showing lives saved for the last 24 hours.",
    "7d": "Showing lives saved for the last 7 days.",
    "30d": "Showing lives saved for the last 4 weeks.",
  }

  const footerTextMap = {
    '24h': 'Data updated hourly.',
    '7d': 'Daily for the last week.',
    '30d': 'Weekly for the last month.',
  }

  const formatTick = (value) => {
    switch (timeRange) {
      case '30d':
        return value.replace('Week ', 'W')
      default:
        return value
    }
  }

  return (
    <div className="grow w-full p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6 mb-6">
        <div className="flex-1">
          <div className="font-semibold text-2xl">Partients Saved</div>
          <div>{descriptionMap[timeRange]}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeRange === "24h" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("24h")}
          >
            24 Hours
          </Button>
          <Button
            variant={timeRange === "7d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("7d")}
          >
            Weekly
          </Button>
          <Button
            variant={timeRange === "30d" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("30d")}
          >
            Monthly
          </Button>
        </div>
      </div>
      <div>
        <ChartContainer config={chartConfig} className={"h-64 sm:h-[80vh]"}>
          <AreaChart
            accessibilityLayer
            data={allData[timeRange]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKeyMap[timeRange]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatTick}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 'dataMax + 5']}
              label={{ value: "Lives Saved", angle: -90, position: 'insideLeft', offset: -10, style: { textAnchor: 'middle', fill: 'var(--color-red-500)' } }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* Defines a gradient fill for BPM */}
            <defs>
              <linearGradient id="fillBpm" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-red-500)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-red-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              yAxisId="left"
              dataKey="saves"
              type="natural"
              fill="url(#fillBpm)"
              stroke="var(--color-red-500)"
            />
          </AreaChart>
        </ChartContainer>
      </div>
      <div>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Your lives saved appear stable
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {footerTextMap[timeRange]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}