import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV !== 'production' || process.env.NETLIFY) {
    console.warn(
      'Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
    );
  }
}

// Create a dummy client for build-time safety
const createDummyClient = (): SupabaseClient => {
  // Return a client with placeholder values that won't cause errors during build
  // Using a valid URL format that Supabase will accept during build
  return createClient(
    'https://placeholder.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
};

// Create Supabase client for client-side usage (lazy initialization)
let clientInstance: SupabaseClient | null = null;

export const supabase = (() => {
  if (typeof window !== 'undefined') {
    // Client-side: create immediately if we have credentials
    if (supabaseUrl && supabaseAnonKey) {
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
  }
  // Server-side or build-time: use dummy client if credentials missing
  if (!clientInstance) {
    clientInstance = supabaseUrl && supabaseAnonKey
      ? createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        })
      : createDummyClient();
  }
  return clientInstance;
})();

// Create Supabase client for server-side usage (with service role key if needed)
export const createServerClient = (): SupabaseClient => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  // During build time, if env vars are missing, return dummy client
  if (!supabaseUrl || (!supabaseAnonKey && !serviceRoleKey)) {
    return createDummyClient();
  }
  
  if (serviceRoleKey) {
    return createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }
  
  // Fallback to anon key if service role key is not available
  if (supabaseAnonKey) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  
  // Final fallback to dummy client
  return createDummyClient();
};

