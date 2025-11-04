-- ============================================
-- CREATE TABLES IN SUPABASE - RUN THIS NOW
-- ============================================
-- Copy ALL of this SQL and paste it into Supabase SQL Editor
-- Then click "Run"

-- Create members table
CREATE TABLE IF NOT EXISTS public.members (
  id BIGSERIAL PRIMARY KEY,
  member_id VARCHAR(255) UNIQUE NOT NULL,
  member_name VARCHAR(255) NOT NULL,
  cnic_number VARCHAR(255),
  contact_number VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  package VARCHAR(255) NOT NULL,
  package_price INTEGER NOT NULL,
  discount INTEGER DEFAULT 0,
  final_price INTEGER NOT NULL,
  joining_date VARCHAR(255) NOT NULL,
  expiry_date VARCHAR(255) NOT NULL,
  photo TEXT,
  status VARCHAR(255) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id BIGSERIAL PRIMARY KEY,
  member_id BIGINT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  method VARCHAR(255) NOT NULL,
  status VARCHAR(255) DEFAULT 'pending',
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS public.attendance (
  id BIGSERIAL PRIMARY KEY,
  member_id BIGINT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  date VARCHAR(255) NOT NULL,
  check_in_time VARCHAR(255),
  check_out_time VARCHAR(255),
  status VARCHAR(255) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_member_id ON public.members(member_id);
CREATE INDEX IF NOT EXISTS idx_members_status ON public.members(status);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON public.payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON public.attendance(member_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_members_updated_at ON public.members;
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_attendance_updated_at ON public.attendance;
CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON public.attendance
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- Enable Row Level Security
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (for now)
DROP POLICY IF EXISTS "Allow all operations on members" ON public.members;
CREATE POLICY "Allow all operations on members" ON public.members
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on payments" ON public.payments;
CREATE POLICY "Allow all operations on payments" ON public.payments
    FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations on attendance" ON public.attendance;
CREATE POLICY "Allow all operations on attendance" ON public.attendance
    FOR ALL USING (true) WITH CHECK (true);

-- Refresh PostgREST schema cache
NOTIFY pgrst, 'reload schema';

-- Verify tables were created
SELECT 
    table_name,
    table_schema
FROM information_schema.tables
WHERE table_schema = 'public' 
    AND table_name IN ('members', 'payments', 'attendance')
ORDER BY table_name;

