<template>
    <div>
        <div class="header" v-if="showHeader">
            <div class="header-content" :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
                <!-- logo -->
                <router-link to="/" class="logo">
                    <span v-for="item in logoInfo" :style="{ color: item.color }">{{ item.letter }}
                    </span>
                </router-link>
                <!-- subsection panel -->
                <div class="menu-panel">


                </div>
                <!-- login and register panel -->
                <div class="user-info-panel">
                    <div class="op-btn">
                        <el-button type="primary" class="op-btn">
                            Post<span class="= iconfont icon-add"></span>
                        </el-button>
                        <el-button type="primary" calss="op-btn">
                            Search<span class="= iconfont icon-search"></span>
                        </el-button>
                    </div>
                    <el-button-group :style="{ 'margin-left': '10px' }">
                        <el-button type="primary" plain @click="login">Login</el-button>
                        <el-button type="primary" plain>Register</el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <Dialog :show="showDialog" :buttons="buttons" @close="showDialog = false">
           <div>this is content</div> 
        </Dialog>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const logoInfo = ref([
    {
        letter: "K",
        color: "#3285FF",
    },
    {
        letter: "i",
        color: "#FB3624",
    },
    {
        letter: "r",
        color: "#FFBA02",
    },
    {
        letter: "k",
        color: "#3285FF",
    },
    {
        letter: "l",
        color: "#FB3624",
    },
    {
        letter: "a",
        color: "#FFBA02",
    },
    {
        letter: "n",
        color: "#3285FF",
    },
    {
        letter: "d",
        color: "#FB3624",
    },
]);

const showHeader = ref(true);

//get the height of the scrollbar
const getScrollTop = () => {
    let scrollTop =
        document.documentElement.getScrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
    return scrollTop;
};

const initScroll = () => {
    let initScrollTop = getScrollTop();
    window.addEventListener("scroll", () => {
        let currentScrollTop = getScrollTop();
        if (currentScrollTop > initScrollTop) {
            // scroll down
            scrollType = 1;
        } else {
            scrollType = 0;
        }
        initScrollTop = currentScrollTop;
        console.log(currentScrollTop);
        if (scrollType == 1 && currentScrollTop > 100) {
            showHeader.value = false;
        } else {
            showHeader.value = true;
        }
    });
};

const showDialog = ref(true);

const buttons = [{
    text: "Comfirm",
    type: "primary",
},
];

const login = () =>{
    showDialog.value = true;
};

onMounted(() => {
    initScroll();
});
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

        .logo {
            display: block;
            text-decoration: none;
            margin-right: 5px;

            span {
                font-size: 35px;
            }
        }

        .menu-panel {
            flex: 1;
        }

        .user-info-panel {
            width: 345px;
            display: flex;

            .op-btn {
                .iconfont {
                    margin-left: 5px;
                }

                .el-button+.el-button {
                    margin-left: 5px;
                }
            }
        }
    }
}
</style>
