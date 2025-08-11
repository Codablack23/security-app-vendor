"use client";

import { AppDropdown } from "@/app/shared";
import { useStatsPMS } from "@/hooks/usePmsStats";
import { useState } from "react";

const supplyIntervalOptions = [
    {
        label:"Day",
        value:"day"
    }, 
    {
        label:"Week",
        value:"week"
    }, 
    {
        label:"Month",
        value:"month"
    }, 
    {
        label:"Year",
        value:"year"
    }, 
    {
        label:"All Time",
        value:"all_time"
    },
]

export default function PMSTotalSupplyOption(){


    const [supplyInterval,setSupplyInterval] = useState("week")

    const {data,loading} = useStatsPMS()

    return (
        <div className="bg-white border space-y-5 rounded-xl border-[rgba(220,224,228,1)] p-7">
            <header className="flex items-center justify-between text-[rgba(116,118,119,1)]">
                <p>Total PMS Supplied</p>
                <AppDropdown
                    onSelect={setSupplyInterval}
                    value={supplyInterval}
                    options={supplyIntervalOptions}
                />
            </header>
            <p className="text-2xl font-bold text-[rgba(45,46,46,1)]">{loading?"Loading...":data?.totalPmsSupplied ?? 0}ltrs</p>
        </div>
    )
}