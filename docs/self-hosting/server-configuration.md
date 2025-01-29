---
sidebar_position: 2
title: Server Configuration
description: Detailed configuration guide for Matrix Synapse homeserver.yaml
---

# Synapse Server Configuration

This guide focuses on configuring your Matrix Synapse server for Grid, with an emphasis on security, privacy, and performance optimizations.

## Core Configuration File

The main configuration file for Synapse is `homeserver.yaml`. There are a few modifications that can be made to be optimized for Grid,
primarily the increase in message rates to allow for fast location sharing amongst several contacts and groups.

```yaml
# Basic Server Configuration
server_name: "yourdomain.com"
pid_file: /data/homeserver.pid

# Listener Configuration
listeners:
  # Main client-server API port
  - port: 8008
    tls: false
    type: http
    x_forwarded: true
    resources:
      - names: [client]
        compress: false

  # Replication port (if needed)
  - port: 9093
    bind_address: '0.0.0.0'
    type: http
    resources:
      - names: [replication]

# Federation Settings
allow_federation: false  # Disable federation for private Grid deployment

# Database Configuration
database:
  name: psycopg2
  args:
    user: synapse_user
    password: your_secure_password
    database: synapse
    host: localhost
    port: 5432
    sslmode: require  # Enforce SSL for database connections

# File Storage Paths
log_config: "/data/log_config.yaml"
media_store_path: /data/media_store

# Security Keys and Secrets
registration_shared_secret: "your_registration_secret"  # Required for registration
macaroon_secret_key: "your_macaroon_secret"
form_secret: "your_form_secret"
signing_key_path: "/data/signing.key"

# Key Server Configuration
trusted_key_servers:
  - server_name: "matrix.org"

# Rate Limiting Configuration
rc_message:
  # Increased limits for Grid's location sharing requirements
  per_second: 75    # Allow 75 messages per second
  burst_count: 75   # Allow bursts of up to 75 messages

rc_login:
  # Login attempt rate limiting
  address:
    per_second: 3
    burst_count: 3
  account:
    per_second: 3
    burst_count: 3
  failed_attempts:
    per_second: 3
    burst_count: 3

# Privacy Settings
room_directory:
  visibility: private  # Make rooms private by default

user_directory:
  enabled: false      # Disable user directory for privacy

# Registration and Security Features
enable_registration: false           # Disable public registration
encryption_enabled_by_default: true  # Enable encryption by default
enable_admin_http_api: true         # Enable admin API
```

## Key Configuration Sections Explained

### Rate Limiting
The configuration includes optimized rate limits for Grid's location sharing functionality:

```yaml
rc_message:
  per_second: 75    # Higher limit for frequent location updates
  burst_count: 75   # Allow bursts for batch updates
```

These limits are increased from Synapse's defaults to accommodate Grid's location sharing requirements while still providing protection against abuse.

### Federation Control
Federation is disabled to maintain a private server instance:

```yaml
allow_federation: false
```

This setting ensures your Grid server operates independently and doesn't communicate with other Matrix servers.

### Privacy Settings
Several privacy-enhancing configurations are enabled:

```yaml
room_directory:
  visibility: private  # Rooms are private by default

user_directory:
  enabled: false      # User directory is disabled

encryption_enabled_by_default: true  # Encryption is mandatory
```

These settings ensure:
- Rooms are not publicly listed
- Users cannot be discovered through the directory
- All communications are encrypted by default

### Database Security
The database configuration enforces SSL connections:

```yaml
database:
  name: psycopg2
  args:
    sslmode: require  # Enforce SSL for database connections
```

## Security Recommendations

1. **Secret Management**
   - Generate strong, unique values for all secrets:
     - `registration_shared_secret`
     - `macaroon_secret_key`
     - `form_secret`
   - Use a secure random generator for these values
   - Never reuse secrets across different deployments

2. **Rate Limiting Considerations**
   - Monitor the increased message rates for potential abuse
   - Adjust `rc_message` limits based on your specific needs
   - Keep login-related rate limits strict to prevent brute force attacks

3. **Admin API Security**
   - When `enable_admin_http_api: true`, ensure:
     - Strong admin passwords
     - Restricted access to admin endpoints
     - Regular audit of admin actions

## Monitoring and Maintenance

1. **Log Monitoring**
   - Regularly check logs at `/data/log_config.yaml`
   - Monitor for failed login attempts
   - Watch for rate limit violations

2. **Performance Monitoring**
   - Monitor database performance
   - Watch message throughput
   - Check media store usage

3. **Regular Updates**
   - Keep Synapse updated
   - Review and update rate limits as needed
   - Regularly rotate secrets

## Additional Resources

- [Synapse Configuration Documentation](https://element-hq.github.io/synapse/latest/usage/configuration/config_documentation.html)
- [Matrix Security Documentation](https://matrix.org/docs/guides/security-privacy-guide)
- [Grid Documentation](https://docs.mygrid.app)