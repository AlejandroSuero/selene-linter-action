# Selene linter action contributions

Welcome, everyone and thank you for wanting to contribute to this project.

This project uses [eslint](https://eslint.org) as the linter,
[prettier](https://prettier.io) as the formatter and [jest](https://jestjs.io)
as the test runner.

## How to contribute

1. **Configure the development**

   - **Fork this repo**: Make a fork of this repo. For that, click on the
     **Fork** button at the top right side of the main page for this GitHub
     repo.

   - **Clone your fork**: After the fork, make a clone of your repo
     `username/selene-linter-action` on your local machine,
     `git clone <fork-URL>`.

   - **Add the main repo as remote**: To keep up with the changes,
     `git remote add upstream <main-repo-URL>`.

   - **Install the dependencies**: This repo uses `npm` to manage the
     dependencies, a simple `npm install` will install all the dependencies.

2. **Work on your changes**

   - **Sync the fork**: You can do this from your fork's repo, using the GitHub
     UI, or using your terminal, `gh repo sync -b main` or
     `git switch main && git fetch upstream && git merge upstream/main`.

   - **Create a new branch**: Before working on your changes, create a new
     branch, using `git switch -c <branch-name>`.

   - **Make your changes**: Implement your changes on your local machine. Make
     sure to follow the project standards (linting and formatting rules).

   > [!note]
   >
   > You can use `npm run lint` and `npm run test` to check if your changes are
   > correct

3. **Send your changes**

   - **Commit your changes**: Once you are satisfied with your changes, commit
     them with a descriptive and concise message. Following the standards is
     recommended,
     [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0).

   > [!warning]
   >
   > This project uses [husky](https://typicode.github.io/husky) to run hooks,
   > one of them is `pre-commit`, which uses
   > [lint-staged](https://github.com/lint-staged/lint-staged), if you want to
   > bypass that add `--no-verify` to your commit command.
   >
   > But be aware that you check `linting` and `formatting` rules, it will be
   > check in **CI** too.

   - **Push to your fork**: Push your changes to your fork using
     `git push origin <branch-name>`.

   - **Create a Pull Request (PR)**: Once you pushed your changes, make a pull
     request so we can see the changes and discuss over it if necessary. A clear
     description of the changes is allways welcomed.

## Good practices

- **Check for open issues**: Duplicated issues are never good.

- **Check for open PRs**: Make sure there isn't another PR open tackling a
  similar issue or creating a similar feature. You can allways help in an open
  PR.

- **Descriptive and concised commits**:
  [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0).

- **Follow the code style**: Try to match the code style as much as possible.
  Follow lint and format rules. For `md` files,
  [markdownlint](https://github.com/markdownlint/markdownlint); for `lua` files,
  [eslint](https://eslint.org) and [prettier](https://prettier.io)
