<template>
  <div class="profile">
      <a-row :gutter="20">
        <a-col :span="16">
          <h1>个人设置</h1>
          <a-list itemLayout="horizontal" :dataSource="listData" >
            <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
              <a-list-item-meta>
                <a slot="title">{{ item.title }}</a>
                <span slot="description">
                <span class="security-list-description">{{ item.description }}</span>
                <span v-if="item.value"> : </span>
                <span class="security-list-value">{{ item.value }}</span>
              </span>
              </a-list-item-meta>
              <template v-if="item.actions">
                <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
              </template>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <h1>编辑标签</h1>
          <div class="tags">
            <span v-for=" (label, key) in tags " v-bind:key="key">
            <a-tag v-if="label.color !== '#FFFFFF'" style="margin-bottom: 8px"
                   :color="label.color" closable @close="deleteLabel(label.id)">
            {{label.labelName}}
            </a-tag>
            <a-tag v-else style="margin-bottom: 8px" closable @close="deleteLabel(label.id)">
              {{label.labelName}}
            </a-tag>
          </span>
          </div>
          <div class="tagEditor">
            <div class="colorCheckbox">
              <a-radio-group style="width: 100%" @change="onChange" defaultValue="#FFFFFF">
                <a-row :gutter="8">
                  <a-col :span="7" v-for=" (color, key) in colors " v-bind:key="key">
                    <span style="{margin: 16px}">
                      <a-radio :value="key" class="radio">
                        <a-tag :color="key">{{color}}</a-tag>
                      </a-radio>
                    </span>
                  </a-col>
                  <a-col :span="8">
                    <span style="{margin: 16px}">
                      <a-radio value="#FFFFFF" class="radio">
                        <a-tag>纯白</a-tag>
                      </a-radio>
                    </span>
                  </a-col>
                </a-row>
              </a-radio-group>
            </div>
            <div class="tagInput">
              <a-row :gutter="12">
                <a-col :span="18">
                  <a-input v-model="labelName"/>
                </a-col>
                <a-col :span="4">
                  <a-button  type="primary" :loading="addButtonLoading" ghost icon="plus" @click="addLabel">添加</a-button>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
    <a-modal title="此处可以修改昵称" v-model="showChangeNickname" @ok="changeNickname">
      <a-form :form="changeNicknameForm" @submit="changeNickname">
        <a-form-item label="新昵称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
                  v-decorator="['changeNickname', { rules: [{ required: true, message: '昵称不能是空!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
<!--    <a-modal title="Basic Modal" v-model="showChangePwd" @ok="changePwd"/>-->
  </div>
</template>

<script>
  import {changeNickname, deleteLabelById, postLabel, requestAllLabel} from "@/network/api";
  import { colors } from "@/config/common.config";

  export default {
    name: "profile",
    inject: ["reload"],
    data(){
      return {
        colors,
        tags: [],
        curColor:"#FFFFFF",
        labelName:"",
        addButtonLoading: false,
        changeNicknameForm: this.$form.createForm(this, { name: 'changeNickname' }),
        showChangeNickname: false,
        showChangePwd: false,
        listData: [
          { title: '用户名', description: '注：修改一次昵称需要消耗6个硬币', value: "", actions: { title: '修改', callback: () => { this.showChangeNickname = true } } },
          { title: '账户密码', description: '检测密码强度还在开发中', value: "", actions: { title: '修改', callback: () => { this.$message.info('This is a normal message') } } },
          { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: "", actions: { title: '设置', callback: () => { this.$message.error('This is a message of error') } } },
          { title: '备用邮箱', description: '已绑定邮箱', value: "", actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } },
          { title: '最长复习周期', description: '默认是15天', value: '15', actions: { title: '设置', callback: () => { this.$message.warning('This is message of warning') } } },
          { title: '待复习内容排序', description: '依据日期排序', value: '降序', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } },
          { title: '主题配色', description: '当前配色', value: '矢车菊的蓝色', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning') } } },
        ]
      }
    },
    methods: {
      changeNickname(e){
        this.showChangeNickname = false
        e.preventDefault();
        this.changeNicknameForm.validateFields((err, value) => {
          if (!err) {
            changeNickname(value.changeNickname).then(() => {
              window.sessionStorage.setItem("nickname", value.changeNickname)
              this.reload()
              this.$message.success("修改成功√")
            }).catch(err => {
              console.log(err);
              this.$message.error("修改失败T_T")
            })
          } else {
            this.$message.error("修改失败T_T")
          }
        });
      },
      addLabel(){
        this.addButtonLoading = true
        postLabel(this.labelName, this.curColor).then(res => {
          this.tags.push(res.data)
          this.$message.success("添加成功")
        }).catch(err => {
          console.log(err)
          this.$message.error("网络异常")
        })
      },
      onChange(e) {
        this.curColor = e.target.value
      },
      deleteLabel(id) {
        deleteLabelById(id).then(res => {
          console.log(res)
          this.$message.success("删除成功~")
        }).catch((err) => {
          console.log(err);
          this.$message.error("网络出现问题")
        })
      },
    },
    mounted() {
      this.listData[3].value = "2333"
      requestAllLabel().then(res => {
        this.tags = res.data
      }).catch(err =>{
        console.log("请求所有标签时出现了错误: ", err)
      })
    }
  }
</script>

<style scoped>
  .profile {
    height: 99%;
    margin-left: 15px;
    margin-top: 15px;
  }

  .tagInput {
    width: 90%;
  }

  .radio {
    margin-bottom: 8px
  }

  .tagEditor {
    margin-top: 50px;
  }

</style>
