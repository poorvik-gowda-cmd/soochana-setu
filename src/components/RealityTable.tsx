"use client";

import { DepartmentRecord, EligibilityResult } from "@/lib/types";

export function RealityTable({ records, aiResults }: { records: DepartmentRecord[], aiResults?: EligibilityResult[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden w-full">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <h3 className="text-slate-900 font-semibold uppercase text-sm tracking-wider">Departmental Realities</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reported Income</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Scheme Beneficiary</th>
              {aiResults && <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Eligibility %</th>}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => {
              const aiResult = aiResults?.find(r => r.department === record.department);
              return (
                <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {record.department}
                      </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    ₹{record.income.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      record.category === "Poor" ? "text-rose-600" : 
                      record.category === "Middle" ? "text-amber-600" : "text-emerald-600"
                    }`}>
                      {record.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm italic">
                    {record.scheme}
                  </td>
                  {aiResults && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${aiResult && aiResult.percentage >= 70 ? 'bg-emerald-500' : aiResult && aiResult.percentage >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${aiResult?.percentage || 0}%` }}
                          />
                        </div>
                        <span className={`text-xs font-black ${aiResult && aiResult.percentage >= 70 ? 'text-emerald-600' : aiResult && aiResult.percentage >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
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
