# Waymarks content system

Blog posts and case studies for waymarks.agency, managed in Sanity and published as fast static pages.

```
You write in the admin panel  ->  click Publish  ->  GitHub builds the pages  ->  uploads them to cPanel
(waymarks.sanity.studio)                            (about 1 to 2 minutes)       (/blog/ and /case-studies/)
```

Nothing runs on your hosting except plain HTML files, so PageSpeed scores stay the same as the hand-built pages.

## What is in this folder

| Folder | What it does |
| --- | --- |
| `studio/` | The admin panel (Sanity Studio): blog posts, case studies, topics and authors |
| `build/` | Turns the content into HTML pages, an RSS feed and a sitemap |
| `seed/` | Starter content: the 9 current blog posts, 6 topics, 1 author and a sample case study |
| `fixtures/` | The same starter content as a local file, for testing the build without internet |
| `.github/workflows/` | The automation: deploy the admin panel, import starter content, publish the site |

## One-time setup

You need three free accounts: **Sanity**, **GitHub** and your existing **cPanel**. You do not need to install anything on your computer.

### 1. Create the Sanity project
1. Sign up at https://www.sanity.io (Google login is fine).
2. Go to https://www.sanity.io/manage and click **Create new project**. Name it `Waymarks`.
3. When asked for a dataset, create **production** and choose **Public**. (Public means the published posts can be read without a password, which is what a public blog needs. Drafts stay private.)
4. Copy the **Project ID** shown at the top of the project page. It looks like `a1b2c3d4`.

### 2. Create two Sanity tokens
In the project at sanity.io/manage, open **API → Tokens → Add API token**:
- Name `GitHub deploy`, permission **Deploy Studio**. Copy the token.
- Name `GitHub import`, permission **Editor**. Copy the token.

Each token is shown only once. Paste them somewhere safe until step 4.

### 3. Put this folder on GitHub
1. Sign up at https://github.com and create a **private** repository named `waymarks-cms`.
2. Click **uploading an existing file**, drag in everything from this folder (including the hidden `.github` folder), and click **Commit changes**.
   - The `.github` folder is hidden by default. On a Mac, press **Cmd + Shift + .** in Finder to show it. On Windows, use File Explorer → **View → Show → Hidden items**.
   - Check that the repository shows `.github/workflows/` with 3 files. If it doesn't, the automation won't run.

### 4. Add the secrets in GitHub
In the repository: **Settings → Secrets and variables → Actions → New repository secret**. Add:

| Name | Value |
| --- | --- |
| `SANITY_PROJECT_ID` | Project ID from step 1 |
| `SANITY_DEPLOY_TOKEN` | The Deploy Studio token |
| `SANITY_WRITE_TOKEN` | The Editor token |
| `FTP_SERVER` | `server234.web-hosting.com` (or `ftp.waymarks.agency`) |
| `FTP_USERNAME` | An FTP account from cPanel → FTP Accounts (see below) |
| `FTP_PASSWORD` | That FTP account's password |
| `FTP_SERVER_DIR` | The folder that holds your homepage `index.html`, ending in `/`, as the FTP account sees it, e.g. `public_html/` |

**FTP account:** in cPanel → **FTP Accounts**, create one named `deploy`, and set its directory to your site root, the folder with the homepage `index.html` and the `services` folder. If you set the directory to the site root itself, use `./` as `FTP_SERVER_DIR`.

### 5. Deploy the admin panel and import the starter content
In the repository, open **Actions**:
1. Run **Deploy admin panel**. When it finishes, open its log, find the line with the studio ID (`appId`), and add it as a secret named `SANITY_STUDIO_APP_ID`. The admin panel is now at https://waymarks.sanity.studio
2. Run **Import starter content**. The 9 blog posts appear in the admin panel within a minute.

### 6. Connect Publish to the website
1. Create a GitHub token: https://github.com/settings/personal-access-tokens/new. Choose **Only select repositories → waymarks-cms**, and under **Repository permissions** set **Contents** to **Read and write**. Copy it.
2. In sanity.io/manage → your project → **API → Webhooks → Create webhook**:
   - Name: `Publish website`
   - URL: `https://api.github.com/repos/YOUR-GITHUB-NAME/waymarks-cms/dispatches`
   - Dataset: `production`
   - Trigger on: **Create, Update, Delete**
   - Filter: `_type in ["post", "caseStudy", "category", "author"]`
   - Projection: `{"event_type": "sanity-publish"}`
   - HTTP method: **POST**
   - HTTP headers: `Authorization` = `Bearer YOUR-GITHUB-TOKEN`, and `Accept` = `application/vnd.github+json`
   - Leave **Trigger webhook when drafts are modified** off.
3. Run **Publish blog and case studies** once from the Actions tab. After that it runs by itself every time you publish.

### 7. Tell Google
In Google Search Console, submit `https://waymarks.agency/sitemap-content.xml`.

## Everyday use

- **New post:** waymarks.sanity.studio → Blog posts → **+** → fill in → **Publish**. Live in about 2 minutes.
- **Schedule a post:** set the publish date in the future. The daily run puts it live on that day.
- **Fix a typo:** open the post, change it, **Publish**.
- **Remove a post:** open it → menu (⋯) → **Unpublish** or **Delete**. The page is removed on the next publish.
- **Check a publish:** GitHub → Actions shows each run. Green means live; red shows what went wrong.

## Testing the build on a computer (optional)

With Node.js 20 or newer:

```bash
node seed/content.mjs                              # rebuild sample data from seed/content.mjs
node build/build.mjs --fixture fixtures/sample.json  # build with sample data into ./dist
SANITY_PROJECT_ID=a1b2c3d4 node build/build.mjs    # build with live Sanity content
```

The build has no npm dependencies. The Studio does: run `npm install` inside `studio/` before `npm run dev`.
