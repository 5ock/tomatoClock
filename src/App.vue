<template>
  <div id="app">
    <div class="sideBar" v-click-outside="clickedOutside">
      <div>
        <svg class="sideBarIcon" @click="editTodo.isShow=!editTodo.isShow"><use xlink:href="#icon-list" /></svg>
      </div>
      <div class="todolist_setting" v-show="editTodo.isShow">
        <div class="todolist_setting_top">
          <span class="title">代辦清單</span>
          <div class="title_right">
            <span :class="{'select':editTodo.type=='uncomplete'}" @click="editTodo.type='uncomplete'">未完成</span>
            <span :class="{'select':editTodo.type=='complete'}" @click="editTodo.type='complete'">已完成</span>
          </div>
          <div class="addTodo">
            <input class="input_todo" type="text" placeholder="新增代辦事項" v-model="newTodoDes">
            <span class="add_icon" @click="addTodo">+</span>
          </div>
          <div class="list"
              v-for="(item, index) in filterTodoList" 
              :key="index">
            <span class="circle"></span>
            <span class="todo_des">{{ item.des }}</span>
            <svg @click="deleteItem(item.index)" class="editeIcon"><use xlink:href="#icon-delete" /></svg>
            <svg class="editeIcon"><use xlink:href="#icon-edit" /></svg>
          </div>
        </div>
      </div>
      <div>
        <svg class="sideBarIcon"><use xlink:href="#icon-analysis" /></svg>
      </div>
    </div>
    <div class="main">
      <div class="top">
        <div class="date_block">
          <span>{{ date }}</span>
          <span>{{ week }}</span>
          <span>{{ time }}</span>
        </div>
      </div>
      <div class="left">
        <div class="reciprocal">{{ countdown.min }}:{{ countdown.sec }}</div>
        <span class="btn alert">
          <svg class="reciprocalIcon"><use xlink:href="#icon-bell" /></svg>
        </span>
        <span class="btn start" @click="countdownStart">
          <svg v-show="status.type == 'work'" class="reciprocalIcon">
            <use v-show="!status.ing" xlink:href="#icon-play--orange" />
            <use v-show="status.ing" xlink:href="#icon-pause--orange" />
          </svg>
          <svg v-show="status.type == 'rest'" class="reciprocalIcon">
            <use v-show="!status.ing" xlink:href="#icon-play--green" />
            <use v-show="status.ing" xlink:href="#icon-pause--green" />
          </svg>
        </span>
        <span class="btn reset" @click="reset">
          <svg class="reciprocalIcon"><use xlink:href="#icon-cancel" /></svg>
        </span>
        <span class="btn refresh" @click="refresh">
          <svg class="reciprocalIcon"><use xlink:href="#icon-refresh" /></svg>
        </span>
      </div>
      <div class="right">
        <div class="todolist_rest" v-show="status.type=='rest'">休息，是為了下一次的努力</div>
        <div class="todolist"
          v-for="(item, index) in uncompleteAry" 
          :key="index" 
          :class="{'ing':((index==0)&&(status.type=='work'))}">
          <span>O</span>
          <span>{{ item.des }}</span>
        </div>
      </div>
    </div>
    <!-- background icon -->
    <div>
      <svg class="tomatoIcon">
        <use v-show="status.type == 'work'" xlink:href="#tomato--orange" />
        <use v-show="status.type == 'rest'" xlink:href="#tomato--green" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      date: '',
      week: '',
      time: '',
      timerID: '',

      task: {
        isComplete: false,
        des: '',
      },
      todoList: [{
        isComplete: true,
        des: '構思番茄鐘UI介面',
      },{
        isComplete: false,
        des: '製作番茄鐘UI介面',
      },{
        isComplete: false,
        des: '製作番茄鐘功能',
      }],

      status: {
        type: 'work',
        ing: false,
      },
      countdownID:'',
      countdown: {
        min: '25',
        sec: '00'
      },

      editTodo: {
        isShow: true,
        type: 'uncomplete',
      },
      newTodoDes: '',
    }
  },
  methods: {
    clickedOutside() {
      this.editTodo.isShow = false;
    },
    deleteItem(index) {
      this.todoList.splice(index, 1)
    },
    addTodo() {
      if(this.newTodoDes == '') {
        return;
      }

      let taskObj = {
        isComplete: false,
        des: this.newTodoDes
      };

      this.todoList.push(taskObj);
      this.newTodoDes = '';
    },
    updateContdown() {
      let me = this;
      let min = Number(me.countdown.min);
      let sec = Number(me.countdown.sec);

      if(sec == 0) {
        min -= 1;
        sec = 59; 
      } else {
        sec -= 1;

      }
      if(min < 10) {
        min = '0'+ String(min);
      }
      if(sec < 10) {
        sec = '0'+ String(sec);
      }
      me.countdown.min = min;
      me.countdown.sec = sec;
    },
    countdownStart() {
      this.status.ing = !this.status.ing;
      if(this.status.ing) {
        this.updateContdown();
        this.countdownID = setInterval(this.updateContdown, 1000); 
      } else {
        if(this.countdownID) {
          clearInterval(this.countdownID);
        }
      }
    },
    refresh() {
      if(this.countdownID) {
        clearInterval(this.countdownID);
      }
      if(this.status.type == 'work') {
        this.status.type = 'rest';
        this.status.ing = false;
      } else {
        this.status.type = 'work';
        this.status.ing = false;
      }
      this.reset();
    },
    reset() {
      if(this.countdownID) {
        clearInterval(this.countdownID);
      }
      if(this.status.type == 'work') {
        this.countdown.min = '25';
        this.countdown.sec = '00';
      } else {
        this.countdown.min = '05';
        this.countdown.sec = '00';
      }
      this.status.ing = false;
    },
    calDate() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();
      let week = date.getDay();

      let monthAry = ['01','02','03','04','05','06','07','08','09','10','11','12'];
      let weekAry = ['日','一','二','三','四','五','六'];

      if(day<10) {
        day = '0'+ String(day);
      }
      
      this.date = year + '.' + monthAry[month] + '.' + day;
      this.week = '星期' + weekAry[week];
    },
    updateTime() {
      let date = new Date();
      let hours = date.getHours();
      let min = date.getMinutes();

      if(hours < 10) {
        hours = '0' + String(hours);
      }

      if(min < 10) {
        min = '0' + String(min);
      }
      
      this.time = hours + ':' + min;
    },
  },
  mounted() {
    this.calDate();
    this.timerID = setInterval(this.updateTime, 10000);
    this.updateTime();
  },
  computed: {
    filterTodoList() {
      let completeAry = [];
      let uncompleteAry = [];
      for(let i=0; i<this.todoList.length; i++) {
        if(this.todoList[i].isComplete) {
          let obj = {
            isComplete: this.todoList[i].isComplete,
            des: this.todoList[i].des,
            index: i
          }
          completeAry.push(obj);
        } else {
          let obj = {
            isComplete: this.todoList[i].isComplete,
            des: this.todoList[i].des,
            index: i
          }
          uncompleteAry.push(obj);
        }
      }

      if(this.editTodo.type == 'uncomplete') {
        return uncompleteAry;
      } else {
        return completeAry;
      }
    },
    uncompleteAry() {
      let uncompleteAry = [];
      for(let i=0; i<this.todoList.length; i++) {
        if(!this.todoList[i].isComplete) {
          let obj = {
            isComplete: this.todoList[i].isComplete,
            des: this.todoList[i].des,
            index: i
          }
          uncompleteAry.push(obj);
        }
      }

      return uncompleteAry;
    }
  }
}
</script>

