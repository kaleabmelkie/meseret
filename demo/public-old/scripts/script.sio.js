const socketNamespace = '/api/task'
const socket = io(socketNamespace)

// init
socket.on('connect', function () {
  console.log('Socket.IO connected at namespace \'' + socketNamespace + '\'.')
})

// on error
socket.on('error', function (err) {
  console.log('Socket.IO connection error:', err)
})

// on change
socket.on('change', function (res) {
  if (!res || !res.success) return loadingState()

  init()
})

// on add
socket.on('add', function (res) {
  if (!res || !res.success) return loadingState()

  init()
})

// on list
socket.on('list', function (res) {
  if (!res || !res.success || !res.tasks || !Array.isArray(res.tasks)) return loadingState()

  var len = res.tasks.length
  $('#f-showing').innerHTML = String(len)
  for (var i = 0; i < len; i++) addTaskToUI(res.tasks[i])
})

// on count
socket.on('count', function (res) {
  if (!res || !res.success || !res.count) loadingState()

  if (res.count > 0) {
    $('#stat').innerHTML = 'Showing <span id="f-showing"></span> of your ' + String(res.count) + ' tasks.'
    $('#tasks-container').innerHTML = ''
    fetchAndLoadTasks(res.count)
  } else {
    $('#stat').innerHTML = 'No tasks to show.'
    $('#tasks-container').innerHTML = ''
  }
})

// on edit
socket.on('edit', function (res) {
  if (!res || !res.success) return loadingState()

  init()
})

// on remove
socket.on('remove', function (task) {
  if (!res || !res.success) return loadingState()

  init()
})

function $ (selector, all) {
  return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}

function init() {
  socket.emit('count')
}

function loadingState () {
  $('#stat').innerHTML = ''
  $('#tasks-container').innerHTML = ''
}

function fetchAndLoadTasks(count) {
  if (!count || isNaN(count)) return

  socket.emit('list', count, 0)
}

function addTaskToUI (task) {
  var template = '' +
    '<header>' + (task.title || '<i>Untitled Task</i>') + (task.done ? ' (DONE)' : '') + '</header>' +
    '<article>' +
      '<div>' + (task.desc || '<i>No description.</i>') + '</div>' +
      '<div style="padding-top: 10px; font-style: italic">Created on ' + dateToStr(task.created) + '.</div>' +
    '</article>' +
    '<footer>' +
      '<button onclick="mark' + (task.done ? 'Incomplete' : 'Complete') + '(\'' + task._id + '\')">' +
        'Mark ' + (task.done ? 'Incomplete' : 'Complete') +
      '</button>' +
      '<button onclick="edit(\'' + task._id + '\')">Edit</button>' +
      '<button onclick="remove(\'' + task._id + '\')">Remove</button>' +
    '</footer>'

  var card = document.createElement('div')
  card.innerHTML = template
  card.className = 'tasks'

  $('#tasks-container').appendChild(card)
}

function dateToStr(date) {
  if (!date) return 'unknown date'

  date = new Date(date)

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  var amPm = 'am'
  var hour = date.getHours()
  if (hour >= 12) amPm = 'pm'
  if (hour > 12) hour -= 12

  return months[date.getMonth()] + ' ' + date.getDate() + ' at ' + hour + ':' + date.getMinutes() + amPm
}

function propmtForm (task) {
  task = task || {}

  task.title = prompt('Task Title:', task.title) || task.title || ''
  task.desc = prompt('Task Description:', task.desc) || task.title || ''

  return task;
}

function markComplete (_id) {
  if (!_id) return

  socket.emit('edit', _id, JSON.stringify({
    done: true
  }))
}

function markIncomplete (_id) {
  if (!_id) return

  socket.emit('edit', _id, JSON.stringify({
    done: false
  }))
}

function add () {
  socket.emit('add', propmtForm())
}

function edit (_id) {
  if (!_id) return

  fetch('/api/tasks/get/' + _id)
    .then(function (res) { return res.json() })
    .then(function (res) {
      if (res.success && res.task) {
        fetch('/api/tasks/edit/' + _id, {
          method: 'PUT',
          body: JSON.stringify(propmtForm(res.task))
        })
          .then(function (res) { return res.json() })
          .then(function (res) {
            init()
          })
      }
    })
}

function remove (_id) {
  if (!_id) return

  var sure = prompt('Are you sure you want to remove this task? [Y/N]')
  if (sure.substr(0, 1) !== 'Y' && sure.substr(0, 1) !== 'y') return

  fetch('/api/tasks/remove/' + _id, {
    method: 'DELETE'
  })
    .then(function (res) { return res.json() })
    .then(function (res) {
      init()
    })
}

addEventListener('load', init)
