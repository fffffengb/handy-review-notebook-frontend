<template>
  <div class="allFile">
    <div class="show-area area">
      <h1>在这里查看所有的卡片呦~</h1>
      <div class="lists">
        <a-list itemLayout="vertical" size="small" :dataSource="curPageCards" :loading="loading">
          <a-list-item slot="renderItem" slot-scope="item" key="item.id">
            <a-list-item-meta>
              <b slot="title" >{{item.question}}</b>
              <template slot="description" v-for="label in item.labels">
                <a-tag :key="label.id">
                  {{label.labelName}}
                </a-tag>
              </template>
            </a-list-item-meta>
            <p>{{moment(item.createTime).format("  YYYY-MM-DD")}}</p>
            <a-button slot="extra" type="primary" ghost icon="heart" @click="getAnswer(item.id, item.question, item.answer)">查看答案</a-button>
          </a-list-item>
        </a-list>
      </div>
      <div class="pagination">
        <a-pagination v-model="currentPage" :total="total" :pageSize="pageSize" @change="pageChange"/>
      </div>
    </div>
    <div class="search-area area">
      <h1>检索所有卡片~</h1>
      <div class="date-picker">
        <a-range-picker
          :disabledDate="disabledDate"
          :format="dateFormat"
          :defaultValue="defaultDate"
          size="small"
        />
      </div>
      <div class="button">
        <a-button type="primary" ghost shape="circle" icon="search" @click="search"/>
      </div>
      <div class="label">
        <Tag @tagsChanged="changeCurTags"></Tag>
      </div>
      <div class="answer">
        <a-card :title="curQuestion"  style="width: 93%">
          <a-textarea size="large" :autosize="{minRows: 5}" v-model="curAnswer"/>
          <template class="card-actions" slot="actions">
            <a-button type="primary" ghost icon="trophy" size="large" @click="save">保存</a-button>
          </template>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import Tag from "@/components/Tag";
  import { requestAllCard, updateCard } from "@/network/api";
  // import { defaultDisplayCardDays } from "@/config/common.config" TODO 放到配置文件里
  export default {
    data() {
      return {
        allCards: [],
        curPageCards: [],
        loading: true,
        pageSize: 4,
        currentPage: 1,
        total: 0,
        selectedTags: [],
        dateFormat: "YYYY-MM-DD",
        defaultDate: [moment().subtract(1,"weeks"), moment()],
        haveClickGetAnswer: false,
        curId: "0",
        curQuestion: "这里是问题或提示",
        curAnswer: "这里显示答案"
      };
    },
    components: {
      Tag
    },
    mounted() {  // 初始化时默认查询最近一周的所有卡片
      requestAllCard(this.selectedTags, this.defaultDate[0], this.defaultDate[1]).then(res => {
        this.total = res.data.length
        this.allCards = res.data
        if (this.total > this.pageSize) {
          this.curPageCards = this.allCards.slice(0, this.pageSize)
        }
        this.loading = false
      }).catch(err => {
        console.log("requestAllCard错了", err)
      })
    },
    methods: {
      moment,
      getAnswer(id, question, answer) {
        this.haveClickGetAnswer = true
        console.log(question, answer);
        this.curId = id
        this.curQuestion = question
        this.curAnswer = answer
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
      changeCurTags(selectedTags) {
        this.selectedTags = selectedTags
      },
      search() {
        // TODO 按条件查找卡片
      },
      save() {
        if (!this.haveClickGetAnswer) {
          this.$message.info("请先查看一个答案哟~")
        }else {
          updateCard(this.curId, this.curAnswer).then(res => {
            console.log(res);
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
    height: 100%;
    width: 100%;
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

  .pagination {
    margin-top: 10px;
    float: right;
  }

  .date-picker {
    margin-top: 22px;
  }

  .button {
    position: absolute;
    top: 130px;
    right: 40px;
  }

  .label {
    margin-top: 20px;
  }

  .answer {
    margin-top: 30px;
  }

</style>
