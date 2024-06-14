"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const github_1 = require("@actions/github");
/**
 * Get the latest selene release
 *
 * @param releases - The selene releases
 * @returns The latest selene release or null
 */
async function getLatestRelease(releases) {
    return semver_1.default.clean(releases[0].tag_name);
}
/**
 * Get all selene releases
 *
 * @param token - The github secret token
 * @returns The selene releases
 */
async function getReleases(token) {
    const octokit = (0, github_1.getOctokit)(token);
    const { data: releases } = await octokit.rest.repos.listReleases({
        owner: 'Kampfkarren',
        repo: 'selene'
    });
    // Sort releases
    releases.sort((a, b) => semver_1.default.rcompare(a.tag_name, b.tag_name));
    return releases;
}
/**
 * Get the provided selene release
 *
 * @param version - The release version
 * @param releases - The selene releases
 * @returns The selene release or undefined
 */
async function getRelease(version, releases) {
    return releases.find(release => semver_1.default.satisfies(release.tag_name, version));
}
/**
 * Get the correct asset for the current platform (OS)
 *
 * @param asset - The release asset
 * @returns The asset for the current platform
 */
const getPlatformRelease = () => {
    switch (process.platform) {
        case 'linux':
            return name => name.includes('linux');
        case 'darwin':
            return name => name.includes('macos');
        case 'win32':
            return name => name.includes('windows');
        default:
            throw new Error('Current platform not supported');
    }
};
/**
 * Get the provided asset from release
 *
 * @param release - The release where lies the asset
 * @returns The release asset or undefined
 */
async function getAsset(release) {
    const platformRelease = getPlatformRelease();
    return release.assets.find(asset => platformRelease(asset.name));
}
exports.default = {
    getRelease,
    getReleases,
    getLatestRelease,
    getAsset
};
//# sourceMappingURL=selene.js.map