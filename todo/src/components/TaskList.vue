<template>
<div>
    <h1>ToDoリスト</h1>
    <form id="filter">
        <label>
            <input type="radio" name="filter" value="すべて" v-model="statusFilter" />すべて
        </label>
        <label>
            <input type="radio" name="filter" value="作業中" v-model="statusFilter" />作業中
        </label>
        <label>
            <input type="radio" name="filter" value="完了" v-model="statusFilter" />完了
        </label>
    </form>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>コメント</th>
                <th>状態</th>
            </tr>
        </thead>
        <tbody v-for="task in filteredTaskList" :key="task.id">
            <tr>
                <td>{{ task.id }}</td>
                <td>{{ task.comment }}</td>
                <td>
                    <button @click="changeTaskStatus(task)">
                        {{ task.status }}
                    </button>
                    <button @click="deleteTask(task)">
                        削除
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <h2>新規タスクの追加</h2>
    <input type="text" name="comment" v-model="comment" />
    <button @click="addTask">追加</button>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';

export default {
    data() {
        return {
            comment: ''
        };
    },
    computed: {
        ...mapGetters(['filteredTaskList']),
        statusFilter: {
            get() {
                return this.$store.state.statusFilter;
            },
            set(value) {
                this.$store.commit('changeStatusFilter', value);
            }
        }
    },
    methods: {
        addTask() {
            this.$store.commit('addTask', this.comment);
            this.comment = '';
        },
        deleteTask(task) {
            this.$store.commit('deleteTask', task);
        },
        changeTaskStatus(task) {
            this.$store.commit('changeTaskStatus', task);
        }
    }
};
</script>
