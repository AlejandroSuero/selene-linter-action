"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("@actions/github");
const semver_1 = __importDefault(require("semver"));
async function getLatestRelease(releases) {
    return semver_1.default.clean(releases[0].tag_name);
}
async function getReleases(token) {
    const octokit = (0, github_1.getOctokit)(token);
    const { data: releases } = await octokit.rest.repos.listReleases({
        owner: 'Kampfkarren',
        repo: 'selene'
    });
    releases.sort((a, b) => semver_1.default.compare(a.tag_name, b.tag_name));
    return releases;
}
async function getRelease(version, releases) {
    return releases.find(release => semver_1.default.satisfies(release.tag_name, version));
}
const getPlatformRelease = () => {
    switch (process.platform) {
        case 'linux':
            return name => name.includes('linux');
        case 'darwin':
            return name => name.includes('macos');
        case 'win32':
            return name => name.includes('windows');
        default:
            throw new Error(`Current platform \`${process.platform}\` not supported`);
    }
};
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