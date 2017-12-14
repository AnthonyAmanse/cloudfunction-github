var request = require('request');

function main(params) {
  if (params.action == "opened") {

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
