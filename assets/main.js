(function ($) {
  'use strict';

  function filterForks(repos) {
    return repos.filter(function (repo) {
      return !repo.fork;
    });
  }

  function getUtcMilliseconds(dateString) {
    var date = dateString.substring(0, dateString.indexOf('T')).split('-');
    var year = date[0];
    var month = date[1];
    var day = date[2];

    return Date.UTC(year, month, day);
  }

  function sortByPushedAt(repos) {
    return repos.sort(function (a, b) {
      return getUtcMilliseconds(b.pushed_at) - getUtcMilliseconds(a.pushed_at);
    })
  }

  function getProjectHtml(data) {
    return '<li>' +
      '<a href="' + data.html_url + '" data-icon-letter="' + data.name[0] + '">' +
      '<h2 class="title">' + data.name + '</h2>' +
      '<p class="description">' + data.description + '</p>' +
      '<p class="url">' + data.html_url.replace('https://', '') + '</p>'
  }

  function getProjectsHtml(repos) {
    return repos.map(getProjectHtml);
  }

  function renderProjects(html) {
    $('#js-projects').html(html);
  }

  $(function () {
    $.get('https://api.github.com/orgs/Nearsoft/repos')
      .then(filterForks)
      .then(sortByPushedAt)
      .then(getProjectsHtml)
      .then(renderProjects)
  });

}(jQuery));
