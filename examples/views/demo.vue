<template>
  <!--  <div class="row">-->
  <!--    <div class="col-8">-->
  <!--      <h3>Draggable</h3>-->
  <!--      <draggable-->
  <!--        v-model="rows"-->
  <!--        tag="v-layout"-->
  <!--        class="row wrap fill-height align-center sortable-list"-->
  <!--        style="background: grey;"-->
  <!--      >-->
  <!--        <v-flex-->
  <!--          v-for="row in rows"-->
  <!--          :key="row.index"-->
  <!--          class="sortable"-->
  <!--          xs12-->
  <!--          my-2-->
  <!--          style="background: red"-->
  <!--        >-->
  <!--          <draggable-->
  <!--            :list="row.items"-->
  <!--            tag="v-layout"-->
  <!--            :group="{ name: 'row' }"-->
  <!--            class="row wrap justify-space-around"-->
  <!--          >-->
  <!--            <v-flex-->
  <!--              v-for="item in row.items"-->
  <!--              :key="item.title"-->
  <!--              xs4-->
  <!--              pa-3-->
  <!--              class="row-v"-->
  <!--            >-->
  <!--              <v-card style="height: 100px;">{{ item.title }}</v-card>-->
  <!--            </v-flex>-->
  <!--          </draggable>-->
  <!--        </v-flex>-->
  <!--      </draggable>-->
  <!--    </div>-->

  <!--    <rawDisplayer class="col-3" :value="rows" title="List" />-->
  <!--  </div>-->
  <div class="row">
    <div class="col-8">
      <h3>Draggable</h3>
      <draggable
        v-model="rows"
        style="background: grey;"
      >
        <template #item="{ element }">
          <div
            class="Everright-editor-InlineLayout">
            <draggable
              :list="element.items"
              :group="{ name: 'row' }"
            >
              <template #item="{ element }">
                <div style="position: relative">
                  <div>{{ element.title }}</div>
                </div>
              </template>
            </draggable>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'functional',
  display: 'Functional third party',
  order: 17,
  components: {
    draggable
  },
  data () {
    return {
      enabled: true,
      rows: [
        {
          index: 1,
          items: [
            {
              title: 'item 1'
            }
          ]
        },
        {
          index: 2,
          items: [
            {
              title: 'item 2'
            },
            {
              title: 'item 3'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
.buttons {
  margin-top: 35px;
}

.row-v {
  height: 150px;
  width: 200px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.Everright-editor-InlineLayout>div {
  display: flex;
}
.Everright-editor-InlineLayout>div> * {
  width: 50%;
}
</style>
