# Security Policy

## Supported Versions

We currently support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in Record Record, please report it privately by:

1. **Email**: Send details to [your-security-email@example.com] (replace with actual email)
2. **GitHub**: Use the private vulnerability reporting feature on GitHub

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if available)

## What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Investigation**: We will investigate and validate the reported vulnerability
- **Timeline**: We aim to provide an initial response within 7 days
- **Resolution**: We will work to resolve critical vulnerabilities as quickly as possible

## Security Best Practices

When using Record Record:

1. **Environment Variables**: Never commit `.env` files or expose API keys
2. **Dependencies**: Keep dependencies updated using `npm audit`
3. **HTTPS**: Always use HTTPS in production environments
4. **API Rate Limits**: Respect Discogs API rate limits to avoid service disruption

## Disclosure Policy

- We follow responsible disclosure principles
- We will credit security researchers who report vulnerabilities (unless they prefer to remain anonymous)
- We will coordinate with you on the disclosure timeline

Thank you for helping keep Record Record secure!
