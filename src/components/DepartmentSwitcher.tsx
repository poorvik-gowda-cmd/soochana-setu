"use client";

import { motion } from "framer-motion";
import { DepartmentType } from "@/lib/types";
import { Beef, Heart, Landmark, GraduationCap } from "lucide-react";

const DEPARTMENTS: { id: DepartmentType, label: string, icon: any }[] = [
  { id: "Food", label: "Food & Ration", icon: Beef },
  { id: "Tax", label: "Tax & Revenue", icon: Landmark },
  { id: "Health", label: "Health (Ayushman)", icon: Heart },
  { id: "Education", label: "Education", icon: GraduationCap }
];

export function DepartmentSwitcher({ selected, onSelect }: { selected: DepartmentType, onSelect: (id: DepartmentType) => void }) {
  return (
    <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit items-center shadow-inner">
      {DEPARTMENTS.map((dept) => {
        const isSelected = selected === dept.id;
        const Icon = dept.icon;
        
        return (
          <button
            key={dept.id}
            onClick={() => onSelect(dept.id)}
            className={`relative flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-300 ${isSelected ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {isSelected && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white rounded-xl shadow-md border border-slate-200"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className={`relative z-10 p-1.5 rounded-lg ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                <Icon className="h-4 w-4" />
            </span>
            <span className="relative z-10 text-xs font-black uppercase tracking-widest">{dept.label}</span>
          </button>
        );
      })}
    </div>
  );
}
