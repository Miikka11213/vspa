# Updating your V Spa website

GitHub repository: https://github.com/Miikka11213/vspa
Vercel project: https://vercel.com/vspa1/vspa
Hosted test site: https://vspa-eight.vercel.app
Production branch: main

The Vercel project is connected to this GitHub repository. Every successful push to main starts a new deployment. A successful build updates the hosted test address. A failed build keeps the previous successful deployment available.

## Edit locally, then publish to the test site

1. Open C:\Users\Miikka\Desktop\vspa in your editor.
2. Run npm.cmd run dev and check http://localhost:3000.
3. Save your edits. If you used the local photo manager, include app/photo-data.json and the new files in public/uploads.
4. Run npm.cmd run build to check the website before uploading it.
5. In GitHub Desktop, select vspa, review Changes, enter a summary, choose Commit to main, then Push origin.
6. Open the Vercel project and wait for the new deployment to show Ready. Refresh the hosted test site.

Terminal alternative (from this project folder):

    git status
    git diff
    git add -A
    git commit -m "Describe your website update"
    git push origin main

Review the files before committing. The existing .gitignore excludes node_modules, .next, .vercel and .env files.

If you edit and commit directly on GitHub, Vercel also deploys that main-branch commit. Before editing locally again, use Fetch origin / Pull origin in GitHub Desktop to bring down the changes. Keep local edits committed before pulling.

## What this setup does not change

Namecheap DNS and the current vspa.ca website have not been switched. Adding the custom domain is a separate later step. Keep the current canonical URLs and sitemap addresses set to vspa.ca for that eventual transfer.

The photo manager only works locally in development. Visitors to the Vercel site cannot upload photos; upload locally and push the saved photo files to publish them.

The current team remains on Hobby at the owner's request for testing. Vercel's published plan rules require a commercial plan for the business launch.
