-- SQL Upgrade for Structured Policy Tables

-- 1. Add structured columns to Policies
ALTER TABLE public.policies 
ADD COLUMN min_income INTEGER DEFAULT 0,
ADD COLUMN max_income INTEGER DEFAULT 10000000,
ADD COLUMN required_category TEXT DEFAULT 'All';

-- 2. Update existing seeds with structured data
UPDATE public.policies SET min_income = 0, max_income = 200000, required_category = 'Poor' WHERE scheme = 'Free Ration';
UPDATE public.policies SET min_income = 0, max_income = 150000, required_category = 'Poor' WHERE scheme = 'Ayushman Bharat';
UPDATE public.policies SET min_income = 500000, max_income = 10000000, required_category = 'Rich' WHERE scheme = 'Exemptions';
UPDATE public.policies SET min_income = 0, max_income = 300000, required_category = 'Middle' WHERE scheme = 'Merit Scholarship';
