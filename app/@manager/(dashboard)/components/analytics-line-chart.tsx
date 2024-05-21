'use client'

import {LineChart} from "@mui/x-charts/LineChart";
import React from "react";

export function AnalyticsLineChart(props: {dataset: {date: string, sales: number}[]}) {
    const keyToLabel: {[key: string]: string} = {
        sales: "Sales (A$)",
    }

    return (
        <LineChart
            xAxis={[{
                scaleType: "band",
                dataKey: 'date',
                valueFormatter: (value: string) => new Date(value).toLocaleDateString("en-AU", {month: "short", day: "numeric"}),
            }]}
            series={Object.keys(keyToLabel).map(key => ({
                dataKey: key,
                label: keyToLabel[key],
                color: "#0F6B58"
            }))}
            dataset={props.dataset}
            slotProps={{legend: {hidden: true}}}
            sx={{
                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                    fontFamily: "sofia-pro",
                    fontSize: "1rem",
                    fontWeight: "regular",
                },
            }}
        />
    )
}