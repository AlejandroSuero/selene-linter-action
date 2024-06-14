"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const exec_1 = require("@actions/exec");
const tc = __importStar(require("@actions/tool-cache"));
const semver = __importStar(require("semver"));
const selene_1 = __importDefault(require("./selene"));
async function run() {
    try {
        // Get required information from CI file
        const token = core.getInput('token');
        const args = core.getInput('args');
        let version = semver.clean(core.getInput('version'));
        let releases;
        // If no specific version was passed then download the latest selene release
        if (!version || version === '') {
            core.debug('No version provided or invalid version provided. Falling back to latest release ...');
            releases = await selene_1.default.getReleases(token);
            const latestRelease = await selene_1.default.getLatestRelease(releases);
            if (!latestRelease) {
                throw new Error('Could not find latest release version. Please specify an explicit version');
            }
            version = latestRelease;
        }
        // Check if we already have selene installed
        core.debug('Looking for cached version of selene ...');
        const seleneDir = tc.find('selene', version);
        if (seleneDir) {
            core.debug(`Found cached version of selene at ${seleneDir}`);
            core.addPath(seleneDir);
        }
        else {
            core.debug('No cached version found, downloading selene ...');
            // If a specific version was passed then download it
            if (!releases) {
                releases = await selene_1.default.getReleases(token);
            }
            // Get latest release
            core.debug('Retrieving selene release ...');
            const release = await selene_1.default.getRelease(version, releases);
            if (!release) {
                throw new Error(`Could not find release for version ${version}`);
            }
            // Get release asset for current OS, e.g. selene-version-linux.zip
            core.debug(`Chose release ${release.tag_name}`);
            const asset = await selene_1.default.getAsset(release);
            if (!asset) {
                throw new Error(`Could not find asset for ${release.tag_name} on platform ${process.platform}`);
            }
            core.debug(`Downloading asset ${asset.browser_download_url}`);
            // Download and extract release asset
            const downloadedPath = await tc.downloadTool(asset.browser_download_url);
            const extractedPath = await tc.extractZip(downloadedPath);
            // Add extracted asset to cache
            await tc.cacheDir(extractedPath, 'selene', version);
            core.addPath(extractedPath);
            // Set executable permissions on Unix systems
            if (process.platform === 'linux' || process.platform === 'darwin') {
                await (0, exec_1.exec)(`chmod +x ${extractedPath}/selene`);
            }
        }
        // Run selene
        core.debug(`Running selene with arguments: ${args}`);
        await (0, exec_1.exec)(`selene ${args}`);
    }
    catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}
run();
//# sourceMappingURL=main.js.map