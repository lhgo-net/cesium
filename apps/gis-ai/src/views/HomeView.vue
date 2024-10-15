<script setup>
import { onMounted } from 'vue'

function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      window.localStream = stream // A
      window.localAudio.srcObject = stream // B
      window.localAudio.autoplay = true // C
    })
    .catch((err) => {
      console.error(`you got an error: ${err}`)
    })
}

onMounted(() => {
  // getLocalStream()

  let mediaRecorder
  let audioChunks = []
  let isRecording = false
  const startButton = document.getElementById('start')
  const stopButton = document.getElementById('stop')
  const recordingsContainer = document.getElementById('recordings')

  startButton.addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    // 初始化MediaRecorder，指定分段时间（例如5秒）
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })
    console.log(mediaRecorder)
    // 每当有音频数据可用时触发
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)

      // 每5秒处理一次录音数据
      if (mediaRecorder.state === 'recording') {
        processAudioData()
      }
    }

    // 处理并保存录音数据
    function processAudioData() {
      if (audioChunks.length > 0) {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        const audioUrl = URL.createObjectURL(audioBlob)
        const audioElement = document.createElement('audio')
        audioElement.controls = true
        audioElement.src = audioUrl

        // 添加到页面中
        recordingsContainer.appendChild(audioElement)

        // 提供下载链接
        const downloadLink = document.createElement('a')
        downloadLink.href = audioUrl
        downloadLink.download = `recording-${Date.now()}.webm`
        downloadLink.textContent = '下载录音'
        recordingsContainer.appendChild(downloadLink)

        // 清空音频块以准备下一次录制
        audioChunks = []
      }
    }

    mediaRecorder.start(5000) // 每5秒分段录制
    isRecording = true
    startButton.disabled = true
    stopButton.disabled = false
  })

  stopButton.addEventListener('click', () => {
    if (isRecording) {
      mediaRecorder.stop()
      isRecording = false
      startButton.disabled = false
      stopButton.disabled = true
    }
  })
})
</script>

<template>
  <main>
    <h1>长时间监听麦克风</h1>
    <button id="start">开始监听</button>
    <button id="stop" disabled>停止监听</button>
    <div id="recordings"></div>
  </main>
</template>
