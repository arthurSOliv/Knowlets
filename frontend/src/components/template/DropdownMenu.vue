<template>
    <div class="user-dropdown">
        <div class="user-button">
          <span class="d-none d-sm-block">Admin</span>
          <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/home"><i class="fa fa-home"></i> Home</router-link>
            <router-link to="/admin"><i class="fa fa-cogs"></i> Administração</router-link>
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global';
export default {
    name: 'DropdownMenu',
    methods: {
        logout() {
            localStorage.removeItem(userKey);
            this.$store.commit('setUser', null);
            this.$router.push({ name: 'auth' });
        }
    }
}
</script>

<style>
    .user-dropdown {
        cursor: pointer;
        position: relative;
        height: 100%;
    }
    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }
    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }
    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }
    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }
    .user-dropdown-content a:hover {
        text-decoration: none;
        color: #000;
        background-color: #EDEDED;
    }
</style>