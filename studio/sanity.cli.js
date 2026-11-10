import {defineCliConfig} from 'sanity/cli'

// Project ID and dataset come from environment variables in GitHub Actions,
// with your values as the fallback for running the Studio on your own computer.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'YOUR_PROJECT_ID',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
  // First deploy creates https://waymarks.sanity.studio. After that, copy the
  // studio ID the deploy log prints into the GitHub secret SANITY_STUDIO_APP_ID.
  studioHost: 'waymarks',
  deployment: {
    appId: process.env.SANITY_STUDIO_APP_ID || undefined,
    autoUpdates: true,
  },
})
