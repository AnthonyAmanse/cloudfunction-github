var request = require('request');

function main(params) {
  if (params.action == "opened" || params.action == "edited") {

    var gitAPI = "https://" + params.gitUsername + ":" + params.gitPersonalToken + "@api.github.com/projects/columns/";
    var _url = gitAPI + params.columnId + "/cards";

    var options = {
      url: _url,
      method: "POST",
      headers: {
        'User-agent': 'curl/7.54.0',
        'content-type': 'application/json',
        'Accept': 'application/vnd.github.inertia-preview+json'
      },
      body: JSON.stringify({content_id: params.issue.id, content_type: "Issue"})
    }

    if (params.issue.body.includes("- [x] Item number 1") &&
        params.issue.body.includes("- [x] Item number 2") &&
        params.issue.body.includes("- [x] Item number 3")) {

      var jsonBody = {"username": "Github Bot", "text": "First Checklist Complete:\nIssue " + params.issue.number + ": " + params.issue.url + "\nBy: " + params.issue.user.login};
      var slackOptions = {
        url: params.slackWebhook,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonBody,
        json: true
      }

      request(slackOptions, function (error, response, body) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(response);
        }
      });
    }

    if (params.issue.body.includes("- [x] Req 1") &&
        params.issue.body.includes("- [x] Req 2")) {

      var jsonBody = {"username": "Github Bot", "text": "Second Checklist Complete:\nIssue " + params.issue.number + ": " + params.issue.url + "\nBy: " + params.issue.user.login};
      var slackOptions = {
        url: params.slackWebhook,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonBody,
        json: true
      }

      request(slackOptions, function (error, response, body) {
        if (error) {
          console.log(error);
        }
        else {
          console.log(response);
        }
      });
    }

    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        if (error) {
          reject(error);
        }
        else {
          resolve({msg: response});
        }
      });
    });
  }
}
