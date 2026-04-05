-- Relational SQL Schema for "One Person Many Realities + Policy Engine"

-- 1. Create Citizens Table (Master Profile)
CREATE TABLE public.citizens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    aadhaar TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Department Records Table (Relational)
CREATE TABLE public.department_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    citizen_id UUID REFERENCES public.citizens(id) ON DELETE CASCADE,
    department TEXT NOT NULL,
    income INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Poor', 'Middle', 'Rich')),
    scheme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Policies Table
CREATE TABLE public.policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    department TEXT NOT NULL,
    scheme TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'Central',
    eligibility_rules TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Seed Master Citizens
INSERT INTO public.citizens (id, name, aadhaar, phone)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ramesh Kumar', 'XXXX1234', '98XXXXXX'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Sita Devi', 'XXXX5678', '91XXXXXX'),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Arjun Singh', 'XXXX9012', '88XXXXXX'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Priya Sharma', 'XXXX3456', '77XXXXXX'),
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'Deepak Verma', 'XXXX7890', '99XXXXXX');

-- 5. Seed Department Records (with conflicts)
INSERT INTO public.department_records (citizen_id, department, income, category, scheme)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Food', 120000, 'Poor', 'Free Ration'),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Tax', 850000, 'Rich', 'Filed Returns'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Health', 50000, 'Poor', 'Ayushman Bharat'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Education', 150000, 'Middle', 'Scholarship'),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Tax', 1200000, 'Rich', 'Standard Tax'),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Food', 1200000, 'Rich', 'None'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Health', 300000, 'Middle', 'General Insurance'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Food', 80000, 'Poor', 'Subsidy Ration'),
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'Education', 450000, 'Middle', 'Book Subsidy'),
    ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'Health', 450000, 'Middle', 'Standard Health');

-- 6. Seed Policies
INSERT INTO public.policies (department, scheme, type, eligibility_rules)
VALUES 
    ('Food', 'Free Ration', 'Central', 'Annual family income must be below 2,00,000 INR. Category should be "Poor".'),
    ('Health', 'Ayushman Bharat', 'Central', 'Primary eligibility for "Poor" household categories (BPL).'),
    ('Tax', 'Exemptions', 'Central', 'Standard tax exemptions for income above 5,00,000 INR. Citizens in "Rich" category do not qualify for BPL benefits.'),
    ('Education', 'Merit Scholarship', 'State', 'Income must be below 3,00,000 INR. Open to "Poor" and "Middle" categories.');

ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.department_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read" ON public.citizens FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.department_records FOR SELECT USING (true);
CREATE POLICY "Public Read" ON public.policies FOR SELECT USING (true);
