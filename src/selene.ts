import { getOctokit } from '@actions/github'
import semver from 'semver'

interface GitHubAsset {
  name: string
  browser_download_url: string
}

export interface GitHubRelease {
  tag_name: string
  assets: GitHubAsset[]
}

type Matcher = (name: string) => boolean

async function getLatestRelease(
  releases: GitHubRelease[]
): Promise<string | null> {
  return semver.clean(releases[0].tag_name)
}

async function getReleases(token: string): Promise<GitHubRelease[]> {
  const octokit = getOctokit(token)
  const { data: releases } = await octokit.rest.repos.listReleases({
    owner: 'Kampfkarren',
    repo: 'selene'
  })

  releases.sort((a, b) => semver.compare(a.tag_name, b.tag_name))
  return releases
}

async function getRelease(
  version: string,
  releases: GitHubRelease[]
): Promise<GitHubRelease | undefined> {
  return releases.find(release => semver.satisfies(release.tag_name, version))
}

const getPlatformRelease: () => Matcher = () => {
  switch (process.platform) {
    case 'linux':
      return name => name.includes('linux')
    case 'darwin':
      return name => name.includes('macos')
    case 'win32':
      return name => name.includes('windows')
    default:
      throw new Error(`Current platform \`${process.platform}\` not supported`)
  }
}

async function getAsset(
  release: GitHubRelease
): Promise<GitHubAsset | undefined> {
  const platformRelease = getPlatformRelease()
  return release.assets.find(asset => platformRelease(asset.name))
}

export default {
  getRelease,
  getReleases,
  getLatestRelease,
  getAsset
}
