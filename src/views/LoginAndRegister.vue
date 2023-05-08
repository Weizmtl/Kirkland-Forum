<template>
    <div>
        <Dialog :show="dialogConfig.show" :title="dialogConfig.title" :buttons="dialogConfig.buttons" width="400px"
            :showCancel="false" @close="dialogConfig.show = false">
            <el-form class="login-register" :model="formData" :rules="rules" ref="formDataRef">
                <!--input-->
                <el-form-item prop="email">
                    <el-input size="large" clearable placeholder="please input your email" v-model="formData.email">
                        <template #prefix>
                            <span class="iconfont icon-account"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="email">
                    <el-input size="large" clearable placeholder="please input your password" v-model="formData.password">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item prop="checkCode">
                    <div class="check-code-panel">
                        <el-input size="large" clearable placeholder="Please input verification code"
                            v-model="formData.checkCode">
                            <template #prefix>
                                <span class="iconfont icon-checkcode"></span>
                            </template>
                        </el-input>
                        <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode(0)" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="rememberme-panel">
                        <el-checkbox v-model="formData.rememberMe">Remember</el-checkbox>
                    </div>
                    <div class="no-account">
                        <a href="javascript:void(0)" class="a-link">Forgot password?</a>
                        <a href="javascript:void(0)" class="a-link">Need an account?</a>
                    </div>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" class="op-btn">Log in</el-button>
                </el-form-item>
            </el-form>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const api = {
    checkCode: "/api/checkCode",
};



//0: register, 1: login, 2:forget password
const onType = ref();

const showPanel = (type) => {
    onType.value = type;
};
defineExpose({ showPanel });

//Verification
const checkCodeUrl = ref(api.checkCode);

const changeCheckCode = (type) => {
    checkCodeUrl.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
}

const dialogConfig = reactive({
    show: true,
    title: "Title",
});

const formData = ref({});
const formDataRef = ref();
const rules = {
    title: [{ required: true, message: "Please enter content" }],
};


</script>

<style lang="scss">
.login-register {
    .check-code-panel {
        display: flex;

        .check-code {
            margin-left: 5px;
            cursor: pointer;
        }
    }
    .rememberme-panel{
        width: 100%;
    }
    .no-account{
        width:100%;
        display: flex;
        justify-content: space-between;
    }
    .op-btn{
        width: 100%;
    }
}
</style>
