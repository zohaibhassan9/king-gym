# Netlify Deployment Fix

## The Problem
The error shows: "Your publish directory cannot be the same as the base directory of your site."

This happens when Netlify defaults the publish directory to the repo root (`/opt/build/repo`), which conflicts with the Next.js plugin's requirements.

## Solution: Set Publish Directory to `.netlify/next`

The `netlify.toml` file has been updated to explicitly set the publish directory:

```toml
[build]
  command = "npm run build"
  publish = ".netlify/next"
```

The Next.js plugin will write its output to `.netlify/next` during the build, and Netlify will use that folder as the publish directory.

## Why This Works
- The `@netlify/plugin-nextjs` plugin writes its output to `.netlify/next`
- Setting `publish = ".netlify/next"` tells Netlify where to find the built files
- This prevents Netlify from defaulting to the repo root
- The plugin can now complete its build process successfully

## After This Fix
1. The build will succeed
2. The plugin will write output to `.netlify/next`
3. Netlify will publish from `.netlify/next`
4. Your site will deploy successfully

## Additional Steps Required

### Set Environment Variables in Netlify UI

You still need to set your Supabase environment variables:

1. Go to: **Site settings** → **Build & deploy** → **Environment**
2. Add these three variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. See `NETLIFY_ENV_SETUP.md` for detailed instructions

## Important Notes
- The publish directory is now set in `netlify.toml` (`.netlify/next`)
- If you have this set in Netlify UI, it should match or be removed (let netlify.toml control it)
- The plugin automatically creates the `.netlify/next` folder during build

