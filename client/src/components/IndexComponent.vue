<template>
    <div class='p-5' :key="componentKey">
    
        <h1>Recipes</h1>
        <br />

        <div class='row'>
        <div class='col'>
          <div class="ml-1 p-2 row bg-light d-inline-flex">
            <div class="col-md-10">
                <form class="form-inline md-form form-sm mt-0">
                    <input class='form-control form-control-sm  w-75' placeholder="Search Items" type="text" v-model="search" @input="onChange" @keydown.enter="onEnter" /> <br>
                    <p> Only show if ingredients are in stock <br>
                    <input type="checkbox"  v-model="only_in_stock_check" @input="onChange" @click="only_in_stock_check = !only_in_stock_check" > : {{ only_in_stock_check }}</p>
                </form> 
            </div>
        </div>
        <table class="table table-hover table-bordered table-sm">
            <caption>List of _</caption>
            <thead>
                <tr>
                    <th scope="col">Item</th>
                    <th scope="col">ID</th>
                    <th scope="col">Ingredients</th>
                    <th scope="col">Instructions</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col">View Data</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="recipe in filtered_recipes">
                  <tr  :key="recipe._id" data-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapse2">
                    <td>{{ recipe.name }}</td>
                    <td>{{recipe._id}}</td>
                    <td>{{ recipe.ingredients }}</td>
                    <td>{{ recipe.instructions }}</td>
                    <td><router-link :to="{name: 'edit', params: { id: recipe._id }}" class="btn btn-sm btn-dark">Edit</router-link></td>
                    <td ><button class=" btn btn-sm btn-danger" @click.prevent="deleteRecipe(recipe._id)">Delete</button></td>
                    <td><button class=" btn btn-sm btn-dark" @click="toggle(recipe._id)" :class="{ opened: opened.includes(recipe._id) }">View Data</button></td>
                  </tr>
                
                  <tr class='bg-light ' v-if="opened.includes(recipe._id)" :key="recipe._id">
                    <td colspan="6">{{recipe}}</td>
                  </tr>
                </template>
            </tbody>
        </table>
        </div>
        <div class='col'>
            <div class="ml-1 p-2 row bg-light d-inline-flex">
              <p>Kitchen Inventory</p>
            <div class="col-md-10 mb-5 p-1">
            </div>
        </div>
          <table class="table table-hover table-bordered table-sm">
            <caption>List of _</caption>
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Name</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(value, name, index) in kitchen">
                  <tr  :key="name" data-toggle="collapse" href="#collapse2" role="button" aria-expanded="false" aria-controls="collapse2">
                    <td>{{ value }}</td>
                    <td>{{name}}</td>
                    <td>{{ index}}</td><!--
                    <td><router-link :to="{name: 'edit', params: { id: name }}" class="btn btn-sm btn-dark">Edit</router-link></td>
                    <td ><button class=" btn btn-sm btn-danger" @click.prevent="deleteRecipe(name)">Delete</button></td>
                    <td><button class=" btn btn-sm btn-dark" @click="toggle(recipe._id)" :class="{ opened: opened.includes(name) }">View Data</button></td>-->
                  </tr>
                
                  <tr class='bg-light ' v-if="opened.includes(name)" :key="name">
                    <td colspan="6">{{name}}</td>
                  </tr>
                </template>
            </tbody>
        </table>
        </div>
        </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            recipes: [],
            only_in_stock_check:false,
            search: '',
            filtered_recipes: [],
            componentKey: 0,
            isLoading: false,
            arrowCounter: 0,
            opened: [],
            kitchen: { 'potato': 1, 'tomato': 2, 'cabbage': 2, 'beef': 1, 'noodles': 1 },
        }
    },
    created() {
        let uri = 'http://73.240.171.135:65501/recipe';
        this.axios.get(uri).then(response => {
            this.recipes = response.data;
            this.onChange();
        });
    },
    methods: {
        checkKitchen(ingredient_arr) {
            ingredient_arr.forEach(function(item, index) { // clean inputs just in case
                if (typeof(ingredient_arr[index]) == 'string') ingredient_arr[index] = ingredient_arr[index].trim()
            })
            let kitchen_arr = Object.keys(this.kitchen); // Gives us an array to loop through as the kitchen is an obj
            return ingredient_arr.every(ingredient => kitchen_arr.includes(ingredient)); // Returns true if every ingredient from the recipe is found within the kitchen array
        },
        toggle(id) {
            const index = this.opened.indexOf(id);
            if (index > -1) {
                this.opened.splice(index, 1)
            } else {
                this.opened.push(id)
            }
        },
        filterResults() {
            this.filtered_recipes = this.recipes.filter((recipe) => {
                let search = recipe.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
                let check = this.checkKitchen(recipe.ingredients)
                let result  = this.only_in_stock_check ? result = check && search : result = search
                return result
            });
        },
        setResult(result) {
            this.search = filtered_recipes;
            this.isOpen = false;
        },
        onArrowDown(evt) {
            if (this.arrowCounter < this.filtered_recipes.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            this.search = this.filtered_recipes[this.arrowCounter];
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        handleClickOutside(evt) {
            if (!this.$el.contains(evt.target)) {
                this.isOpen = false;
                this.arrowCounter = -1;
            }
        },
        onChange() {
            // Let's warn the parent that a change was made
            this.$emit('input', this.search);
            this.$emit('input', this.only_in_stock_check);
console.log(this.only_in_stock_check)
            // Is the data given by an outside ajax request?
            if (this.isAsync) {
                this.filterResults();
                this.isLoading = true;
            } else {
                // Let's  our flat array
                this.filterResults();
                this.isOpen = true;
            }
        },
        deleteRecipe(id) {
            let uri = `http://73.240.171.135:65501/recipe/delete/${id}`;
            this.axios.delete(uri).then(response => {
                // redownload and replace the recipes obj like a fucking sane human being
                this.recipes = []
                this.filtered_recipes = []
                this.recipes = response.data;
                this.onChange()
            }).then(this.filterResults()) // refill the sorted list, then rerender
            console.log(this.recipes, this.filtered_recipes)
        }
    },
    watch: {
        items: function(val, oldValue) {
            // actually compare them
            if (val.length !== oldValue.length) {
                this.filtered_recipes = val;
                this.isLoading = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    
}
</script>