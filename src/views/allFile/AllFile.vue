<template>
  <div class="allFile">
    <div class="show-area area">
      <h1>在这里查看所有的卡片呦~</h1>
      <div class="lists">
        <a-list itemLayout="vertical" size="small" :dataSource="curPageCards" :loading="loading">
          <a-list-item slot="renderItem" slot-scope="item, index" key="item.id">
            <a-list-item-meta>
              <b slot="title" >{{item.question}}</b>
              <template slot="description" v-for="label in item.labels">
                <a-tag v-if="label.color !== '#FFFFFF'" :key="label.id" :color="label.color">
                  {{label.labelName}}
                </a-tag>
                <a-tag v-else :key="label.id">
                  {{label.labelName}}
                </a-tag>
              </template>
            </a-list-item-meta>
            <p>{{moment(item.createTime).format("YYYY-MM-DD")}}</p>
            <div slot="extra">
              <a-button type="primary" shape="circle" ghost icon="unlock" @click="getAnswer(index, item.id, item.question, item.answer)"/>
              <a-button class="delete-button" type="primary" ghost shape="circle" :loading="deleteButtonLoading" icon="close" @click="deleteItem(index, item.id)"/>
            </div>
            </a-list-item>
        </a-list>
      </div>
      <div class="pagination">
        <a-pagination v-model="curPage" :total="total" :pageSize="pageSize" @change="pageChange"/>
      </div>
    </div>
    <div class="search-area area">
      <h1>检索所有卡片~</h1>
      <div class="date-picker">
        <a-range-picker
          :disabledDate="disabledDate"
          :format="dateFormat"
          :defaultValue="selectedDate"
          size="small"
          @change="changeCurSelectedDateRange"
        />
      </div>
      <div class="button">
        <a-button type="primary" ghost shape="circle" icon="search" @click="search"/>
      </div>
      <div class="label">
        <Tag @tagsChanged="changeCurTags"/>
      </div>
      <div class="answer">
        <a-card :title="curQuestion"  style="width: 93%">
          <a-textarea size="large" :autosize="{minRows: 5}" v-model="curAnswer"/>
          <template class="card-actions" slot="actions">
            <a-button type="primary" ghost icon="trophy" size="large" :loading="saveButtonLoading" @click="save">保存</a-button>
          </template>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import Tag from "@/components/Tag";
  import { requestAllCard, updateCard, requestCardForReview, deleteCardById } from "@/network/api";

  export default {
    data() {
      return {
        allCards: [],
        curPageCards: [],
        loading: true,
        deleteButtonLoading: false,
        lastDelete: "",
        pageSize: 4,
        curPage: 1,
        total: 0,
        selectedTags: [],
        dateFormat: "YYYY-MM-DD",
        selectedDate: [moment().subtract(1,"weeks"), moment()],
        haveClickGetAnswer: false,
        curPageIndex: 0,
        curId: "",
        curQuestion: "这里是问题或提示",
        curAnswer: "这里显示答案",
        saveButtonLoading: false
      };
    },
    components: {
      Tag
    },
    mounted() {  // 初始化时默认查询今天需要复习的卡片
      requestCardForReview().then(res => {
        this.fillList(res)
        this.loading = false
      }).catch(err => {
        console.log("requestAllCard错了", err)
      })
    },
    methods: {
      moment,
      fillList(res) {
        this.total = res.data.length
        this.allCards = res.data
        if (this.total > this.pageSize) {
          this.curPageCards = this.allCards.slice(0, this.pageSize)
        } else {
          this.curPageCards = this.allCards.slice(0)
        }
      },
      getAnswer(curPageIndex, id, question, answer) {
        // 这样才能点击保存按钮
        this.haveClickGetAnswer = true
        this.curPageIndex = curPageIndex
        this.curId = id
        this.curQuestion = question
        this.curAnswer = answer
      },
      deleteItem(curPageIndex, id) {
        this.deleteButtonLoading = true
        deleteCardById(id).then(() => {
          // 删除当前页中的卡片
          this.curPageCards.splice(curPageIndex, 1)
          // 删除所有页中的卡片
          let curIndex = (this.curPage - 1) * this.pageSize + curPageIndex
          this.allCards.splice(curIndex, 1)
          // console.log(this.curPageCards.length);
          // 刷新当前页
          this.total -= 1
          // 调整页码
          if (curPageIndex === 0 && this.curPage !== 1) {
            this.curPage -= 1
          }
          // 这个被删除的答案不能再被编辑
          this.lastDelete = id
          this.pageChange(this.curPage)
          this.deleteButtonLoading = false
        })
      },
      pageChange(current) {
        let start = (current - 1) * this.pageSize
        let end = current * this.pageSize
        if (end > this.allCards.length)
          this.curPageCards = this.allCards.slice(start)
        else
          this.curPageCards = this.allCards.slice(start, end)
      },
      disabledDate(current) {
        return current > (moment().startOf("day").add(1, "day"));
      },
      changeCurSelectedDateRange(dates) {
        this.selectedDate = dates
      },
      changeCurTags(selectedTags) {
        this.selectedTags = selectedTags
      },
      search() {
        // 按条件查找卡片
        this.loading = true
        requestAllCard(this.selectedTags, this.selectedDate[0], this.selectedDate[1]).then(res => {
          this.fillList(res)
          this.loading = false
          this.$message.success("查找成功" + this.allCards.length + "条!")
          this.curPage = 1
        }).catch(err => {
          console.log("requestAllCard错了", err)
        })
      },
      save() {
        if (!this.haveClickGetAnswer) {
          this.$message.info("请先查看一个答案哟~")
        }else if(this.lastDelete === this.curId) {
          this.$message.error("这个卡片已经被删除了T_T")
        }else{
          this.saveButtonLoading = true
          updateCard(this.curId, this.curQuestion, this.curAnswer).then(res => {
            // 先修改当前页面中的卡片
            this.curPageCards[this.curPageIndex].question = this.curQuestion
            this.curPageCards[this.curPageIndex].answer = this.curAnswer
            // 再修改所有页面中的卡片
            let curIndex = (this.curPage - 1) * this.pageSize + this.curPageIndex
            this.allCards[curIndex].question = this.curQuestion
            this.allCards[curIndex].answer = this.curAnswer
            console.log(res);
            this.saveButtonLoading = false
            this.$message.success("修改成功~")
          }).catch(err => {
            console.log(err);
            this.$message.error("网络出现了问题")
          })
        }
      }
    }
}
</script>

<style scoped>
  .allFile {
    height: 99%;
    width: 100%;
    margin-left: 15px;
    margin-top: 15px;
  }

  .area {
    height: 100%;
  }

  .show-area {
    float: left;
    width: 68%;
    margin-right: 5px;
  }
  .search-area {
    float: left;
    width: 31%;
  }

  .lists {
    height: 80%;
    margin-right: 10px;
  }

  .delete-button {
    margin: 5px
  }

  .pagination {
    margin-top: 10px;
    float: right;
  }

  .date-picker {
    margin-top: 22px;
  }

  .button {
    position: absolute;
    top: 147px;
    right: 30px;
  }

  .label {
    margin-top: 20px;
  }

  .answer {
    margin-top: 30px;
  }

</style>
