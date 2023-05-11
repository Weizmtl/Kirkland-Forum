<template>
  <div class="avatar"></div>
</template>

<script setup>
import {ref,reactive, getCurrentInstance} from "vue";
import { useRouter, useRoute} from "vue-router";
const {proxy} = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const props=defineProps({
    userId:{
        type:String,
    },
    width:{
        type:Number,
        default:60
    },
    addLink:{
        type:Boolean,
        default:true,
    },
})
</script>

<style lang="scss" scoped>
</style>
