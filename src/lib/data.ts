/**
 * One Person, Many Realities - Pure Data Layer
 * ALL hardcoded mock data has been removed to ensure pure backend connectivity.
 * Data must now be managed via the /admin/data center or directly in Supabase.
 */

import { DepartmentType, HeatmapData } from "./types";

// NOTE: These are now empty or fetch-driven to prevent "Mock" data from appearing.
// All UI components will now show empty states if Supabase is not populated.

export const HEATMAP_MOCK_DATA: HeatmapData[] = []; 

// This will trigger an empty state in the heatmap until the admin completes an audit/sync.
