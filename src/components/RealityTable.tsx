"use client";

import { DepartmentRecord, EligibilityResult } from "@/lib/types";

export function RealityTable({ records, aiResults }: { records: DepartmentRecord[], aiResults?: EligibilityResult[] }) {
  return (
    <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] rounded-[2rem] shadow-[0_0_40px_rgba(198,160,82,0.08)] border border-[rgba(198,160,82,0.15)] overflow-hidden w-full">
      <div className="px-8 py-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="text-white font-black uppercase text-xs tracking-[0.3em] italic">Departmental Realities</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-8 py-4 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Department</th>
              <th className="px-8 py-4 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Reported Income</th>
              <th className="px-8 py-4 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Category</th>
              <th className="px-8 py-4 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Scheme Beneficiary</th>
              {aiResults && <th className="px-8 py-4 text-[10px] font-black text-[#A1A1AA] uppercase tracking-[0.2em]">Eligibility %</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {records.map((record, index) => {
              const aiResult = aiResults?.find(r => r.department === record.department);
              return (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-[rgba(198,160,82,0.1)] text-[#C6A052] border border-[#C6A052]/20">
                        {record.department}
                      </span>
                  </td>
                  <td className="px-8 py-5 font-black text-white text-sm">
                    ₹{record.income.toLocaleString("en-IN")}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[11px] font-black uppercase tracking-widest ${
                      record.category === "Poor" ? "text-rose-500" : 
                      record.category === "Middle" ? "text-amber-500" : "text-[#C6A052]"
                    }`}>
                      {record.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-[#A1A1AA] text-xs italic font-medium">
                    {record.scheme}
                  </td>
                  {aiResults && (
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${aiResult && aiResult.percentage >= 70 ? 'bg-[#C6A052]' : aiResult && aiResult.percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${aiResult?.percentage || 0}%` }}
                          />
                        </div>
                        <span className={`text-[10px] font-black ${aiResult && aiResult.percentage >= 70 ? 'text-[#C6A052]' : aiResult && aiResult.percentage >= 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                          {aiResult?.percentage || 0}%
                        </span>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
