<template>
    <div class="container" v-if="$route.path!=='/'">
        <h1 class="text-center">Todo List</h1>
        <div class="text-center mt-3 mb-3">
            <input type="text" ref="newItem" placeholder="Add new item" @keydown.enter="addTodo">
            <button class="btn btn-primary" @click="addTodo">Add</button>
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Check</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tr v-for="(item,key) in list">
                <th scope="row">{{ key + 1 }}</th>
                <td><input style="margin-left: 10px;width:20px;height:20px" class="form-check-input"
                           type="checkbox" id="flexCheckChecked" v-bind:checked="item.isChecked"
                           @click="updateChecked(item.id,item.isChecked);item.isChecked=!item.isChecked"></td>
                <th>
                    {{ item.name }}
                </th>
                <td>
                    <button class="btn-danger" @click="removeTodo(item.id)">Delete</button>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    name: "App",
    mounted() {
        this.getTodo();

    },

    computed: {},
    data() {
        return {
            list: [],
            id: this.$route.params.id
        }
    },
    methods: {
        getTodo() {
            axios
                .get('/api/Task/' + this.id)
                .then(response => (this.list = response.data));
        },
        addTodo(id) {
            axios.post(
                "/api/Todo/",
                {
                    'name': this.$refs.newItem.value,
                    'task_id': this.id
                }
            );
            this.$refs.newItem.value = '';
            this.getTodo();
        },
        removeTodo(id) {
            axios.delete('/api/Todo/' + id);
            this.getTodo();
        },
        updateChecked(id, check) {
            axios.put('/api/Todo/' + id, {
                'isChecked': !check
            })
        }
    }
}
</script>

