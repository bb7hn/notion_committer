# How to setup
- Set your repositorie's secrets and create a yaml file in .github\workflows
- If you don't know how to set secrets [browse the docs.](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository)
- exact path must to look like this:
 >**.github\workflows\notion.yml**
 - Lastly, copy and paste the text written down below, into  your yaml file and reconfigure OWNER and REPO variables.

```yml
name: Commit to Notion CI

on:
  push:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: bb7hn/notion_committer@main
        with:
          SECRET_GITHUB  : ${{ secrets.SECRET_GITHUB }}
          NOTION_API_KEY  : ${{ secrets.NOTION_API_KEY }}
          NOTION_DATABASE : ${{ secrets.NOTION_DATABASE }}
          OWNER : bb7hn
          REPO  : notion_committer
```