-- SQL for "Tamper-Proof Benefit Ledger" Module

-- 1. Create Audit Logs Table
CREATE TABLE public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    citizen_id UUID REFERENCES public.citizens(id) ON DELETE CASCADE,
    action TEXT NOT NULL, -- 'eligibility_check' | 'policy_simulation'
    data JSONB NOT NULL,
    hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Policy for Read (Public for the sake of demo, or filtered by Citizen ID if using real Auth)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Audit Logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Public Write Audit Logs" ON public.audit_logs FOR INSERT WITH CHECK (true);
