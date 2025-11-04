# Netlify Deployment Fix

## The Problem
The error shows: "Your publish directory cannot be the same as the base directory of your site."

This happens when Netlify defaults the publish directory to the repo root (`/opt/build/repo`), which conflicts with the Next.js plugin's automatic output handling.

## Solution: Clear BOTH Base Directory and Publish Directory in Netlify UI

**You MUST do this in the Netlify dashboard:**

1. Go to your Netlify site dashboard: https://app.netlify.com/sites/kingfitness-club
2. Navigate to: **Site settings** → **Build & deploy** → **Continuous Deployment**
3. Click **Edit settings** in the Build settings section
4. Find **BOTH** of these fields:
   - **Base directory** → Clear/delete (leave empty)
   - **Publish directory** → Clear/delete (leave empty)
5. Click **Save**

## Why This Happens
- When no publish directory is set, Netlify defaults to the repo root
- The `@netlify/plugin-nextjs` plugin manages its own output directory automatically
- Having Base directory or Publish directory set conflicts with the plugin
- The plugin needs to control the output directory itself

## After Fixing
1. The build will succeed
2. The plugin will automatically use the correct output directory (`.netlify` folder)
3. Your site will deploy successfully

## Important Notes
- **DO NOT** set Base directory or Publish directory when using `@netlify/plugin-nextjs`
- The plugin handles everything automatically
- The plugin creates its own output in `.netlify` folder
- Your `netlify.toml` is already correctly configured

