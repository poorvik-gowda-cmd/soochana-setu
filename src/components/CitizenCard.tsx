"use client";

import { CreditCard, Phone, User } from "lucide-react";
import { Citizen } from "@/lib/types";

export function CitizenCard({ citizen }: { citizen: Citizen }) {
  return (
    <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] rounded-2xl shadow-[0_0_40px_rgba(198,160,82,0.08)] border border-[rgba(198,160,82,0.15)] p-5 flex items-start gap-4 w-full max-w-[320px]">
      <div className="h-10 w-10 bg-[rgba(198,160,82,0.1)] border border-[rgba(198,160,82,0.2)] rounded-full flex items-center justify-center shrink-0">
        <User className="h-5 w-5 text-[#C6A052]" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-3 min-w-0">
        <div className="col-span-2 flex flex-col min-w-0">
          <p className="text-xs text-[#A1A1AA] mb-1">Full Name</p>
          <p className="text-white text-sm font-medium truncate">{citizen.name}</p>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-xs text-[#A1A1AA] mb-1 flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> Aadhaar ID
          </p>
          <p className="text-white text-sm font-medium break-all">
            {citizen.aadhaar}
          </p>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-xs text-[#A1A1AA] mb-1 flex items-center gap-1">
            <Phone className="h-3 w-3" /> Registered Phone
          </p>
          <p className="text-white text-sm font-medium break-all">
            {citizen.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
