// CreateComponent.vue

<template>
    <div>
        <h1>Create An Item</h1>
        
        <form class="needs-validation" novalidate @submit.prevent="addRecipe">
          <button>GenSome</button><button v-on:click="validateForm()">Test Validation</button>
        <hr>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Recipe name" value="Mark" required v-model="recipe.name" >
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter a value please. 
                    </div>
                </div>
            </div>
            
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <input class="form-control" id="validationCustom03" placeholder="Add an ingredient then click enter to add to list" v-model='recipe.ingredients' required>
                    
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter a value please.
                    </div>
                </div>
            </div>

            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <input type="text" class="form-control" id="validationCustom03" placeholder="Recipe Instructions" v-model="recipe.instructions" required>
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter a value please.
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" type="submit" v-on:click="validateForm()">Submit form</button>
            {{recipe}}
        </form>

    </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition-property: opacity;
    transition-duration: .2s;
}
.fade-enter-active {
    transition-delay: .2s;
}
.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>

<script>
export default {
    data() {
        return {
            new_recipe_temp_ingredient:'',
            new_recipe_ingredient_buffer:[],
            recipe: {
                name: '',
                ingredients: [],
                instructions:['']
            }
        }
    },
    methods: {
        pushNew(input){
            input = input.toLowerCase().trim()
            this.recipe.ingredients.push(input)
            console.log(this.recipe.ingredients, input)
        },
        addRecipe() {
            let uri = 'http://73.240.171.135:65501/recipe/add';
            this.recipe != {} ? this.axios.post(uri, this.recipe) : console.log('I require data')
            this.recipe = {
                name: '',
                ingredients: [''],
                instructions:['']
            }
        },
        validateForm() {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }
    },
}
</script>

