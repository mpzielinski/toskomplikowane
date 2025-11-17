/** @type {import('next').NextConfig} */

// Validate required environment variables at build time
const requiredEnvVars = ['NEXT_PUBLIC_N8N_WEBHOOK_URL']

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(
      `Missing required environment variable: ${envVar}\n` +
      `Please ensure ${envVar} is set in your GitHub repository secrets ` +
      `and the workflow is passing it to the build step.`
    )
  }
}

console.log('✓ All required environment variables are present')
console.log(`✓ N8N Webhook URL configured: ${process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL?.substring(0, 30)}...`)

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Remove basePath since you're using a custom domain
  basePath: '',
}

export default nextConfig
