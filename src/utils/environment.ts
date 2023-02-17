export const Environment = {
  /**
   * Attempts to get the path to the home directory via the environment variable for each operating system.
   * @returns {string | null} path to home, or null if neither are defined
   */
  getHomeDirectory(): string | null {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || null
  },
}

