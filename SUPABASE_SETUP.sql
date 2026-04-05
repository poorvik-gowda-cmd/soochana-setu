-- SQL Schema for One Person Many Realities

-- 1. Create the Table
CREATE TABLE public.citizen_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    aadhaar TEXT NOT NULL,
    phone TEXT NOT NULL,
    department TEXT NOT NULL,
    income INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Poor', 'Middle', 'Rich')),
    scheme TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Insert Seed Data (Conflicting Records)
INSERT INTO public.citizen_records (name, aadhaar, phone, department, income, category, scheme)
VALUES 
    -- Ramesh Kumar (Conflict: Food vs Tax)
    ('Ramesh Kumar', 'XXXX1234', '98XXXXXX', 'Food', 120000, 'Poor', 'Free Ration'),
    ('Ramesh Kumar', 'XXXX1234', '98XXXXXX', 'Tax', 850000, 'Rich', 'Filed Returns'),
    
    -- Sita Devi (Conflict: Health vs Education)
    ('Sita Devi', 'XXXX5678', '91XXXXXX', 'Health', 50000, 'Poor', 'Ayushman Bharat'),
    ('Sita Devi', 'XXXX5678', '91XXXXXX', 'Education', 150000, 'Middle', 'Scholarship'),
    
    -- Arjun Singh (Aligned: Tax vs Food)
    ('Arjun Singh', 'XXXX9012', '88XXXXXX', 'Tax', 1200000, 'Rich', 'Standard Tax'),
    ('Arjun Singh', 'XXXX9012', '88XXXXXX', 'Food', 1200000, 'Rich', 'None'),
    
    -- Priya Sharma (Conflict: Health vs Food)
    ('Priya Sharma', 'XXXX3456', '77XXXXXX', 'Health', 300000, 'Middle', 'General Insurance'),
    ('Priya Sharma', 'XXXX3456', '77XXXXXX', 'Food', 80000, 'Poor', 'Subsidy Ration'),
    
    -- Deepak Verma (Aligned: Education vs Health)
    ('Deepak Verma', 'XXXX7890', '99XXXXXX', 'Education', 450000, 'Middle', 'Book Subsidy'),
    ('Deepak Verma', 'XXXX7890', '99XXXXXX', 'Health', 450000, 'Middle', 'Standard Health');

-- 3. Policy for Public Read (Adjust as needed for production)
ALTER TABLE public.citizen_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON public.citizen_records FOR SELECT USING (true);
