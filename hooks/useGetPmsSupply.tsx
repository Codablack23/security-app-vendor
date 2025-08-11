"use client";
import { PmSProvider, SupplyData } from "@/services";
import { useRef, useState, useCallback, useEffect } from "react";

interface UseGetPmsSupplyOptions {
    staleTime?: number; // Duration (in ms) after which data is considered stale
}

/**
 * A hook for fetching PMS supply data with optional stale time support.
 *
 * @param deps Dependencies array to control when the hook runs.
 * @param options Configuration options like `staleTime` (default: 5 minutes).
 *
 * @returns { loading, data, refetch } object
 */
export function useGetPmsSupply(
    deps: any[] = [],
    options: UseGetPmsSupplyOptions = {}
) {
    const staleTime = options.staleTime ?? 300_000; // Default stale time: 5 minutes
    const lastFetchedRef = useRef<number>(0);

    const [loading, setLoading] = useState(true);
    const [supplyList, setSupplyList] = useState<SupplyData[]>([]);

    const isFresh = useCallback(() => {
        return Date.now() - lastFetchedRef.current < staleTime;
    }, [staleTime]);

    const getPmsStats = useCallback(async () => {
        if (isFresh() && supplyList.length > 0) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await PmSProvider.getSupply();
            if (res?.data?.data) {
                setSupplyList(res.data.data);
                lastFetchedRef.current = Date.now(); // Update last fetch timestamp
            }
        } catch {
            // Silently ignore fetch errors
        } finally {
            setLoading(false);
        }
    }, [isFresh, supplyList]);

    useEffect(() => {
        getPmsStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        loading,
        data: supplyList,
        refetch: getPmsStats,
    };
}


interface UseGetPmsSupplyOptions {
    staleTime?: number; // Duration (in ms) after which data is considered stale
}

interface UseGetPMSSupplyDetailsOptions{
   onError?:(error?:unknown)=>void,
   enabled?:boolean
}

export function useGetPMSSupplyDetails(id:string,{enabled=true,onError}:UseGetPMSSupplyDetailsOptions){
    const [loading,setLoading] = useState(true)
    const [supplyDetails,setSupplyDetails] = useState<SupplyData | null>(null)


    const getSupplyDetails = useCallback(async()=>{

        if(enabled) return;

        setLoading(true)
        try{
            if(!id) throw new Error("Please provide a valid supply Id");
            const res = await PmSProvider.getSupplyDetails(id)
            if(res.status != "success") throw new Error(res.message);
            if(!res.data) throw new Error(res.message ?? "An Error occured could not get supply details")
            setSupplyDetails(res.data)
        }
        catch(err){
            onError?.(err)
        }
        finally{
            setLoading(false)
        }
    },[enabled])

    useEffect(()=>{
        getSupplyDetails()
    },[getSupplyDetails])

    return {
        loading,
        supplyDetails,
        refetch:getSupplyDetails,
    }
}