<style lang="scss">
/* Reset css ------------------------------------------------- */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* ---------------------------------------------------------- */


body {
  background: #304030 0% 0% no-repeat padding-box;
  opacity: 1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.sideBar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 80px;
  height: 100%;
  background: #E8E8E8 0% 0% no-repeat padding-box;
  opacity: 1;

  .todolist_setting {
    color: white;
    width: 820px;
    height: 100%;
    position: fixed;
    left: 80px;
    top: 0px;
    z-index: 999;
    background: #304030 0% 0% no-repeat padding-box;
    box-shadow: 0px 0px 40px #0000003D;
    opacity: 1;

    .todolist_setting_top {
      text-align: left;
      height: 59px;
      line-height: 59px;
        margin: 20px;

      .title {
        font-size: 40px;
        font-weight: bolder;
        margin-left: 40px;
      }
      .title_right {
        float: right;
        color: #aaa;
        
        span {
          margin-right: 20px;
          cursor: pointer;
        }

        .select {
          color: #fff;
        }
      }

      // add todo
      .addTodo {
        text-align: center;
        border-bottom: 1px solid #e8e8e8;
        margin: 30px 10% 0;
        padding-bottom: 40px;
      }
      .input_todo {
        padding: 0 30px 0;
        font-size: 20px;
        top: 179px;
        left: 120px;
        width: 560px;
        height: 56px;
        background: #FFF;
        border: 1px solid #FFF;
        border-radius: 180px;
        outline: none;
      }
      .add_icon {
        position: absolute;
        top: 126px;
        right: 120px;
        line-height: 40px;
        font-size: 32px;
        width: 48px;
        height: 40px;
        background: #F08448;
        border-radius: 70px;
        cursor: pointer;
      }

      // todolist
      .list {
        font-size: 16px;
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        width: 80%;
        border-bottom: 1.5px solid #aaa;

        span {
          vertical-align: middle;
        }

        .todo_des {
          margin-left: 20px;
        }
        
        .circle {
          display: inline-block;
          width: 24px;
          height: 24px;
          border: 2px solid #E8E8E8;
          border-radius: 14px;
          opacity: 1;
        }
      }
    }
  }
}

.editeIcon {
  vertical-align: middle;
  float: right;
  margin-top: 8px;
  width: 30px;
  height: 30px;
}
.sideBarIcon {
  width: 45px;
  cursor: pointer;
}

.main {
  display: flex;
  flex-wrap: wrap;
  color: white;
  margin-left: 160px;
  margin-right: 80px;
}

.top {
  flex-basis: 100%;
  height: 80px;
  margin-bottom: 50px;

  .date_block {
    color: #FFFFFF;
    opacity: 0.5;
    position: absolute;
    right: 80px;
    margin: 28px 0;
  }
  span {
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    margin-right: 20px;
  }
}

.left {
  flex: 50%;

  .reciprocal {
    font-size: 200px;
    margin-bottom: 30px; 
  }

  .reciprocalIcon {
    width: 30px;
    height: 30px;
    position:absolute;
    top:50%;
    bottom:50%;
    transform:translate(-50%, -50%);
  }

  .btn {
    position:relative;
    display: inline-block;
    height: 60px;
    width: 60px;
    margin-right: 30px;
    border: 2px solid #fff;
    border-radius:50%;

    :hover {
      cursor: pointer;
    }
  }
  .start {
    background-color: #fff;
  }
}

.tomatoIcon {
    position: fixed;
    bottom: 0;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 1280px;
    height: 340px;
    z-index: -999;
}

.right {
  flex: 50%;
  text-align: left;

  .todolist_rest {
    font-size: 40px;
  }

  .todolist {
    font-size:20px;
    margin: 20px 0px 30px 100px;

    span {
      margin-right: 5px;
    }
  }

  .ing {
    font-size: 40px;

    span {
      margin-right: 10px;
    }
  }
}
</style>
