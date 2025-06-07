# Deployment Guide for Express Server with React App

This guide covers various hosting options for deploying your Express server that serves the React app and handles API proxying.

## Hosting Platforms

### 1. Render (Recommended - Free Tier Available)

**Steps:**

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign up
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `radhe-tableware-frontend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run server`
   - **Instance Type**: `Free` (or paid for better performance)

**Environment Variables (if needed):**

- `PORT`: Will be automatically set by Render
- `NODE_ENV`: `production`

### 2. Heroku

**Steps:**

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create radhe-tableware-app`
4. Deploy: `git push heroku main`

**Required Files:**

- `Procfile` (create in root):

```
web: npm run server
```

**Commands:**

```bash
# Create Procfile
echo "web: npm run server" > Procfile

# Deploy to Heroku
git add .
git commit -m "Add Express server for production"
git push heroku main
```

### 3. Vercel

**Steps:**

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

**Required Configuration:**
Create `vercel.json` in root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### 4. Railway

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect and deploy

### 5. DigitalOcean App Platform

**Steps:**

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create account and go to "Apps"
3. Click "Create App" → "GitHub"
4. Select repository and configure:
   - **Build Command**: `npm run build`
   - **Run Command**: `npm run server`

### 6. Netlify (Alternative approach)

Since Netlify is primarily for static sites, you'd need to use Netlify Functions:

**Steps:**

1. Build React app: `npm run build`
2. Deploy `build` folder to Netlify
3. Create Netlify Functions for API proxying

## Pre-Deployment Checklist

### 1. Update package.json

Ensure your package.json has the correct scripts:

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "server": "node server.js",
    "prod": "npm run build && npm run server"
  }
}
```

### 2. Environment Variables

Create `.env.production` file:

```bash
NODE_ENV=production
PORT=5000
```

### 3. Update server.js for production

The current server.js is already production-ready, but ensure:

- Port uses `process.env.PORT || 5000`
- Static files are served from `build` directory
- Error handling is in place

## Domain Configuration

### Custom Domain Setup

1. **Purchase domain** from providers like Namecheap, GoDaddy, etc.
2. **Configure DNS** in your hosting platform:
   - Add CNAME record pointing to your hosting platform's URL
   - Or add A record with the IP address

### SSL Certificate

Most hosting platforms (Render, Heroku, Vercel) provide free SSL certificates automatically.

## Performance Optimization

### 1. Enable Gzip Compression

Add to server.js:

```javascript
const compression = require("compression");
app.use(compression());
```

Install: `npm install compression`

### 2. Add Caching Headers

```javascript
app.use(
  express.static(path.join(__dirname, "build"), {
    maxAge: "1d", // Cache static files for 1 day
  })
);
```

### 3. Environment-specific Configuration

```javascript
if (process.env.NODE_ENV === "production") {
  // Production-specific settings
  app.use(compression());
}
```

## Monitoring and Logs

### 1. Add Logging

```javascript
const morgan = require("morgan");
app.use(morgan("combined"));
```

### 2. Health Check Endpoint

Add to server.js:

```javascript
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

## Troubleshooting

### Common Issues:

1. **Build fails**: Check Node.js version compatibility
2. **Static files not loading**: Verify build directory path
3. **API proxy not working**: Check backend server accessibility
4. **Port issues**: Ensure PORT environment variable is used

### Debug Commands:

```bash
# Check if build directory exists
ls -la build/

# Test server locally
npm run prod

# Check environment variables
echo $PORT
```

## Cost Comparison

| Platform     | Free Tier             | Paid Plans Start |
| ------------ | --------------------- | ---------------- |
| Render       | 750 hours/month       | $7/month         |
| Heroku       | 550-1000 hours/month  | $7/month         |
| Vercel       | Generous free tier    | $20/month        |
| Railway      | $5 credit/month       | Pay-as-you-go    |
| DigitalOcean | $100 credit (60 days) | $5/month         |
| Netlify      | Generous free tier    | $19/month        |
