<template>
    <div class="company-admin">
        <b-form>
            <input type="hidden" id="company-id" v-model="company.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="company-name">
                        <b-form-input id="company-name" type="text"
                            v-model="company.name" required
                            placeholder="Informe o nome da Empresa"
                            :class="error.includes('name') ? 'error' : ''"
                            @change="treatError('name')"
                        />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="CNPJ:" label-for="company-cnpj">
                        <b-form-input id="company-cnpj" type="text"
                            v-mask="['##.###.###/####-##']"
                            maxlength="18"
                            :class="error.includes('cnpj') ? 'error' : ''"
                            @change="treatError('cnpj')"
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
            error: [],
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
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const url = `${baseApiUrl}/company/${userId}`;
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
            if (!this.company.name) {
                this.error.push('name');
                return;
            }
            if (!this.company.cnpj) {
                this.error.push('cnpj');
                return;
            }
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const method = this.company.id ? 'put' : 'post';
            const id = this.company.id ? `/${this.company.id}` : `/${userId}`;
            this.company.cnpj = this.company.cnpj.replace(/[^a-zA-Z0-9 ]/g, "");
            axios[method](`${baseApiUrl}/company${id}`, this.company)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        treatError(err){
            var index = this.error.indexOf(err);
            if (index > -1) {
                this.error.splice(index, 1);
            }
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
    .error{
        outline: red solid 4px;
    }
</style>