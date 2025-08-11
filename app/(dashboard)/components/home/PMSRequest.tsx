"use client";

import { CloseIcon, StatsIcon } from "@/app/icons";
import { useStatsPMS } from "@/hooks/usePmsStats";
import { useState } from "react";

interface PmsRequestListProps {
  isOpen: boolean;
  closeModal: () => void;
}

function PmsRequestList(props: PmsRequestListProps) {
  const { isOpen, closeModal } = props;
  const [detailsOpen,setDetailsOpen] = useState(false)


  return (
    <>
    <div
      className={`fixed inset-0 z-10 flex justify-end items-start py-10 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-[rgba(0,0,0,0.5)]`}
    >
      <div
        className={`p-5 bg-[rgba(233,237,255,1)] overflow-y-auto max-h-[90vh] rounded-xl flex-1 max-w-[395px] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center gap-x-2">
          <StatsIcon />
          <p className="text-[rgba(51,51,51,1)] text-2xl font-bold">PMS Request</p>
          <button onClick={closeModal} className="ml-auto">
            <CloseIcon />
          </button>
        </header>

        <div className="bg-white rounded-xl p-6 my-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm">Request For</p>
              <b>Patrol Boat</b>
            </div>
            <div>
              <p className="text-sm">Engine Capacity</p>
              <b>85HP</b>
            </div>
            <div>
              <p className="text-sm">Quantity Needed</p>
              <b>150Ltrs</b>
            </div>
            <div>
              <p className="text-sm">Camp</p>
              <b>Escravos</b>
            </div>
          </div>
          <div className="flex justify-end my-2">
            <button onClick={()=>setDetailsOpen(true)} className="italic text-xs text-[rgba(47,93,168,1)]">
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
    <PmsRequestDetails isOpen={detailsOpen} closeModal={()=>setDetailsOpen(false)}/>
    </>
  );
}

function PmsRequestDetails(props: PmsRequestListProps) {
  const { isOpen, closeModal } = props;


  return (
    <div
      className={`fixed inset-0 z-10 flex justify-end items-start py-10 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-[rgba(0,0,0,0.5)]`}
    >
      <div
        className={`p-5 bg-[rgba(233,237,255,1)] overflow-y-auto max-h-[90vh] rounded-xl flex-1 max-w-[495px] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center gap-x-2">
          <StatsIcon />
          <p className="text-[rgba(51,51,51,1)] text-2xl font-bold">PMS Request Details</p>
          <button onClick={closeModal} className="ml-auto">
            <CloseIcon />
          </button>
        </header>

        <div className="bg-white rounded-xl p-6 my-4">
          <header className="py-2 my-2 border-b border-[#EAEDF2]">
                <p><b>Escravos Camp</b></p>
          </header>
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <p className="text-sm flex-1">Request For</p>
              <p className="font-medium flex-1">Patrol Boat</p>
            </div>
            <div className="flex items-start justify-between">
              <p className="text-sm flex-1">Engine Capacity</p>
              <p className="font-medium flex-1">85HP</p>
            </div>
            <div className="flex items-start justify-between">
              <p className="text-sm flex-1">Quantity Needed</p>
              <p className="font-medium flex-1">150Ltrs</p>
            </div>
            <div className="flex items-start">
              <p className="text-sm flex-1">Camp</p>
              <p className="flex-1 font-medium">Escrows</p>
            </div> 
            <div className="flex items-start">
              <p className="text-sm flex-1">Zone</p>
              <p className="flex-1 font-medium">12</p>
            </div> 
            <div className="flex items-start">
              <p className="text-sm flex-1">Last Supply Quantity</p>
              <p className="flex-1 font-medium">100Ltrs</p>
            </div> 
            <div className="flex items-start">
              <p className="text-sm flex-1">Last Supply Quantity</p>
              <p className="flex-1 font-medium">23-04-2025  16:45</p>
            </div>  
            <div className="flex items-start">
              <p className="text-sm flex-1">Comment</p>
              <p className="flex-1 font-medium">Lorem ipsum dolor sit amet consectetur. Viverra feugiat sed viverra erat sagittis id id. In nunc nunc sit diam. Amet varius volutpat leo facilisis eget commodo curabitur nunc eleifend. Ullamcorper vitae enim diam massa purus nunc a posuere interdum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PMSRequestOption() {
  const [pmsRequestOpen, setPmsRequestOpen] = useState(false);

  const openPmsRequests = () => setPmsRequestOpen(true);
  const closePmsRequests = () => setPmsRequestOpen(false);

  const { data, loading } = useStatsPMS();

  return (
    <>
      <PmsRequestList isOpen={pmsRequestOpen} closeModal={closePmsRequests} />
      <div className="bg-white border space-y-5 rounded-xl border-[rgba(220,224,228,1)] p-7">
        <header className="flex items-center text-[rgba(116,118,119,1)]">
          <p>Total PMS Supplied</p>
          <div className="flex items-center justify-center h-5 ml-auto w-5 rounded-full text-white bg-red-400 font-semibold">
            <p>{loading ? "Loading..." : data?.totalPmsSupplied ?? 0}</p>
          </div>
          <button
            onClick={openPmsRequests}
            className="ml-auto rounded-lg flex items-center gap-x-5 px-[10px] py-3"
          >
            <span>
              <i className="bi bi-chevron-right"></i>
            </span>
          </button>
        </header>
      </div>
    </>
  );
}
