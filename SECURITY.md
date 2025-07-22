# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Record Record, please report it responsibly:

### Preferred Method: GitHub Security Advisories

1. Go to the [Security tab](https://github.com/Noahdp/record-record/security) of this repository
2. Click "Report a vulnerability"
3. Fill out the private vulnerability report form

### Alternative Method: GitHub Issues

For non-sensitive security issues, you can [create a public issue](https://github.com/Noahdp/record-record/issues) with the "security" label.

### What to Include

Please include the following information in your report:

- **Description**: Clear description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Impact Assessment**: Potential impact and affected components
- **Environment**: Browser, OS, Node.js version, etc.
- **Suggested Fix**: Any potential solutions (if you have them)

## Response Timeline

- **Acknowledgment**: We will acknowledge receipt within 48 hours
- **Initial Assessment**: Initial response within 7 days
- **Resolution**: Critical vulnerabilities will be prioritized for immediate fixes

## Security Best Practices

When using Record Record:

1. **Environment Variables**: Never commit `.env` files or expose API keys
2. **Dependencies**: Keep dependencies updated using `npm audit`
3. **HTTPS**: Always use HTTPS in production environments
4. **API Rate Limits**: Respect Discogs API rate limits to avoid service disruption
