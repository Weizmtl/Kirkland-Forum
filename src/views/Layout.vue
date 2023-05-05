<template>
    <div>
        <div class="header">
            <div class="header-content" :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
            </div>
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import {useRouter, useRoute} from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route =useRoute();
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    height: 60px;
    position: fixed;
    box-shadow: 0 2px 6px 0 #ddd;
}
</style>
