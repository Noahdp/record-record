# Record Record

A modern web application for managing your vinyl record collection, built with Next.js and integrated with the Discogs API.

## Features

- 🔍 Search for albums using the comprehensive Discogs database
- 📀 Add albums to your personal collection
- 📝 View detailed album information including tracklists, credits, and reviews
- 📱 Responsive design with Chakra UI
- 🎨 Modern, clean interface with smooth animations

## Screenshots

![Home Page](https://via.placeholder.com/800x400?text=Add+your+screenshots+here)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Discogs API credentials (consumer key and secret)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Noahdp/record-record.git
   cd record-record
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Discogs API credentials (see below for how to get them).

4. **Set up the database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Getting Discogs API Credentials

1. Visit the [Discogs Developer Portal](https://www.discogs.com/developers/)
2. Create a new application
3. Copy your Consumer Key and Consumer Secret to your `.env` file

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Chakra UI with Framer Motion animations
- **Database**: SQLite with Prisma ORM
- **API Integration**: Discogs API for music data
- **Styling**: Tailwind CSS + Chakra UI
- **Development**: ESLint, TypeScript, Hot Reload

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── collection/        # Collection management pages
│   └── ...
├── components/            # Reusable React components
│   ├── AlbumCard.tsx     # Individual album display
│   ├── AlbumGrid.tsx     # Grid layout for albums
│   └── ...
├── lib/                  # Utility libraries
│   └── db/              # Database operations
├── types/               # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## API Endpoints

- `GET /api/discogs/search?q={query}` - Search for albums
- `GET /api/discogs/{id}` - Get detailed album information
- `GET /api/collection/all` - Get user's collection
- `POST/DELETE /api/collection/{id}` - Add/remove from collection

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and TypeScript conventions
- Add types for all new functions and components
- Test your changes thoroughly
- Update documentation as needed

## Deployment

This project can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Noahdp/record-record)

Make sure to add your environment variables in the Vercel dashboard.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Discogs](https://www.discogs.com/) for providing the comprehensive music database API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Chakra UI](https://chakra-ui.com/) for the component library
- [Prisma](https://prisma.io/) for the database toolkit

## Support

If you like this project, please give it a ⭐ on GitHub!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
