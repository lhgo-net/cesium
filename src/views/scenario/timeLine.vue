<template>
  <div class="timeline-container">
    <!-- <div id="timeline" class="timeline"></div> -->
    <s-time-axis class="timeline" :range="range" :is-scale="false" :is-switch="true" @change="onTimeAxisChange"></s-time-axis>
  </div>
</template>

<script>
export default {
  data() {
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(startDate.getDate())
    endDate.setDate(endDate.getDate() + 7)
    return {
      range: [startDate, endDate]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      document.addEventListener('DOMContentLoaded', function () {
        var timeline = document.getElementById('timeline')

        // 添加时间点
        addTimelineEvent('2023-01-01')
        addTimelineEvent('2023-02-15')
        addTimelineEvent('2023-04-05')
        addTimelineEvent('2023-06-20')

        // 为每个时间点添加点击事件
        var events = document.getElementsByClassName('timeline-event')
        for (var i = 0; i < events.length; i++) {
          events[i].addEventListener('click', function () {
            // 在这里添加点击事件的处理逻辑
            alert('时间点被点击了！')
          })
        }

        // 添加时间点的函数
        function addTimelineEvent(dateString) {
          var eventDate = new Date(dateString)
          var eventPosition = calculateEventPosition(eventDate)

          var eventDiv = document.createElement('div')
          eventDiv.className = 'timeline-event'
          eventDiv.style.left = eventPosition + '%'

          timeline.appendChild(eventDiv)
        }

        // 计算时间点在时间线上的位置（百分比）
        function calculateEventPosition(date) {
          var startDate = new Date('2023-01-01')
          var endDate = new Date('2023-12-31')
          var totalTime = endDate - startDate
          var currentTime = date - startDate

          return (currentTime / totalTime) * 100
        }
      })
    },
    onTimeAxisChange(time) {
      // const date = new Date()
      console.log(time)
    }
  }
}
</script>

<style scoped lang="less">
.timeline-container {
    width: 80%;
    margin: 5px auto;
}

.timeline {
    position: relative;
    height: 10px;
    background-color: #ddd;
}

.timeline::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #3498db;
    transition: width 0.5s ease;
}

.timeline-event {
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: #3498db;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.timeline-event:hover {
    background-color: #2980b9;
}

</style>

<style lang="less">
.timeline .time-axis{
  background: linear-gradient(to top, rgba(27, 142, 130,1),rgba(27, 142, 130,0.5)) !important;
}
.timeline .bar{
  background: linear-gradient(to right,#079cbe,#06acc8,#04c4d6,#03dbe4,#01f1df,#00fadb,#bbfefa) !important;
}
</style>
