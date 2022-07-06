<template>
  <div id="nav">
    <router-link to="/">Index</router-link>
    <router-link to="/posts">Posts</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Comic Sans MS", sans-serif;
}

body {
  background: rgba(#000, .8);
}

#nav {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  a {
    font-size: 20px;
    color: #fff;
    display: inline-block;
    margin: 0 10px;
  }
}

.router-link-exact-active {
  color: #000 !important;
}
</style>
