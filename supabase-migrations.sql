-- Supabase Migration SQL
-- Run this in your Supabase SQL Editor to create the tables

-- Create members table (explicitly in public schema)
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

-- Create payments table (explicitly in public schema)
CREATE TABLE IF NOT EXISTS public.payments (
  id BIGSERIAL PRIMARY KEY,
  member_id BIGINT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  method VARCHAR(255) NOT NULL,
  status VARCHAR(255) DEFAULT 'pending',
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance table (explicitly in public schema)
CREATE TABLE IF NOT EXISTS public.attendance (
  id BIGSERIAL PRIMARY KEY,
  member_id BIGINT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  date VARCHAR(255) NOT NULL,
  check_in_time VARCHAR(255),
  check_out_time VARCHAR(255),
  status VARCHAR(255) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_member_id ON members(member_id);
CREATE INDEX IF NOT EXISTS idx_members_status ON members(status);
CREATE INDEX IF NOT EXISTS idx_payments_member_id ON payments(member_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_attendance_member_id ON attendance(member_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at BEFORE UPDATE ON attendance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (optional but recommended)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication needs)
-- For now, allow all operations (you should restrict this based on your auth setup)
CREATE POLICY "Allow all operations on members" ON members
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on payments" ON payments
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on attendance" ON attendance
    FOR ALL USING (true) WITH CHECK (true);

