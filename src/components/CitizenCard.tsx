"use client";

import { CreditCard, Phone, User } from "lucide-react";
import { Citizen } from "@/lib/types";

export function CitizenCard({ citizen }: { citizen: Citizen }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center w-full">
      <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
        <User className="h-8 w-8 text-blue-600" />
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Full Name</p>
          <p className="text-lg font-semibold text-slate-900">{citizen.name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
            <CreditCard className="h-3 w-3" /> Aadhaar ID
          </p>
          <p className="text-lg font-mono text-slate-900 tracking-wider">
            {citizen.aadhaar}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-1">
            <Phone className="h-3 w-3" /> Registered Phone
          </p>
          <p className="text-lg font-mono text-slate-900">
            {citizen.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
