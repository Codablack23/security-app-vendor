"use client";

import { CloseIcon, StatsIcon } from "@/app/icons";
import { CustomSpinner } from "@/app/shared";
import { useGetPmsSupply, useGetPMSSupplyDetails } from "@/hooks";
import { SupplyData } from "@/services";
import { Skeleton, Spin } from "antd";
import { useState } from "react";

interface PmsRequestListProps {
    isOpen: boolean;
    closeModal: () => void;
    supplyId: string
}

function SupplyLoader() {
    return (
        <div className="bg-white my-4 rounded-lg p-4">
            <Skeleton.Button block active style={{ height: 32 }} />
            <div className="flex items-center gap-x-4 my-4">
                <Skeleton.Button block active style={{ height: 16 }} />
                <Skeleton.Button block active style={{ height: 16 }} />
            </div>
            <div className="flex items-center gap-x-4 my-4">
                <Skeleton.Button block active style={{ height: 16 }} />
                <Skeleton.Button block active style={{ height: 16 }} />
            </div>
            <div className="flex items-center gap-x-4 my-4">
                <Skeleton.Button block active style={{ height: 16 }} />
                <Skeleton.Button block active style={{ height: 16 }} />
            </div>
            <div className="flex items-center gap-x-4 my-4">
                <Skeleton.Button block active style={{ height: 16 }} />
                <Skeleton.Button block active style={{ height: 16 }} />
            </div>
            <div className="flex items-center gap-x-4 my-4">
                <Skeleton.Button block active style={{ height: 16 }} />
                <Skeleton.Button block active style={{ height: 16 }} />
            </div>
        </div>
    )
}

function SupplyHistoryDetails(props: PmsRequestListProps) {
    const { isOpen, closeModal } = props;

    const { loading,supplyDetails } = useGetPMSSupplyDetails(props.supplyId,{enabled:isOpen})

    return (
        <div
            className={`fixed inset-0 z-10 flex justify-end items-start py-10 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } bg-[rgba(0,0,0,0.5)]`}
        >
            <div
                className={`p-5 bg-[rgba(233,237,255,1)] overflow-y-auto max-h-[90vh] rounded-xl flex-1 max-w-[495px] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <header className="flex items-center gap-x-2">
                    <StatsIcon />
                    <p className="text-[rgba(51,51,51,1)] text-2xl font-bold">Supply History</p>
                    <button onClick={closeModal} className="ml-auto">
                        <CloseIcon />
                    </button>
                </header>
                {
                    loading && (<SupplyLoader/>)
                }

                {!loading && supplyDetails && (
                    <div className="bg-white rounded-xl p-6 my-4">
                    <header className="py-2 my-2 border-b border-[#EAEDF2]">
                        <p><b>{supplyDetails.camp.camp_name} Camp</b></p>
                    </header>
                    <div className="space-y-2">
                        <div className="flex items-start justify-between">
                            <p className="text-sm flex-1">Date/Time of Supply</p>
                            <p className="font-medium flex-1">{new Date(supplyDetails.requestedAt ?? "").toISOString()}</p>
                        </div>
                          <div className="flex items-start">
                            <p className="text-sm flex-1">Camp</p>
                            <p className="flex-1 font-medium">{supplyDetails.camp.camp_name}</p>
                        </div>
                        <div className="flex items-start justify-between">
                            <p className="text-sm flex-1">Quantity Supplied</p>
                            <p className="font-medium flex-1">{supplyDetails.lastSupplyQuantity}Ltrs</p>
                        </div>
                        <div className="flex items-start justify-between">
                            <p className="text-sm flex-1">PMS Out to be supplied</p>
                            <p className="font-medium flex-1">{supplyDetails.requestedQuantity}Ltrs</p>
                        </div>
                      
                        <div className="flex items-start">
                            <p className="text-sm flex-1">Amount of PMS left</p>
                            <p className="flex-1 font-medium">{supplyDetails.requestedQuantity - supplyDetails.lastSupplyQuantity}</p>
                        </div>
                        <div className="flex items-start">
                            <p className="text-sm flex-1">PSS on Duty</p>
                            <p className="flex-1 font-medium">{supplyDetails.pss.user}</p>
                        </div>
                        <div className="flex items-start">
                            <p className="text-sm flex-1">Last Supply Date</p>
                            <p className="flex-1 font-medium">{new Date(supplyDetails.createdAt ?? "").toISOString()}</p>
                        </div>
                    </div>
                </div>
                ) }
            </div>
        </div>
    );
}

function SupplyHistoryRow({ supplyItem }: { supplyItem: SupplyData }) {
    const [detailsOpen, setDetailsOpen] = useState(false)
    return (
        <>
            <tr onClick={() => setDetailsOpen(true)} className="cursor-pointer">
                <td className="p-4">
                    <input type="checkbox" />
                </td>
                <td className="p-4">{new Date(supplyItem.requestedAt ?? "").toISOString()}</td>
                <td className="p-4">{supplyItem.camp?.camp_name ?? "-"}</td>
                <td className="p-4">{supplyItem.lastSupplyQuantity}</td>
                <td className="p-4">{supplyItem.requestedQuantity}</td>
                <td className="p-4">{supplyItem.requestedQuantity - supplyItem.lastSupplyQuantity}</td>
                <td className="p-4">{new Date(supplyItem.createdAt ?? "").toLocaleDateString()}</td>
            </tr>
            <SupplyHistoryDetails supplyId={supplyItem._id} isOpen={detailsOpen} closeModal={() => setDetailsOpen(false)} />
        </>
    )
}

export default function SupplyHistorySection() {
    const { data, loading } = useGetPmsSupply();

    return (
        <>
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
                                        <SupplyHistoryRow key={item._id} supplyItem={item} />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </Spin>
                </div>
            </section>
        </>
    );
}
