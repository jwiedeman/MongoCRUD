// CreateComponent.vue

<template>
    <div>
        <h1>Create An Item</h1>
        
        <form class="needs-validation" novalidate @submit.prevent="addPost">
          <button v-on:click="validateForm()">GenSome</button><button v-on:click="validateForm()">Test Validation</button>
        <hr>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Item title" value="Mark" required v-model="post.title">
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter a value or mongo will kobain itself, please.
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <input type="text" class="form-control" id="validationCustom03" placeholder="Item Body" v-model="post.body">
                    <div class="valid-feedback">
                        optional
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" type="submit" v-on:click="validateForm()">Submit form</button>
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
            post: {
                title: '',
                body: ''
            }
        }
    },
    methods: {
        addPost() {
            let uri = 'http://localhost:4000/posts/add';
            console.log(this.post)
            this.post != {} ? this.axios.post(uri, this.post) : console.log('I require data')
        },
        validateForm() {



            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
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

