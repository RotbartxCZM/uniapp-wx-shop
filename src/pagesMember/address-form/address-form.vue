<script setup lang="ts">
import { getMemberAddressByIdAPI, postAdressAPI, putAdressAPI } from '@/services/adress'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const form = ref({
  /** 收货人 */
  receiver: '',
  /** 联系方式*/
  contact: '',
  /** 省市区(前端展示) */
  fullLocation: '',
  /** 省份编码(后端参数) */
  provinceCode: '',
  /** 城市编码(后端参数) */
  cityCode: '',
  /** 区/县编码(后端参数) */
  countyCode: '',
  /** 详细地址 */
  address: '',
  /** 默认地址，1为是，0为否 */
  isDefault: 0,
})

// 校验规则
const rules: UniHelper.UniFormsRules = {
  receiver: {
    rules: [{ required: true, errorMessage: '请输入收货人姓名' }],
  },
  contact: {
    rules: [
      { required: true, errorMessage: '请输入联系方式' },
      { pattern: /^1[3-9]\d{9}$/, errorMessage: '手机号格式不正确' },
    ],
  },
  fullLocation: {
    rules: [{ required: true, errorMessage: '请选择所在地区' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '请选择详细地址' }],
  },
}

// 传id为修改无为新建
const query = defineProps<{
  id?: string
}>()
// 动态设置标题
uni.setNavigationBarTitle({ title: query.id ? '修改地址' : '新建地址' })

// 修改地址(省/市/县 picker)
const onFullLocationChange: UniHelper.RegionPickerOnChange = (ev) => {
  // 前端展示
  form.value.fullLocation = ev.detail.value.join(' ')
  // 后端传参
  // form.value.provinceCode = ev.detail.code![0]
  // form.value.cityCode = ev.detail.code![1]
  // form.value.countyCode = ev.detail.code![2]
  // 省市区(后端参数)
  const [provinceCode, cityCode, countyCode] = ev.detail.code!
  // 合并数据
  Object.assign(form.value, { provinceCode, cityCode, countyCode })
}
// 收集是否默认收货地址
const onSwitchChange: UniHelper.SwitchOnChange = (ev) => {
  form.value.isDefault = ev.detail.value ? 1 : 0
}
// 提交表单
const onSubmit = async () => {
  try {
    // 表单校验
    await formRef.value?.validate?.()
    // 判断当前页面是否有地址 id
    if (query.id) {
      // 修改地址请求
      await putAdressAPI(query.id, form.value)
    } else {
      // 新建地址请求
      await postAdressAPI(form.value)
    }
    // 成功提示
    uni.showToast({ icon: 'success', title: query.id ? '修改成功' : '添加成功！' })
    // 返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 400)
  } catch (error) {
    uni.showToast({
      icon: 'error',
      title: '请填写完整信息',
    })
  }
}

// 获取收货地址详情数据
const getMemberAddressByIdData = async () => {
  console.log(query.id)

  // 有 id 才调用接口
  if (query.id) {
    // 发送请求
    const res = await getMemberAddressByIdAPI(query.id)
    // 把数据合并到表单中
    Object.assign(form.value, res.result)
  }
}

const formRef = ref<UniHelper.UniFormsInstance>()

// 页面加载
onLoad(() => {
  getMemberAddressByIdData()
})
</script>

<template>
  <view class="content">
    <uni-forms :rules="rules" :model="form" ref="formRef">
      <!-- 表单内容 -->
      <uni-forms-item name="receiver" class="form-item">
        <text class="label">收货人</text>
        <input class="input" placeholder="请填写收货人姓名" v-model="form.receiver" />
      </uni-forms-item>
      <uni-forms-item name="contact" class="form-item">
        <text class="label">手机号码</text>
        <input
          class="input"
          placeholder="请填写收货人手机号码"
          :maxlength="11"
          v-model="form.contact"
        />
      </uni-forms-item>
      <uni-forms-item name="fullLocation" class="form-item">
        <text class="label">所在地区</text>
        <picker
          class="picker"
          @change="onFullLocationChange"
          mode="region"
          :value="form.fullLocation.split(' ')"
        >
          <view v-if="form.fullLocation">{{ form.fullLocation }}</view>
          <view v-else class="placeholder">请选择省/市/区(县)</view>
        </picker>
      </uni-forms-item>
      <uni-forms-item name="address" class="form-item">
        <text class="label">详细地址</text>
        <input class="input" placeholder="街道、楼牌号等信息" v-model="form.address" />
      </uni-forms-item>
      <view class="form-item">
        <label class="label">设为默认地址</label>
        <switch
          class="switch"
          color="#27ba9b"
          @change="onSwitchChange"
          :checked="form.isDefault === 1"
        />
      </view>
    </uni-forms>
  </view>
  <!-- 提交按钮 -->
  <button @tap="onSubmit" class="button">保存并使用</button>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.content {
  margin: 20rpx 20rpx 0;
  padding: 0 20rpx;
  border-radius: 10rpx;
  background-color: #fff;

  .form-item,
  .uni-forms-item {
    display: flex;
    align-items: center;
    min-height: 96rpx;
    padding: 25rpx 10rpx 40rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;
    position: relative;
    margin-bottom: 0;

    // 调整 uni-forms 样式
    .uni-forms-item__content {
      display: flex;
    }

    .uni-forms-item__error {
      margin-left: 200rpx;
    }

    &:last-child {
      border: none;
    }

    .label {
      width: 200rpx;
      color: #333;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .switch {
      position: absolute;
      right: -20rpx;
      transform: scale(0.8);
    }

    .picker {
      flex: 1;
    }

    .placeholder {
      color: #808080;
    }
  }
}

.button {
  height: 80rpx;
  margin: 30rpx 20rpx;
  color: #fff;
  border-radius: 80rpx;
  font-size: 30rpx;
  background-color: #27ba9b;
}
</style>
