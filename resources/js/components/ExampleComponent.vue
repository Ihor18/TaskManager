<template>
    <div class="container">

        <div class="text-center mt-3 mb-3">
            <input type="text" ref="newItem" placeholder="Add new task" @keydown.enter="addItem">
            <button class="btn btn-primary" @click="addTask">Add</button>
        </div>
        <div class="row mb-3">
            <button class="btn btn-warning col-3 border-dark">All</button>
            <button class="btn btn-warning col-3 border-dark">Not Active</button>
            <button class="btn btn-warning col-3 border-dark">In progress</button>
            <button class="btn btn-warning col-3 border-dark">Ended</button>
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
                <th scope="row">{{(key+1)}}</th>
                <td><a href="#">{{item}}</a></td>
                <td>Active</td>
                <td><button class="btn-success" @click="removeTask(key)">Change Status</button>
                    <button class="btn-danger" @click="removeTask(key)">Delete</button></td>
            </tr>
        </table>

    </div>
</template>

<script>
    export default {
        mounted() {

        },
        computed:{

        },
        data(){
            return {
                list: []
            }
        },
        methods:{
        addTask(){
            this.list.push(this.$refs.newItem.value);
            this.$refs.newItem.value = '';
            },
        removeTask(id){
            this.list.splice(id,1)
        }

        }
    }
</script>
