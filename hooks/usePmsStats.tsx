import { PmSProvider, PmsStatsResponseData } from "@/services";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * useStatsPMS Hook
 *
 * Fetches vendor stats from PMS provider with built-in caching (stale time).
 * By default, data is considered fresh for 5 minutes (300000ms), and will not
 * be re-fetched until it becomes stale or a manual `refetch` is triggered.
 *
 * @param deps - Optional array of dependencies to trigger re-fetch.
 * @param options - Optional staleTime override in milliseconds.
 *
 * @returns { loading, data, refetch }
 */
export function useStatsPMS(
    deps: any[] = [],
    options: { staleTime?: number } = {}
) {
    const staleTime = options.staleTime ?? 300000; // default to 5 minutes
    const lastFetchedRef = useRef<number>(0);
    const [loading, setLoading] = useState(true);
    const [pmsStats, setPmsStats] = useState<PmsStatsResponseData | null>(null);

    const getPmsStats = useCallback(async () => {
        const now = Date.now();

        // Skip fetch if data is still fresh
        if (now - lastFetchedRef.current < staleTime && pmsStats) {
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            const res = await PmSProvider.getVendorStats();
            if (res && res.data) {
                setPmsStats(res.data);
                lastFetchedRef.current = Date.now(); // update last fetch time
            }
        } catch (err) {
            // Errors are ignored by design in this hook
        } finally {
            setLoading(false);
        }
    }, [pmsStats, staleTime]);

    useEffect(() => {
        getPmsStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return {
        loading,
        data: pmsStats,
        refetch: getPmsStats,
    };
}
