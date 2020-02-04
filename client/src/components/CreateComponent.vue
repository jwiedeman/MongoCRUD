// CreateComponent.vue

<template>
    <div>
        <h1>Add a client</h1>
        
        <form class="needs-validation" novalidate @submit.prevent="addClient">
          <button v-on:click="validateForm()">Test Form Validation</button>
        <hr>
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Client Name" value="Mark" required v-model="client.client_name">
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter a value please.
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Client URL" value="Mark" required v-model="client.temp_url">
                    <button class="btn btn-outline-dark" @click='client.url.push(client.temp_url)'>Add url</button>

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
                    <input type="text" class="form-control" id="validationCustom01" placeholder="Business Name" value="Mark" required v-model="client.business_name">
                    <div class="valid-feedback">
                        Looks good!
                    </div>
                    <div class="invalid-feedback">
                        Enter a value please.
                    </div>
                </div>
                <div class="col-md-4 mb-3">
                    {{client.url}}
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
            temp_url:'',
            client: {
                        "client_name": "",
                        "business_name": "",
                        "url": [],
                        "url_protocol":"",
                        "last_crawl_date": "",
                        "sitemap": [],
                        "crawl_history": [],
                        "sitemap_generated":"",
                        "sitemap_last_refresh": ""
                        }
        }
    },
    methods: {
        addClient() {
            let uri = 'http://localhost:4000/clients/add';
            this.client != {} ? this.axios.client(uri, this.client) : console.log('Fill out the form')
            this.client = {
                        "client_name": "",
                        "business_name": "",
                        "url": "",
                        "url_protocol":"",
                        "last_crawl_date": "",
                        "sitemap": [],
                        "crawl_history": [],
                        "sitemap_generated":"",
                        "sitemap_last_refresh": ""
                        }
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

