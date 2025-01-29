---
sidebar_position: 1
title: Creating a Matrix Server
description: A guide to setting up a Matrix Synapse server for Grid
---

# Creating a Matrix Server for Grid

Grid uses Matrix for its backend infrastructure to ensure secure, decentralized communication. This guide will walk you through setting up your own Matrix Synapse server for use with Grid. For more robust documentation from the creators of Synapse, visit: https://element-hq.github.io/synapse/latest/setup/installation.html.

## Disclaimer ⚠️

**If self hosting, use a new account on your Matrix server.**
Grid is not currently intended to be used in conjunction with
an account utilized for messaging (Element, Fluffychat, etc). Grid will "clean up" all non-Grid created Matrix rooms. Please 
see <code>Self Hosting</code> in the sidebar for more specifics on self hosting.

**Grid is not tested for Federation** therefore we do not recommend you use federated servers. Grid was developed to utilize Matrix for E2EE, but has not 
been designed or tested to integrate with federated servers. Therefore, please do not utilize Grid with your homeserver with the presumption that standard 
Matrix client's functionality, like Element, will apply to Grid. We are exploring how to properly integrate Grid into federation, etc. however, our first goal 
was to provide a E2EE location sharing alternative that can be easily self hosted.

**Grid has not been extensively tested on different homeservers** therefore please continue at your own risk if self hosting. The security of your stack and homeserver
is your responsibility, as Grid is just the client to implement location sharing.

**Map Tiles are not E2EE.** Grid utilizes Protomaps to provide map tiles. You can read more about map tile privacy at: https://mygrid.app/mapdata/. Protomaps is a 
serverless map tile solution where tiles can be delivered via byte range from a file. Currently, Grid utilizes Protomaps which is hosted in Cloudflare for privacy
considerations. Grid does not keep logs of requested tiles; however, Cloudflare may log some details for metrics, analytics, etc. Cloudflare's privacy policy can be found at https://www.cloudflare.com/privacypolicy/. For self hosting, we support the utilization of our hosted maps; however, we also have documentation for self hosting your own map tiles as well.



## Prerequisites

Before starting, ensure you have:
- A server/VPS with at least 1GB RAM (2GB recommended)
- A domain name pointed to your server
- Basic knowledge of command line and server administration
- Ubuntu 22.04 or later (recommended, other distributions are supported)
- Root or sudo access to your server

## Installation Methods

There are several ways to install Synapse. We'll cover the two most common methods:

1. Using Debian/Ubuntu packages (recommended for production)
2. Using Docker (recommended for testing)

## Method 1: Debian/Ubuntu Installation

### 1. System Preparation

First, update your system:

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Install Required Packages

```bash
sudo apt install -y lsb-release wget apt-transport-https
```

### 3. Add Matrix Repository

```bash
sudo wget -O /usr/share/keyrings/matrix-org-archive-keyring.gpg https://packages.matrix.org/debian/matrix-org-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/matrix-org-archive-keyring.gpg] https://packages.matrix.org/debian/ $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/matrix-org.list
```

### 4. Install Synapse

```bash
sudo apt update
sudo apt install matrix-synapse-py3
```

During installation, you'll be prompted for your server name. Enter your domain name (e.g., `matrix.yourdomain.com`).

## Method 2: Docker Installation

### 1. Install Docker

If you haven't installed Docker yet:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### 2. Create a Docker Composition File

Create a new file called `docker-compose.yml`:

```bash
nano docker-compose.yml
```

Add the following content:

```yaml
version: '3'

services:
  synapse:
    image: matrixdotorg/synapse:latest
    container_name: synapse
    volumes:
      - ./data:/data
    ports:
      - "8008:8008"
    environment:
      - VIRTUAL_HOST=matrix.yourdomain.com
      - SYNAPSE_SERVER_NAME=yourdomain.com
      - SYNAPSE_REPORT_STATS=yes
```

### 3. Generate Configuration

```bash
docker run -it --rm \
    -v ./data:/data \
    -e SYNAPSE_SERVER_NAME=yourdomain.com \
    -e SYNAPSE_REPORT_STATS=yes \
    matrixdotorg/synapse:latest generate
```

## Database Setup (For Production)

For production use, PostgreSQL is recommended over SQLite:

### 1. Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib
```

### 2. Create Database and User

```bash
sudo -u postgres psql

CREATE USER "synapse" WITH PASSWORD 'your_secure_password';
CREATE DATABASE "synapse" ENCODING 'UTF8' LC_COLLATE='C' LC_CTYPE='C' template=template0 OWNER "synapse";
\q
```

### 3. Update Synapse Configuration

Edit `homeserver.yaml`:

```yaml
database:
  name: psycopg2
  args:
    database: synapse
    user: synapse
    password: your_secure_password
    host: localhost
    cp_min: 5
    cp_max: 10
```

## Setting up TLS with Certbot

### 1. Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Obtain Certificate

```bash
sudo certbot certonly --nginx -d matrix.yourdomain.com
```

### 3. Configure Nginx

Create `/etc/nginx/sites-available/matrix`:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name matrix.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/matrix.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/matrix.yourdomain.com/privkey.pem;

    # Modern configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS (uncomment if you're sure)
    # add_header Strict-Transport-Security "max-age=63072000" always;

    location /_matrix {
        proxy_pass http://localhost:8008;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;

        # Nginx by default only allows file uploads up to 1M in size
        client_max_body_size 50M;
    }

    location /.well-known/matrix {
        root /var/www/html/;
        default_type application/json;
        add_header Access-Control-Allow-Origin *;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/matrix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Server Configuration

### 1. Registration Settings

For a detailed homeserver.yaml config recommendation please see <code>Server Configuration</code> on the sidebar.

Edit `homeserver.yaml`:

```yaml
# Enable registration for new users
enable_registration: false  # Set to true to allow registration
registration_requires_token: false  # Set to true to require registration tokens
```

### 2. Rate Limiting 

Add to `homeserver.yaml`:

```yaml
rc_messages_per_second: 50 # allow for increased location messages
rc_message_burst_count: 10
rc_registration:
    per_second: 0.17
    burst_count: 3
```

## Configuring Grid

Once your Matrix server is running, configure Grid:

1. Open Grid (initial landing page of app)
2. Go to Custom Provider
3. Enter your Matrix server details:
   - Homeserver URL: `matrix.yourdomain.com`
   - User ID: Login with `yourusername` from your full `@username:yourdomain.com`
4. Enable Sign Up in homeserver.yaml to utilize the sign up page in Grid.

## Security Best Practices

- Keep all software updated regularly
- Enable automatic security updates
- Use strong passwords
- Configure firewall rules (UFW)
- Set up fail2ban
- Monitor logs
- Regular backups
- Limit SSH access

## Regular Maintenance

### 1. Update Synapse

For package installation:
```bash
sudo apt update
sudo apt upgrade
```

For Docker:
```bash
docker-compose pull
docker-compose up -d
```

### 2. Backup Database

```bash
sudo -u postgres pg_dump synapse > synapse_backup_$(date +%Y%m%d).sql
```

### 3. Certificate Renewal

```bash
sudo certbot renew
```

## Additional Resources

- [Official Synapse Documentation](https://element-hq.github.io/synapse/latest/)
- [Matrix Security Documentation](https://matrix-org.github.io/synapse/latest/usage/configuration/config_documentation.html#security)
- [Grid Documentation](https://docs.mygrid.app)
- [Matrix FAQ](https://matrix.org/faq/)