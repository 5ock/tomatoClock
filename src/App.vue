<template>
  <div id="app">
    <div class="sideBar">
      <svg class="sideBarIcon"><use xlink:href="#icon-list" /></svg>
      <svg class="sideBarIcon"><use xlink:href="#icon-analysis" /></svg>
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
        <div class="reciprocal">25:00</div>
        <span class="btn alert">
          <svg class="reciprocalIcon"><use xlink:href="#icon-bell" /></svg>
        </span>
        <span class="btn start">
          <svg class="reciprocalIcon"><use xlink:href="#icon-play--orange" /></svg>
        </span>
        <span class="btn reset">
          <svg class="reciprocalIcon"><use xlink:href="#icon-cancel" /></svg>
        </span>
      </div>
      <div class="right">
        <div class="reciprocal">25:00</div>
        <div class="reciprocal">25:00</div>
        <div class="reciprocal">25:00</div>
        <div class="reciprocal">25:00</div>
      </div>
    </div>
    <!-- footer icon -->
    <svg class="tomatoIcon"><use xlink:href="#tomato--orange" /></svg>
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
    }
  },
  methods: {
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
}
.sideBarIcon {
  position: relative;
  top: 30%;
  width: 45px
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
    width: 45px;
    height: 45px;
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
  }
  .start {
    background-color: #fff;
  }
}

.right {
  flex: 50%;
  // width: 50%;
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
</style>
