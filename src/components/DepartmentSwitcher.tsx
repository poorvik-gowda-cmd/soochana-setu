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
    <div className="flex p-1.5 rounded-2xl w-fit items-center shadow-inner"
         style={{ background: "rgba(15,15,25,0.8)", border: "1px solid rgba(198,160,82,0.1)" }}>
      {DEPARTMENTS.map((dept) => {
        const isSelected = selected === dept.id;
        const Icon = dept.icon;
        
        return (
          <button
            key={dept.id}
            onClick={() => onSelect(dept.id)}
            className="relative flex items-center gap-3 px-6 py-2.5 rounded-xl transition-all duration-300"
            style={{ color: isSelected ? "#EAEAEA" : "rgba(234,234,234,0.35)" }}
          >
            {isSelected && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: "rgba(198,160,82,0.1)",
                  border: "1px solid rgba(198,160,82,0.25)",
                  boxShadow: "0 0 15px rgba(198,160,82,0.1)",
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 p-1.5 rounded-lg transition-colors duration-300"
                  style={{
                    background: isSelected ? "rgba(198,160,82,0.2)" : "rgba(255,255,255,0.04)",
                    color: isSelected ? "#c6a052" : "rgba(234,234,234,0.35)",
                  }}>
              <Icon className="h-4 w-4" />
            </span>
            <span className="relative z-10 text-xs font-black uppercase tracking-widest">{dept.label}</span>
          </button>
        );
      })}
    </div>
  );
}
