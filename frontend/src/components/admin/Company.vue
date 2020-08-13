<template>
    <div class="company-admin">
        <b-form>
            <input type="hidden" id="company-id" v-model="company.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="company-name">
                        <b-form-input id="company-name" type="text"
                            v-model="company.name" required
                            placeholder="Informe o nome da Empresa" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CNPJ:" label-for="company-cnpj">
                        <b-form-input id="company-cnpj" type="text"
                            v-model="company.cnpj" required
                            placeholder="Informe o CNPJ da Empresa" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'create'" @click="saveCompany">Salvar</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="companies" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCompanyFromTable(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="removeCompany(data.item)" class="mr-2">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, showError } from '@/global';

export default {
    name: 'Company',
    data: function() {
        return {
            mode: 'create',
            company: {},
            companies: [],
            fields: [
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'cnpj', label: 'CNPJ', sortable: true},
                {key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadCompany() {
            const url = `${baseApiUrl}/company/5`;
            axios.get(url).then(res => {
                this.companies = res.data;
                this.companies.map(comp => {
                    delete comp.userId;
                });
            })
        },
        reset() {
            this.mode = 'create';
            this.company = {};
            this.loadCompany();
        },
        saveCompany() {
            const method = this.company.id ? 'put' : 'post';
            const id = this.company.id ? `/${this.company.id}` : '/5';
            axios[method](`${baseApiUrl}/company${id}`, this.company)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        removeCompany(company) {
            this.company = { ...company };
            const id = this.company.id;
            axios.delete(`${baseApiUrl}/company/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        loadCompanyFromTable(company) {
            this.company = { ...company };
        }
    },
    mounted() {
        this.loadCompany();
    }
}
</script>

<style>
    table{
        background-color: #aec8f7;
    }
</style>