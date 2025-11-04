# Netlify Deployment Fix

## The Problem
The error shows: "Your publish directory cannot be the same as the base directory of your site."

This happens when Netlify defaults the publish directory to the repo root (`/opt/build/repo`), which conflicts with the Next.js plugin's requirements.

## Solution: Let the Plugin Handle Everything

**Keep Base directory as `/`** - This is correct and Netlify auto-adds it (can't be truly empty).

**DO NOT set a publish directory** - The `@netlify/plugin-nextjs` plugin manages this automatically.

The `netlify.toml` configuration:

```toml
[build]
  command = "npm run build"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**In Netlify UI, ensure:**
- **Base directory:** `/` (this is fine, Netlify auto-adds it)
- **Publish directory:** Not set / Empty (this is critical!)

The plugin will create `.netlify/next` after the build and tell Netlify where to publish from.

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

