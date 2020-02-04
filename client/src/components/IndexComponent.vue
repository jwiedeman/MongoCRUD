<template>
    <div :key="componentKey">
    
        <h1>Clients</h1>
        <div class="row">
    
            <div class="col-md-10">
                <form class="form-inline md-form form-sm mt-0">
                    <input class='form-control form-control-sm w-50' placeholder="Search Clients . . ." type="text" v-model="search" @input="onChange" @keydown.enter="onEnter" />
                </form>
            </div>
        </div>

        <table class="table table-hover table-bordered table-sm">
            <caption>List of Clients</caption>
            <thead>
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">ID</th>
                    <th scope="col">Body</th>
                    <th scope="col">Actions</th>
                    <th scope="col">Delete</th>
                    <th scope="col">View Data</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(client) in filtered_clients">
                        <tr  :key="client._id" data-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapse2">
                          <td>{{ client.title }}</td>
                          <td>{{client._id}}</td>
                          <td>{{ client.body }}</td>
                          <td><router-link :to="{name: 'edit', params: { id: client._id }}" class="btn btn-sm btn-dark">Edit</router-link></td>
                          <td ><button class=" btn btn-sm btn-danger" @click.prevent="deleteClient(client._id)">Delete</button></td>
                          <td><button class=" btn btn-sm btn-dark" @click="toggle(client._id)" :class="{ opened: opened.includes(client._id) }">View Data</button></td>
                        </tr>
                      
                        <tr class='bg-light ' v-if="opened.includes(client._id)" :key="client._id">
                          <td colspan="6">{{client}}</td>
                        </tr>
</template>
            </tbody>
            
        </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            clients: [],
            search: '',
            filtered_clients: [],
            componentKey: 0,
            isLoading: false,
            arrowCounter: 0,
            opened: []
        }
    },
    created() {
        let uri = 'http://localhost:4000/clients';
        this.axios.get(uri).then(response => {
            this.clients = response.data;
            this.onChange();
        });
    },
    methods: {
        toggle(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1)
            } else {
                this.opened.push(id)
            }
        },
        forceRerender() {

            this.componentKey += 1;
        },
        onChange() {
            // Let's warn the parent that a change was made
            this.$emit('input', this.search);

            // Is the data given by an outside ajax request?
            if (this.isAsync) {
                this.isLoading = true;
            } else {
                // Let's  our flat array
                this.filterResults();
                this.isOpen = true;
            }
        },
        filterResults() {
            // first uncapitalize all the things
            this.filtered_clients = this.clients.filter((item) => {
                return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            });
        },
        setResult(result) {
            this.search = filtered_clients;
            this.isOpen = false;
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.filtered_clients.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.filtered_clients[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        deleteClient(id) {
            let uri = `http://localhost:4000/clients/delete/${id}`;
            this.axios.delete(uri).then(response => {
                // redownload and replace the clients obj like a fucking sane human being
                this.clients = []
                this.filtered_clients = []
                this.clients = response.data;
                this.onChange()
            }).then(this.filterResults()) // refill the sorted list, then rerender
            console.log(this.clients, this.filtered_clients)
        }
    },
    watch: {
        items: function(val, oldValue) {
            // actually compare them
            if (val.length !== oldValue.length) {
                this.filtered_clients = val;
                this.isLoading = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>