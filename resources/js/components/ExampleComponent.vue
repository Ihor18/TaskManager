<template>

    <div class="container" v-if="$route.path==='/'">
        <h1 class="text-center">Task manager</h1>
        <div class="text-center mt-3 mb-3">
            <input type="text" ref="newItem" placeholder="Add new task" @keydown.enter="addTask">
            <button class="btn btn-primary" @click="addTask">Add</button>
        </div>
        <div class="row mb-3">
            <button class="btn btn-warning col-3 border-dark" @click="getTasks">All</button>
            <button class="btn btn-warning col-3 border-dark" @click="sortTask('Not Active')">Not Active</button>
            <button class="btn btn-warning col-3 border-dark" @click="sortTask('In progress')">In progress</button>
            <button class="btn btn-warning col-3 border-dark" @click="sortTask('Ended')">Ended</button>
        </div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tr v-for="(item,key) in list">
                <th scope="row">{{ key + 1 }}</th>
                <th>
                    <router-link :to="'/todos/'+item.id">{{ item.name }}</router-link>
                </th>
                <td v-bind:style="'font-family:Comic sans;'+'color:'+getColor(item.status)"><b>{{ item.status }}</b>
                </td>
                <td>
                    <button class="btn-success" @click="changeStatus(item.status,item.id)">Change Status</button>
                    <button class="btn-danger" @click="removeTask(item.id)">Delete</button>
                </td>
            </tr>
        </table>
    </div>

</template>

<script>

export default {
    name: "App",
    mounted() {
        this.getTasks();

    },
    computed: {},
    data() {
        return {
            list: []
        }
    },
    methods: {
        getTasks() {
            axios
                .get('/api/Task/')
                .then(response => (this.list = response.data));
        },
        sortTask(param) {
            axios
                .get('/api/Task/Sort/'+param)
                .then(response => (this.list = response.data));
        },
        addTask() {
            axios.post(
                "/api/Task/",
                {
                    'name': this.$refs.newItem.value,
                }
            );
            this.$refs.newItem.value = '';
            this.getTasks();
        },
        removeTask(id) {
            axios.delete('/api/Task/' + id);
            this.getTasks();
        },
        changeStatus(status, id) {
            let nextStatus;
            switch (status) {
                case 'Not Active':
                    nextStatus = 'In progress';
                    break;
                case 'In progress':
                    nextStatus = 'Ended';
                    break;
                case 'Ended':
                    nextStatus = 'Not Active';
                    break;
            }

            axios.put('/api/Task/' + id, {
                'status': nextStatus
            })
            this.getTasks();
        },
        getColor(status) {
            let color;
            switch (status) {
                case 'Not Active':
                    color = 'Red';
                    break;
                case 'In progress':
                    color = '#FFD700';
                    break;
                case 'Ended':
                    color = 'Green';
                    break;
            }
            return color;
        }
    }
}
</script>

