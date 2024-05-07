<div align="center">
  <h1>GitHub Action for Selene</h1>

<a href="https://github.com/AlejandroSuero/selene-linter-action/actions"><img alt="selene-linter-action status" src="https://github.com/AlejandroSuero/selene-linter-action/workflows/test.yml/badge.svg"></a>

</div>

GitHub action to run [selene](https://github.com/Kampfkarren/selene), a
blazing-fast modern Lua linter written in Rust.

## Usage

```yaml
- uses: actions/checkout@v4
- uses: AlejandroSuero/selene-linter-action@v1.0.0
  with:
    # Github secret token
    token: ${{ secrets.GITHUB_TOKEN }}
    # selene arguments
    args: --display-style=quiet .
    # selene version
    version: 0.27.1
```

### Parameters

#### Required parameters

- `token`
  - GitHub secret token for downloading selene binary from GitHub releases.
- `args`
  - Arguments to be passed to selene.

#### Optional parameters

- `version`
  - Version of selene to be used. If not specified, installs the latest release.

## License

selene-action is [MIT licensed](./LICENSE)

## Inspiration

- [selene-action](https://github.com/NTBBloodbath/selene-action)

> [!note]
>
> It has been +3 years since last updated
