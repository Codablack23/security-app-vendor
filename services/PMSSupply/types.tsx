import { BaseApiResponse } from '@/types';

export interface SupplyData {
    _id: string;
    pss: {
        _id: string;
        user: string;
        zone: string;
        camp: string;
        team: string;
        securityContact: {
            mobile1: string;
            mobile2: string;
            landLine1: string;
            landLine2: string;
            landLine3: string;
            _id: string;
        };
        pmsHistory: {
            totalVolume: number;
            suppliesReceived: number;
            _id: string;
        };
        createdAt: string;
        updatedAt: string;
        medicalInfo: {
            bloodType: string;
            allergies: string[];
            medications: string[];
            notes: string;
            dateOfBirth: string;
            height: string;
            weight: string;
            pregnancyStatus: string;
            medicalContacts: {
                locationClinic: {
                    name: string;
                    _id: string;
                };
                ohnContact: string;
                retainershipClinic: {
                    name: string;
                    contactDetails: string;
                    address: string;
                    _id: string;
                };
                _id: string;
            };
            _id: string;
        };
    };
    zone: {
        _id: string;
        name: string;
        image: string;
        team: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    camp: {
        _id: string;
        camp_name: string;
        zone: string;
        pipeline: string;
        latitude: string;
        longitude: string;
        camp_images: string[];
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    team: {
        _id: string;
        name: string;
        image: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    requestFor: string;
    engineCapacity: string;
    quantityNeeded: number;
    engineType: string;
    lastSupplyQuantity: number;
    comment: string;
    requestedQuantity: number;
    status: string;
    requestedAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface PmsStatsResponseData {
    totalPmsSupplied: number
    pmsLeftToSupply: number,
    pendingRequestsCount: number,
    period: "week" | "year" | "day" | "month"
}
export interface PmsStatsResponse extends BaseApiResponse {
    status: "success" | "failed"
    data?: PmsStatsResponseData
}
export type PmsStatsApiResponse = BaseApiResponse<PmsStatsResponseData>

export type PmsSupplyApiResponse = BaseApiResponse<{
    data:SupplyData[]
    total: number,
    page: number,
    limit: number,
    totalPages: number
}>
export interface PmsSupplyResponse extends PmsSupplyApiResponse{
    status:"success" | "failed"
}