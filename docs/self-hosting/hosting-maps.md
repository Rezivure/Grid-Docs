---
sidebar_position: 3
title: Hosting Maps
description: Guide to setting up your own map tile provider using Protomaps
---

# Creating a Map Tile Provider

Grid allows users to set their own backend server and map tile provider through the "Custom Provider" interface. You can opt to use Grid provided maps as well 
even if self-hosting. This guide will walk you through setting up Protomaps as your map tile provider.

## About Protomaps

[Protomaps](https://protomaps.com) is a free and open source map of the world. Grid is currently configured to use PMTiles from Protomaps.

### What are PMTiles?

PMTiles is a single-file archive format for tiled map data. It enables:
- Hosting on commodity storage platforms like S3
- Low-cost, zero-maintenance map applications
- "Serverless" architecture - no custom tile backend needed
- Freedom from third-party provider dependencies

## Implementation Steps

### 1. Download Protomaps Build

First, download the latest Protomaps build:
- File size: approximately 106GB
- Download link: [Latest Protomaps Build](https://build.protomaps.com)

### 2. Extract Regional Data (Optional)

If you only need maps for specific regions:
1. Install the PMTiles CLI
2. Use it to extract your desired region
3. Follow the [PMTiles extraction documentation](https://docs.protomaps.com/pmtiles/tools#extract-subset) for detailed instructions

### 3. Upload to Cloudflare R2

We recommend using Cloudflare R2 for hosting PMTiles for several reasons:
- Strong privacy practices ([Privacy Policy](https://www.cloudflare.com/privacypolicy/))
- Cost-effective hosting and data serving
- Wide adoption among self-hosters
- Simplified implementation compared to traditional tile servers
- Seamless integration with Cloudflare's ecosystem

#### Upload Process

1. Set up `rclone` on your local machine
2. Configure it with your API key
3. Run the upload command:

```bash
rclone copyto my-filename my-configuration:my-bucket/my-folder/my-filename.pmtiles --progress --s3-chunk-size=256M
```

After upload, verify that your R2 bucket contains a "protomaps.pmtiles" file (approximately 100-130GB).

#### Alternative Hosting Options

While not yet extensively tested, alternatives like MinIO are available for self-hosting.

### 4. Create Cloudflare Worker

#### Using Cloudflare R2

1. Navigate to Cloudflare dashboard
2. Create a new Worker
3. Configure your `wrangler.toml` for R2 Bucket access
4. Use wrangler to build and deploy to Cloudflare

For detailed worker configuration, refer to the [Protomaps Cloudflare documentation](https://docs.protomaps.com/deploy/cloudflare).

#### Self-Hosted Option

To create a self-hosted worker:
1. Use Node.js to create an HTTP server
2. Implement the code from `/serverless/src/index.ts`
3. Configure your server for production use

### 5. Configure DNS

Choose one of these options:
- Point a subdomain (e.g., `maps.yourdomain.com`) to your Cloudflare Worker
- Use your static IP if self-hosting

### 6. Configure Grid App

1. Open Grid
2. Press "Custom Provider" on the landing page
3. Enter your Maps URL:

```
https://your.domain.com/v1/protomaps.pmtiles
```

## Troubleshooting

Common issues and solutions:

1. **Upload Failures**
   - Verify internet connection stability
   - Check R2 bucket permissions
   - Ensure sufficient storage space

2. **Worker Issues**
   - Verify worker routes are correctly configured
   - Check R2 bucket binding
   - Monitor worker logs for errors

3. **Map Loading Problems**
   - Verify URL format in Grid app
   - Check CORS configuration
   - Ensure pmtiles file is correctly uploaded

## Performance Optimization

To optimize your map tile service:
- Enable Cloudflare caching
- Configure appropriate cache headers
- Monitor bandwidth usage
- Consider regional deployments for better performance

## Cost Considerations

Typical monthly costs:
- R2 Storage: ~$0.015 per GB
- R2 Operations: First 1 million requests free
- Cloudflare Workers: 100,000 requests free per day

## License Information

- PMTiles reference implementations: BSD 3-Clause License
- PMTiles specification: Public domain (CC0 where applicable)
- Protomaps data: Various open licenses

## Additional Resources

- [Protomaps Documentation](https://docs.protomaps.com)
- [PMTiles Technical Specification](https://docs.protomaps.com/pmtiles/spec)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Grid Documentation](https://docs.mygrid.app)