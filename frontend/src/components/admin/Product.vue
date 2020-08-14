<template>
    <div class="product-admin">
        <b-form>
            <input type="hidden" id="product-id" v-model="product.id" />
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="product-name">
                        <b-form-input id="product-name" type="text"
                            v-model="product.name" required
                            :class="error.includes('name') ? 'error' : ''"
                            @change="treatError('name')"
                            placeholder="Informe o nome do Produto" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                  <b-form-group label="Empresa:" label-for="product-company">
                    <b-form-select id="product-name" 
                      v-model="product.companyId" required
                      :class="error.includes('company') ? 'error' : ''"
                      @change="treatError('company')"
                      :options="options"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'create'" @click="saveProduct">Salvar</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="products" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadProductFromTable(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="removeProduct(data.item)" class="mr-2">
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
    name: 'Product',
    data: function() {
        return {
            mode: 'create',
            error: [],
            product: {},
            products: [],
            companiesList: [],
            fields: [
                {key: 'name', label: 'Produto', sortable: true},
                {key: 'id', label: 'ID', sortable: true},
                {key: 'companyId', label: 'Empresa', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            options: []
        }
    },
    methods: {
        loadCompany() {
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const url = `${baseApiUrl}/company/${userId}`;
            axios.get(url).then(res => {
                this.companiesList = res.data;
                this.companiesList.map(comp => {
                    const obj = {value: comp.id, text: comp.name};
                    this.options.push(obj);
                });
            })
        },
        loadProduct() {
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const url = `${baseApiUrl}/product/${userId}`;
            axios.get(url).then(res => {
                this.products = res.data;
            })
        },
        reset() {
            this.mode = 'create';
            this.product = {};
            this.loadProduct();
        },
        saveProduct() {
            if (!this.product.name) {
                this.error.push('name');
                return;
            }
            if (!this.product.companyId) {
                this.error.push('company');
                return;
            }
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const method = this.product.id ? 'put' : 'post';
            const id = this.product.id ? `/${this.product.id}` : `/${userId}/${this.product.companyId}`;
            axios[method](`${baseApiUrl}/product${id}`, this.product)
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
        removeProduct(product) {
            this.product = { ...product };
            const id = this.product.id;
            axios.delete(`${baseApiUrl}/product/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        loadProductFromTable(product) {
            delete product.company;
            this.product = { ...product };
        }
    },
    mounted() {
      this.loadCompany();
      this.loadProduct();
    }
}
</script>

<style>
    table{
        background-color: #aec8f7;
    }
</style>