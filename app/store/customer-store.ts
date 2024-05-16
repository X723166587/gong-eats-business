import {create} from 'zustand'
import { persist, createJSONStorage } from "zustand/middleware";
import { CustomerData } from "@/app/api/definitions";

export interface CustomerState {
    customerData: CustomerData
    setCustomerData: (data: CustomerData) => void
}

export const useCustomerStore = create(persist((set) => ({
    customerData: {},
    setCustomerData: () => set((state: CustomerState) => ({customerData: state.customerData}))
}), {
    name: 'current-customer',
    storage: createJSONStorage(() => sessionStorage)
}))