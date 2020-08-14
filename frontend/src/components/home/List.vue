<template>
    <b-container>
        <b-row>
            <b-col class="col-md-6" v-for="user in users" :key="user.id">
                <b-card-group deck>
                    <b-card header="Cardss with list group">
                        <b-list-group>
                            <b-list-group-item class="company">{{ user.email }}</b-list-group-item>
                            <b-list-group>
                                <b-list-group-item>
                                    <p class="name">Cras justo odio</p>
                                    <span class="description">Cras justo odio</span>
                                </b-list-group-item>
                                <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
                                <b-list-group-item>Morbi leo risus</b-list-group-item>
                                <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
                                <b-list-group-item>Vestibulum at eros</b-list-group-item>
                            </b-list-group>
                        </b-list-group>
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
import { baseApiUrl } from '@/global';

export default {
    name: 'List',
    data: function() {
        return {
            users: {}
        }
    },
    methods: {
        getUsers() {
            axios.get(`${baseApiUrl}/users/1`).then(res => {
                this.users = res.data;
            })
        }
    },
    mounted() {
        this.getUsers();
    }
}
</script>

<style>
    .col-md-6{
        margin-bottom: 20px;
    }f
    .card{
        -webkit-box-shadow: 9px 14px 17px -7px rgba(0,0,0,0.75);
        -moz-box-shadow: 9px 14px 17px -7px rgba(0,0,0,0.75);
        box-shadow: 9px 14px 17px -7px rgba(0,0,0,0.75);
    }

    .card-header{
        font-size: 1.6rem;
        background-color: #4c84ea;
    }

    .company{
        font-size: 1.3rem;
        background-color: #769fea;
    }

    .name{
        font-size: 1.1rem;
        font-weight: bold;
        padding: 10px;
        background-color: #b0d1ec;
    }

    .description{
        font-size: 1rem;
    }
</style>