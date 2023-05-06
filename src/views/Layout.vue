<template>
    <div>
        <div class="header">
            <div class="header-content" :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
            
            <div class="logo">
                <span v-for="item in logoInfo" :style="{ color: item.color }">{{ item.letter }}
                </span>
            </div>
        </div>
    </div>
    <div>
        <router-view />
    </div>
</div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const logoInfo = ref([
    {
        letter: "K",
        color: "red",
    },
    {
        letter: "i",
        color: "red",
    },
    {
        letter: "r",
        color: "red",
    },
    {
        letter: "k",
        color: "red",
    },
    {
        letter: "l",
        color: "red",
    },
    {
        letter: "a",
        color: "red",
    },
    {
        letter: "n",
        color: "red",
    },
    {
        letter: "d",
        color: "red",
    },
]);
</script>

<style lang="scss">
.header {
    width: 100%;
    position: fixed;
    box-shadow: 0 2px 6px 0 #ddd;

    .header-content {
        margin: 0px auto;
        align-items: center;
        height: 60px;
        display: flex;
        align-items: center;

        .logo {}
    }
}
</style>
