"use client"

import {Area, AreaChart, CartesianGrid, XAxis, YAxis} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useAppSelector } from "@/hook/AppDispatch"
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function SignalLevel() {
    const chartData = useAppSelector(state => state.setting.gsmSignal);
    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Данные уровня сигнала за последние 60 секунд
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: -20,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="time"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            //stickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={3}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                        <Area
                            dataKey="value"
                            type="step"
                            fill="var(--color-desktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-desktop)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
