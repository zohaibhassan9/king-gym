# Netlify Environment Variables Setup

To deploy this project on Netlify, you need to set the following environment variables in your Netlify dashboard.

## Required Environment Variables

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Your Supabase project URL
   - Example: `https://mxmqzqneifsalcsvazff.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Your Supabase anonymous/public key
   - Found in Supabase Dashboard → Settings → API

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Your Supabase service role key (for server-side operations)
   - Found in Supabase Dashboard → Settings → API
   - ⚠️ **Keep this secret!** Never expose this in client-side code.

## How to Set Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site (kingfitness-club)
3. Go to **Site configuration** → **Environment variables**
4. Click **Add variable** for each variable above
5. Enter the variable name and value
6. Click **Save**
7. Redeploy your site

## After Setting Variables

1. The build should now succeed
2. The application will connect to your Supabase database
3. All API routes will work correctly

## Troubleshooting

If you still see build errors:
- Make sure all three environment variables are set
- Check that the values are correct (no extra spaces)
- Verify your Supabase project is active
- Try redeploying after setting the variables

