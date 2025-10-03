-- SIMPLE FIX - Remove all RLS restrictions completely
-- This will allow all operations without any conditions

-- Disable RLS temporarily to fix the issue
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies completely
DROP POLICY IF EXISTS "Enable delete for anon users" ON inquiries;
DROP POLICY IF EXISTS "Enable insert for all users" ON inquiries;
DROP POLICY IF EXISTS "Enable update for anon users" ON inquiries;
DROP POLICY IF EXISTS "Enable delete for anon users" ON properties;
DROP POLICY IF EXISTS "Enable insert for anon users" ON properties;
DROP POLICY IF EXISTS "Enable read access for all users" ON properties;
DROP POLICY IF EXISTS "Enable update for anon users" ON properties;

-- Create simple, unrestricted policies
CREATE POLICY "allow_all_inquiries" ON inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_properties" ON properties FOR ALL USING (true) WITH CHECK (true);

-- Verify the fix
SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('inquiries', 'properties');