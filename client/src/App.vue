// App.vue

<template>
  <div class="">
    <nav class="navbar navbar-expand-sm bg-dark ">
      <ul class="navbar-nav">
        <li class=" btn btn-secondary ">
          <router-link to="/" class="nav-link text-light">Clients</router-link>
        </li>
        <li class=" btn btn-secondary">
          <router-link to="/create" class="nav-link text-light">Add Client</router-link>
        </li>
        
      </ul>
    </nav><br />
    <transition 
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
    .fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .15s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

<script>

    export default {
  name: 'App',
  data() {
    return {
      prevHeight: 0,
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
};
</script>