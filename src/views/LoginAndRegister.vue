<template>
    <div>
        <Dialog :show="dialogConfig.show" :title="dialogConfig.title" :buttons="dialogConfig.buttons" width="400px"
            :showCancel="false" @close="dialogConfig.show = false">

            <el-form class="login-register" :model="formData" :rules="rules" ref="formDataRef">

                <!--input-->
                <el-form-item prop="email">
                    <el-input size="large" clearable placeholder="please input your email" v-model="formData.email">
                        <template #prefix>
                            <span class="iconfont icon-email"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <!--Login Password-->
                <el-form-item prop="password" v-if="opType == 1">
                    <el-input :type="passwordEyeType.passwordEyeOpen ? 'text' : 'password'" size="large"
                        placeholder="please input your password" v-model="formData.password">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>
                        </template>
                        <template #suffix>
                            <span @click="eyeChange('passwordEyeOpen')"
                                :class="['iconfont', passwordEyeType.passwordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <!--Register -->
                <div v-if="opType == 0 || opType == 2">
                    <el-form-item prop="emailCode">
                        <div class="send-email-panel">
                            <el-input size="large" clearable placeholder="input email verification code"
                                v-model="formData.emailCode">
                                <template #prefix>
                                    <span class="iconfont icon-checkcode"></span>
                                </template>
                            </el-input>
                            <el-button class="sent-mail-btn" type="primary" size="large">Get code</el-button>
                        </div>
                        <el-popover placement="left" :width="450" trigger="click">
                            <div>
                                <p>1,Check your spam or junk email folder</p>
                                <p>2,Add the email [5956882@qq.com] address to your whitelist</p>
                            </div>
                            <template #reference>
                                <span class="a-link" :style="{ 'font-size': '14px'}">Didn't get mail code?</span>
                            </template>
                        </el-popover>
                    </el-form-item>

                    <el-form-item prop="nickName" v-if="opType == 0">
                        <el-input size="large" clearable placeholder="please input nickname" v-model="formData.nickName">
                            <template #prefix>
                                <span class="iconfont icon-account"></span>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="registerPassword">
                        <el-input :type="passwordEyeType.registerPasswordEyeOpen ? 'text' : 'password'" size="large"
                            placeholder="please input your password" v-model="formData.registerPassword">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                            <template #suffix>
                                <span @click="eyeChange('registerPasswordEyeOpen')"
                                    :class="['iconfont', passwordEyeType.registerPasswordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="reRegisterPassword">
                        <el-input :type="passwordEyeType.reRegisterPasswordEyeOpen ? 'text' : 'password'" size="large"
                            placeholder="comfirm your password" v-model="formData.reRegisterPassword">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                            <template #suffix>
                                <span @click="eyeChange('reRegisterPasswordEyeOpen')"
                                    :class="['iconfont', passwordEyeType.reRegisterPasswordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>

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
                <el-form-item v-if="opType == 1">
                    <div class="rememberme-panel">
                        <el-checkbox v-model="formData.rememberMe">Remember me</el-checkbox>
                    </div>
                    <div class="no-account">
                        <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">Forgot password?</a>
                        <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">Need an account?</a>
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 0">
                    <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">Already have an account?</a>
                </el-form-item>

                <el-form-item v-if="opType == 2">
                    <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">Sign in?</a>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="op-btn">Log in</el-button>
                </el-form-item>
            </el-form>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const api = {
    checkCode: "/api/checkCode",
};



//0: register, 1: login, 2:reset password
const opType = ref();

const showPanel = (type) => {
    opType.value = type;
    resetForm();
};
defineExpose({ showPanel });

//Verification
const checkCodeUrl = ref(api.checkCode);

const changeCheckCode = (type) => {
    checkCodeUrl.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime();
};

//Password display hidden operation
const passwordEyeType = reactive({
    passwordEyeOpen: false,
    registerPasswordEyeOpen: false,
    reRegisterPasswordEyeOpen: false,
});

const eyeChange = (type) => {
    passwordEyeType[type] = !passwordEyeType[type];
};

const dialogConfig = reactive({
    show: false,
    title: "Title",
});

const formData = ref({});
const formDataRef = ref();
const rules = {
    title: [{ required: true, message: "Please enter content" }],
};

// reset form
const resetForm = () => {
    dialogConfig.show = true;
    if (opType.value == 0) {
        dialogConfig.title = "Sign Up"
    } else if (opType.value == 1) {
        dialogConfig.title = "Sign In"
    } else if (opType.value == 2) {
        dialogConfig.title = "Reset Password"
    }
    nextTick(() => {
        changeCheckCode(0);
        formDataRef.value.resetFields();
    });
};
</script>

<style lang="scss">
.login-register {
    .send-email-panel {
        display: flex;
        width: 100%;
        justify-content: space-between;

        .sent-mail-btn {
            margin-left: 5px;
        }
    }

    .check-code-panel {
        display: flex;

        .check-code {
            margin-left: 5px;
            cursor: pointer;
        }
    }

    .rememberme-panel {
        width: 100%;
    }

    .no-account {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .op-btn {
        width: 100%;
    }
}
</style>
