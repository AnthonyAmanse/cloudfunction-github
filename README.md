# CloudFunction

## Prereq

* Get Personal API token
```
$ export GIT_TOKEN=QWERTYUIOP
```
* Get Project ID
Change to your own Github Repo

```
$ curl -u AnthonyAmanse:QWERTYUIOP -H "Accept: application/vnd.github.inertia-preview+json" "https://api.github.com/repos/AnthonyAmanse/cloudfunction-github/projects"
```
* Get Column ID
```
$ curl -u AnthonyAmanse:QWERTYUIOP -H "Accept: application/vnd.github.inertia-preview+json" "https://api.github.com/projects/YOUR_PROJECT_ID/columns"

$ export COLUMN_ID=YOUR_COLUMN_ID
```
* IBM Cloud Function
Get [Cloud Function CLI](https://console.bluemix.net/docs/openwhisk/bluemix_cli.html#cloudfunctions_cli)



## Steps

* Bind Github package

```
$ bx wsk package bind /whisk.system/github myGit \
 --param username AnthonyAmanse \
 --param repository cloudfunction-github \
 --param accessToken $GIT_TOKEN
```

* Create Trigger

```
$ bx wsk trigger create issueTrigger --feed myGit/webhook --param events issue
```

* Create Action

```
$ bx wsk action create updateIssue updateIssue.js --param gitUsername AnthonyAmanse --param gitPersonalToken $GIT_TOKEN --param columnId $COLUMN_ID
```

* Create Rule

```
$ wsk rule create issueRule issueTrigger updateIssue
```
