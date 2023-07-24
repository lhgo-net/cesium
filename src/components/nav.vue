<template>
    <div class="nav-container">
        <slot></slot>
    </div>
</template>

<style scoped>
.nav-container{
    position: absolute;
    width: 100vw;
    bottom: 0;
    height: 64px;
    background-image: linear-gradient(to top,  rgba(41, 182, 246, 0.8), rgba(255, 0, 0, 0)) !important;
}
</style>