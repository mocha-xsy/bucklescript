'use strict';

var Caml_obj        = require("./caml_obj");
var Caml_exceptions = require("./caml_exceptions");
var Curry           = require("./curry");

var Empty = Caml_exceptions.create("Queue.Empty");

function create() {
  return /* record */[
          /* length */0,
          /* tail : None */0
        ];
}

function clear(q) {
  q[/* length */0] = 0;
  q[/* tail */1] = /* None */0;
  return /* () */0;
}

function add(x, q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var head = tail[/* next */1];
    var cell = /* record */[
      /* content */x,
      /* next */head
    ];
    q[/* length */0] = q[/* length */0] + 1 | 0;
    tail[/* next */1] = cell;
    q[/* tail */1] = cell;
    return /* () */0;
  }
  else {
    var cell$1 = [];
    cell$1[0] = x;
    cell$1[1] = cell$1;
    q[/* length */0] = 1;
    q[/* tail */1] = cell$1;
    return /* () */0;
  }
}

function peek(q) {
  if (q[/* length */0]) {
    return q[/* tail */1][/* next */1][/* content */0];
  }
  else {
    throw Empty;
  }
}

function take(q) {
  if (!q[/* length */0]) {
    throw Empty;
  }
  q[/* length */0] = q[/* length */0] - 1 | 0;
  var tail = q[/* tail */1];
  var head = tail[/* next */1];
  if (head === tail) {
    q[/* tail */1] = /* None */0;
  }
  else {
    tail[/* next */1] = head[/* next */1];
  }
  return head[/* content */0];
}

function copy(q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var tail$prime = [];
    Caml_obj.caml_update_dummy(tail$prime, /* record */[
          /* content */tail[/* content */0],
          /* next */tail$prime
        ]);
    var copy$1 = function (_prev, _cell) {
      while(true) {
        var cell = _cell;
        var prev = _prev;
        if (cell !== tail) {
          var res = /* record */[
            /* content */cell[/* content */0],
            /* next */tail$prime
          ];
          prev[/* next */1] = res;
          _cell = cell[/* next */1];
          _prev = res;
          continue ;
          
        }
        else {
          return 0;
        }
      };
    };
    copy$1(tail$prime, tail[/* next */1]);
    return /* record */[
            /* length */q[/* length */0],
            /* tail */tail$prime
          ];
  }
  else {
    return /* record */[
            /* length */0,
            /* tail : None */0
          ];
  }
}

function is_empty(q) {
  return +(q[/* length */0] === 0);
}

function length(q) {
  return q[/* length */0];
}

function iter(f, q) {
  if (q[/* length */0] > 0) {
    var tail = q[/* tail */1];
    var _cell = tail[/* next */1];
    while(true) {
      var cell = _cell;
      Curry._1(f, cell[/* content */0]);
      if (cell !== tail) {
        _cell = cell[/* next */1];
        continue ;
        
      }
      else {
        return 0;
      }
    };
  }
  else {
    return 0;
  }
}

function fold(f, accu, q) {
  if (q[/* length */0]) {
    var tail = q[/* tail */1];
    var _accu = accu;
    var _cell = tail[/* next */1];
    while(true) {
      var cell = _cell;
      var accu$1 = _accu;
      var accu$2 = Curry._2(f, accu$1, cell[/* content */0]);
      if (cell === tail) {
        return accu$2;
      }
      else {
        _cell = cell[/* next */1];
        _accu = accu$2;
        continue ;
        
      }
    };
  }
  else {
    return accu;
  }
}

function transfer(q1, q2) {
  var length1 = q1[/* length */0];
  if (length1 > 0) {
    var tail1 = q1[/* tail */1];
    clear(q1);
    if (q2[/* length */0] > 0) {
      var tail2 = q2[/* tail */1];
      var head1 = tail1[/* next */1];
      var head2 = tail2[/* next */1];
      tail1[/* next */1] = head2;
      tail2[/* next */1] = head1;
    }
    q2[/* length */0] = q2[/* length */0] + length1 | 0;
    q2[/* tail */1] = tail1;
    return /* () */0;
  }
  else {
    return 0;
  }
}

var push = add;

var pop = take;

var top = peek;

exports.Empty    = Empty;
exports.create   = create;
exports.add      = add;
exports.push     = push;
exports.take     = take;
exports.pop      = pop;
exports.peek     = peek;
exports.top      = top;
exports.clear    = clear;
exports.copy     = copy;
exports.is_empty = is_empty;
exports.length   = length;
exports.iter     = iter;
exports.fold     = fold;
exports.transfer = transfer;
/* No side effect */
