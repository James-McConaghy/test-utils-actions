# PR Tasks

## What does it do?
  
  Configure checkboxes from the pull request description that you would like to anatomize for task designation.

## Input & Format

- `checkbox-tasks`
  - The format is important and must follow the pattern `<id>:<full-checkbox-label>`.
  - Multiple checkbox labels can be supplied.

## Example

#### PR Description
```
## 🏗️ PR Execution

 - [x] Would you like to update the snapshots and commit them into the PR?
 - [x] Execute load api tests?

```

#### github action workflow
```yaml
pull-request:
  name: Build & Test
  runs-on: [self-hosted, your-runner]
  steps:
  ...
  ...

    - id: anatomize-pr-tasks
      name: anatomize PR tasks
      uses: ./actions/pr-tasks
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
        checkbox-tasks: |-
          update-snapshots:Would you like to update the snapshots and commit them into the PR?
          execute-load-api:Execute load api tests?

    - if: ${{ fromJSON(steps.anatomize-pr-tasks.outputs.designation).update-snapshots == 'true' }}
        name: Update visual regression image snapshots
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          npm run test:local:ui:smoke --update-snapshots
          git config user.email "github-actions@bazaarvoice.com"
          git config user.name "github-actions"
          git branch
          git status
          git add playwright/tests/ui/vr
          git commit -m "ci: update vr screenshots [skip actions]" --no-verify
          git push origin HEAD:${{ github.event.pull_request.head.ref }} --no-verify

    - if: ${{ fromJSON(steps.anatomize-pr-tasks.outputs.designation).execute-load-api == 'true' }}
        name: Load API tests
        run: |
          npm run test:local:load-test
          
```