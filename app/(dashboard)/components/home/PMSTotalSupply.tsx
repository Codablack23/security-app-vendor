"use client";

import { useStatsPMS } from "@/hooks/usePmsStats";

export default function PMSTotalSupplyOption(){

    const {data,loading} = useStatsPMS()

    return (
        <div className="bg-white border space-y-5 rounded-xl border-[rgba(220,224,228,1)] p-7">
            <header className="flex items-center text-[rgba(116,118,119,1)]">
                <p>Total PMS Supplied</p>
                <button className="border ml-auto rounded-lg border-[rgba(0,0,0,0.3)] px-[10px] py-3">Week</button>
            </header>
            <p className="text-2xl font-bold text-[rgba(45,46,46,1)]">{loading?"Loading...":data?.totalPmsSupplied ?? 0}ltrs</p>
        </div>
    )
}