"use client";
import { useStatsPMS } from "@/hooks/usePmsStats"

export default function PMSLeftSupplyOption(){
    const {data,loading} = useStatsPMS()
    return (
        <div className="bg-white border space-y-5 rounded-xl border-[rgba(220,224,228,1)] p-7">
            <header className="flex items-center text-[rgba(116,118,119,1)]">
                <p>PMS Left to Supply</p>
            </header>
            <p className="text-2xl font-bold text-[rgba(45,46,46,1)]">{loading?"Loading.." :data?.pmsLeftToSupply ?? 0}ltrs</p>
        </div>
    )
}