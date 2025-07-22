# Contributing to Record Record

This document provides guidelines and information for contributors to help ensure a smooth and productive contribution process.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. Please be respectful and considerate in all interactions.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues. When creating a bug report, include:

- **Clear and descriptive title**
- **Exact steps to reproduce the problem**
- **Expected vs actual behavior**
- **Screenshots or GIFs if applicable**
- **Environment details (OS, browser, Node.js version)**

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Please include:

- **Clear and descriptive title**
- **Step-by-step description of the suggested enhancement**
- **Current behavior and why it doesn't meet your needs**
- **Why this enhancement would be useful to other users**

### 🔧 Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Follow the development setup** outlined below
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Create a pull request** with a clear title and description

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Discogs API credentials (for testing API integration)

2. **Installation:**
   ```bash
   git clone https://github.com/your-username/record-record.git
   cd record-record
   npm install
   cp .env.example .env
   # Add your Discogs API credentials to .env
   npx prisma generate
   npx prisma db push
   npm run dev
   ```

## Code Style Guidelines

- **TypeScript**: All new code should be written in TypeScript with proper type definitions
- **Formatting**: Use the project's ESLint configuration
- **Components**: Follow React functional component patterns with hooks
- **File naming**: Use PascalCase for components, camelCase for utilities
- **Imports**: Use absolute imports with the `@/` prefix when possible

## Commit Message Format

Use clear, descriptive commit messages:

```
type(scope): description

feat(albums): add album detail modal
fix(collection): resolve duplicate entries bug
docs(readme): update installation instructions
style(ui): improve responsive design for mobile
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Request Process

1. **Before submitting:**

   - Ensure your code follows the style guidelines
   - Run `npm run lint` to check for linting errors
   - Run `npm run build` to ensure the project builds successfully
   - Test your changes manually

2. **Pull request description should include:**

   - Clear description of what the PR does
   - Screenshots for UI changes
   - Steps to test the changes
   - Any breaking changes

3. **Review process:**
   - All PRs require at least one review
   - Address any feedback or requested changes
   - Ensure CI checks pass

## Reporting Issues

When reporting bugs or requesting features:

1. **Search existing issues** first to avoid duplicates
2. **Use the issue templates** if available
3. **Provide detailed information:**
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Environment details (OS, browser, Node version)
   - Screenshots or error messages

## Areas for Contribution

We welcome contributions in these areas:

- **Features**: New functionality for album management
- **UI/UX**: Improvements to the user interface and experience
- **Performance**: Optimizations for speed and efficiency
- **Testing**: Unit tests, integration tests, E2E tests
- **Documentation**: Improvements to README, code comments, and guides
- **Bug fixes**: Resolving reported issues
- **Accessibility**: Making the app more accessible to all users

## Development Tips

- **Database changes**: When modifying the Prisma schema, run `npx prisma db push` to update the database
- **API testing**: Use tools like Postman or curl to test API endpoints
- **Component development**: Use Storybook (if set up) or create isolated test pages
- **Discogs API**: Be mindful of rate limits when testing API integrations

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to maintain a welcoming environment for all contributors.

## Questions?

If you have questions about contributing, feel free to:

- Open an issue with the "question" label
- Start a discussion in the GitHub Discussions tab
- Reach out to the maintainers
