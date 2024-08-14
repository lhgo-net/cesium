<!-- src/components/PhotoCapture.vue -->
<template>
    <div>
      <video ref="video" width="300" height="300" autoplay></video>
      <button @click="takePhoto">拍照</button>
      <canvas ref="canvas" width="300" height="300" style="display: none;"></canvas>
      <!-- <div v-if="photoData"> -->
        <h3>照片预览</h3>
        <img :src="photoData" alt="Captured Photo" />
      <!-- </div> -->
      <textarea v-model="photoData" rows="10" cols="50"></textarea>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        photoData: null,
      };
    },
    mounted() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        this.takePhoto()

        })
        .catch((error) => {
          console.error('Error accessing the camera', error);
        });
    },
    methods: {
      takePhoto() {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        context.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
        this.photoData = canvas.toDataURL('image/png');
      },
    },
  };
  </script>
  