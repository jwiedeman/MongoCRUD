<template>
    <div :key="componentKey">
    
        <h1>Items</h1>
        <div class="row">
    
            <div class="col-md-10">
                <form class="form-inline md-form form-sm mt-0">
                    <i class="fas fa-search" aria-hidden="true"></i>
    
                    <input class='form-control form-control-sm ml-3 w-75' placeholder="Search Items" type="text" v-model="search" @input="onChange" @keydown.enter="onEnter" />
    
                </form>
            </div>
            
        </div><br />
    
    
    
    
        <table class="table table-hover table-bordered table-sm">
            <caption>List of _</caption>
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
                <template v-for="(post) in filtered_posts">
                    <tr  :key="post._id" data-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapse2">
                      <td>{{ post.title }}</td>
                      <td>{{post._id}}</td>
                      <td>{{ post.body }}</td>
                      <td><button><router-link :to="{name: 'edit', params: { id: post._id }}" class="btn btn-sm btn-light">Edit</router-link></button></td>
                      <td ><button class="btn-sm btn-danger" @click.prevent="deletePost(post._id)">Delete</button></td>
                      <td><button class="btn-sm btn-light" @click="toggle(post._id)" :class="{ opened: opened.includes(post._id) }">View Data</button></td>
                    </tr>
                  
                    <tr class='bg-light ' v-if="opened.includes(post._id)" :key="post._id">
                      <td colspan="6">{{post}}</td>
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
            posts: [],
            search: '',
            filtered_posts: [],
            componentKey: 0,
            isLoading: false,
            arrowCounter: 0,
            opened: []
        }
    },
    created() {
        let uri = 'http://localhost:4000/posts';
        this.axios.get(uri).then(response => {
            this.posts = response.data;
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
            this.filtered_posts = this.posts.filter((item) => {
                return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
            });
        },
        setResult(result) {
            this.search = filtered_posts;
            this.isOpen = false;
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.filtered_posts.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.filtered_posts[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        deletePost(id) {
            let uri = `http://localhost:4000/posts/delete/${id}`;
            this.axios.delete(uri).then(response => {
                // redownload and replace the posts obj like a fucking sane human being
                this.posts = []
                this.filtered_posts = []
                this.posts = response.data;
                this.onChange()
            }).then(this.filterResults()) // refill the sorted list, then rerender
            console.log(this.posts , this.filtered_posts)
        }
    },
    watch: {
        items: function(val, oldValue) {
            // actually compare them
            if (val.length !== oldValue.length) {
                this.filtered_posts = val;
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