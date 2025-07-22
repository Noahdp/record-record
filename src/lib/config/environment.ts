/**
 * Environment variable validation and configuration
 * Ensures all required environment variables are present and valid
 */

export interface EnvironmentConfig {
  discogs: {
    consumerKey: string;
    consumerSecret: string;
  };
  database: {
    url: string;
  };
  app: {
    nodeEnv: string;
  };
}

/**
 * Validates and returns environment configuration
 * Throws an error if any required environment variables are missing
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const requiredEnvVars = ["DISCOGS_CONSUMER_KEY", "DISCOGS_CONSUMER_SECRET"];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}. ` +
        "Please check your .env.local file and ensure all required variables are set."
    );
  }

  return {
    discogs: {
      consumerKey: process.env.DISCOGS_CONSUMER_KEY!,
      consumerSecret: process.env.DISCOGS_CONSUMER_SECRET!,
    },
    database: {
      url: process.env.DATABASE_URL || "file:./prisma/dev.db",
    },
    app: {
      nodeEnv: process.env.NODE_ENV || "development",
    },
  };
}

/**
 * Get validated Discogs API credentials
 */
export function getDiscogsCredentials() {
  const config = getEnvironmentConfig();
  return config.discogs;
}
