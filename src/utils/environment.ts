export const Environment = {
  getHomeDirectory(): string | null {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE || null
  },
}

