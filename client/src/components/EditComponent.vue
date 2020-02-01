<template>
  <div>
    <h1>Edit Item</h1>
    <p class='text-muted'></p>
    <form @submit.prevent="updateRecipe">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Item Title: </label>
            <input type="text" class="form-control" v-model="recipe.title">
          </div>
        </div>
            <div class="col-md-6">
          <div class="form-group">
            <label>Item _id: </label><p class='font-weight-light'>probably just never modify this :)</p>
            <input type="text" class="form-control" v-model="recipe._id">
          </div>
        </div>
        </div>
        
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>recipe Body: </label>
              <textarea class="form-control" v-model="recipe.body" rows="5"></textarea>
            </div>
          </div>
        </div><br />
        <div class="form-group">
          <button class="btn btn-primary">Update</button>
        </div>
    </form>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          recipe: {}
        }
      },
      created() {
        let uri = `http://73.240.171.135:65501/recipes/edit/${this.$route.params.id}`;
        this.axios.get(uri).then((response) => {
            this.recipe = response.data;
        });
      },
      methods: {
        updateRecipe() {
          let uri = `http://73.240.171.135:65501/posts/update/${this.$route.params.id}`;
          this.axios.post(uri, this.recipe).then(() => {
            this.$router.push({name: 'posts'});
          });
        }
      }
    }
</script>