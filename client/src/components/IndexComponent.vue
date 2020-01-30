<template>
  <div :key="componentKey">
 
      <h1>Posts</h1>
        <div class="row">
          
          <div class="col-md-10">     
            <form class="form-inline md-form form-sm mt-0">
  <i class="fas fa-search" aria-hidden="true"></i>
 
     <input class='form-control form-control-sm ml-3 w-75' placeholder="Search Posts"
    type="text"
    v-model="search"
    @input="onChange"
    @keydown.down="onArrowDown"
    @keydown.up="onArrowUp"
    @keydown.enter="onEnter"
  />
  
</form>
</div>
<!-- redundant
          <div class="col-md-2">
            <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Post</router-link>
          </div>
-->
        </div><br />



      
        <table class="table table-hover">
            <thead>
            <tr>
              <th>Title</th>
              <th>ID</th>
              <th>Body</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody >
                <tr v-for="(post, i) in filtered_posts"   :key="post._id">

                  <td>{{ post.title }}</td>
                  <td>{{post._id}}</td>
                  <td>{{ post.body }}</td>
                  <td><router-link :to="{name: 'edit', params: { id: post._id }}" class="btn btn-primary">Edit</router-link></td>
                  <td><button class="btn btn-danger" @click.prevent="deletePost(post._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          posts: [],
          search:'',
          filtered_posts:[],
          componentKey: 0,
          isLoading: false,
          arrowCounter: 0,
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
      }, onArrowDown(evt) {
        if (this.arrowCounter < this.filtered_posts.length) {
          this.arrowCounter = this.arrowCounter + 1;
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter -1;
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
      deletePost(id){
        let uri = `http://localhost:4000/posts/delete/${id}`;
        this.axios.delete(uri).then(response => {
          // redownload and replace the posts obj like a fucking sane human being
           this.posts = response.data;
        });
      }
    },
    watch: {
      items: function (val, oldValue) {
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