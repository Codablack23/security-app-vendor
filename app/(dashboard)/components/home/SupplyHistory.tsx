"use client";

import { useGetPmsSupply } from "@/hooks";
import { Spin } from "antd";

export default function SupplyHistorySection() {
    const { data, loading } = useGetPmsSupply();

    return (
        <section>
            <p className="text-[rgba(16,24,40,1)] font-semibold text-2xl">Supply History</p>

            <div className="mt-4 min-h-[200px] relative">
                <Spin
                    spinning={loading}
                    size="large"
                    style={{ color: "#2F5DA8" }}
                    wrapperClassName="w-full"
                >
                    {!loading && (
                        <table className="w-full mt-[10px]">
                            <thead className="bg-[rgba(47,93,168,1)] text-white" style={{ borderRadius: "10px" }}>
                                <tr className="text-left">
                                    <th className="p-4 rounded-tl-xl">
                                        <button className="bg-white border-[rgba(224,224,224,1)] h-5 w-5 rounded-md border"></button>
                                    </th>
                                    <th className="p-4">Date of Supply</th>
                                    <th className="p-4">Camp</th>
                                    <th className="p-4">Quantity Supplied</th>
                                    <th className="p-4">Amount To Supply</th>
                                    <th className="p-4">Amount Left To Supply</th>
                                    <th className="p-4 rounded-tr-xl">Last Supply Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-4">
                                            <input type="checkbox" />
                                        </td>
                                        <td className="p-4">{new Date(item.requestedAt ?? "").toLocaleDateString()}</td>
                                        <td className="p-4">{item.camp?.camp_name ?? "-"}</td>
                                        <td className="p-4">{item.lastSupplyQuantity}</td>
                                        <td className="p-4">{item.requestedQuantity}</td>
                                        <td className="p-4">{item.requestedQuantity - item.lastSupplyQuantity}</td>
                                        <td className="p-4">{new Date(item.createdAt ?? "").toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Spin>
            </div>
        </section>
    );
}
