# King Gym Website Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? No
   - Project name: king-gym
   - Directory: ./
   - Override settings? No

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=out
   ```

### Option 3: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Export static files**:
   ```bash
   npm run export
   ```

3. **Upload the `out` folder** to any static hosting service

## 📋 Pre-Deployment Checklist

- [x] Database files are in `/data` directory
- [x] All images are in `/public` directory
- [x] Environment variables are configured
- [x] Build process completes successfully
- [x] All pages are accessible

## 🔧 Environment Variables

No environment variables are required for this deployment.

## 📁 Project Structure

```
king-gym/
├── data/                 # JSON database files
├── public/              # Static assets
├── src/                 # Source code
├── lib/                 # Database utilities
└── package.json         # Dependencies
```

## 🌐 Live URLs

After deployment, your website will be available at:
- **Vercel**: `https://king-gym-xxx.vercel.app`
- **Netlify**: `https://king-gym-xxx.netlify.app`

## 🔄 Updates

To update the deployed website:
1. Make your changes
2. Commit to git
3. Push to your repository
4. Vercel/Netlify will automatically redeploy

## 📞 Support

For deployment issues, check:
1. Build logs in your hosting platform
2. Console errors in browser
3. Network tab for API failures
