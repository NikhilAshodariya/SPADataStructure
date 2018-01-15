class Stack {
  constructor() {
    this.stk = [];
    this.ptr = -1;
  }
  push(value) {
    this.stk[++this.ptr] = value;
  }

  pop() {
    if (this.ptr <= -1) {
      return "emptyStack";
    } else {
      var val = this.stk[this.ptr--];
      return val;
    }
  }

  getStack() {
    var data = [];
    if (this.ptr < -1) {
    } else {
      var counter = -1;
      for (var i = this.ptr; i >= 0; i--) {
        data[++counter] = this.stk[i];
      }
    }
    return data;
  }
}

module.exports = Stack;
