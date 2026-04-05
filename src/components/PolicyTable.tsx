"use client";

import { CitizenPortalPolicy } from "@/lib/types";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

export function PolicyTable({ policies }: { policies: CitizenPortalPolicy[] }) {
  const getStatusIcon = (status: CitizenPortalPolicy["status"]) => {
    switch (status) {
      case "Eligible": return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "Partial": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "Not Eligible": return <XCircle className="h-4 w-4 text-rose-500" />;
    }
  };

  const getStatusColor = (status: CitizenPortalPolicy["status"]) => {
    switch (status) {
      case "Eligible": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Partial": return "bg-amber-50 text-amber-700 border-amber-100";
      case "Not Eligible": return "bg-rose-50 text-rose-700 border-rose-100";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden w-full">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-slate-900 font-semibold uppercase text-sm tracking-wider">Eligible Government Schemes</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Policy Name</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Eligibility %</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reasoning</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => (
              <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{policy.policy_name}</td>
                <td className="px-6 py-4 text-sm text-slate-500 uppercase font-semibold">{policy.department}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-sm font-black text-slate-900">{policy.eligibility_percentage}%</span>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                      <div 
                        className={`h-full ${policy.eligibility_percentage > 70 ? 'bg-emerald-500' : policy.eligibility_percentage > 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${policy.eligibility_percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(policy.status)}`}>
                    {getStatusIcon(policy.status)}
                    {policy.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-600 leading-relaxed max-w-xs">{policy.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
