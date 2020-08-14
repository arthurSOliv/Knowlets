<template>
    <div class="service-admin">
        <b-form>
            <input type="hidden" id="service-id" v-model="service.id" />
            <b-row>
                <b-col md="12" sm="12">
                    <b-form-group label="Nome:" label-for="service-name">
                        <b-form-input id="service-name" type="text"
                            v-model="service.name" required
                            :class="error.includes('name') ? 'error' : ''"
                            @change="treatError('name')"
                            placeholder="Informe o nome do Produto" />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                  <b-form-group label="Empresa:" label-for="service-company">
                    <b-form-select id="service-company" @change="loadProduct()" 
                      v-model="service.companyId" required 
                      :class="error.includes('company') ? 'error' : ''"
                      :options="optionsCompany"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                  <b-form-group label="Produto:" label-for="service-product">
                    <b-form-select id="service-product" 
                      v-model="service.productId" required 
                      :class="error.includes('product') ? 'error' : ''"
                      @change="treatError('product')"
                      :options="optionsProduct"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col md="12" sm="12">
                  <b-form-textarea
                    class="mb-3"
                    id="textarea"
                    v-model="service.description"
                    placeholder="Uma breve descrição do serviço..."
                    :class="error.includes('description') ? 'error' : ''"
                    @change="treatError('description')"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'create'" @click="saveService">Salvar</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="services" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadServicesFromTable(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="removeService(data.item)" class="mr-2">
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
    name: 'service',
    data: function() {
        return {
            mode: 'create',
            error: [],
            service: {},
            services: [],
            found: {},
            companiesList: [],
            productsList: [],
            fields: [
                {key: 'name', label: 'Produto', sortable: true},
                {key: 'description', label: 'Descrição', sortable: true},
                {key: 'id', label: 'ID', sortable: true},
                {key: 'productId', label: 'Produto', sortable: true},
                {key: 'companyId', label: 'Empresa', sortable: true},
                {key: 'actions', label: 'Ações'}
            ],
            optionsCompany: [],
            optionsProduct: []
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
                    this.optionsCompany.push(obj);
                });
            })
        },
        loadProduct() {
          this.optionsProduct = [];
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const url = `${baseApiUrl}/product/${userId}`;
            axios.get(url).then(res => {
                this.productsList = res.data;
                this.productsList.map(comp => {
                    const obj = {value: comp.id, text: comp.name};
                    this.optionsProduct.push(obj);
                });
            })
            this.treatError('company');
        },
        loadServices() {
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const url = `${baseApiUrl}/service/${userId}`;
            axios.get(url).then(res => {
                this.services = res.data;
            })
        },
        reset() {
            this.mode = 'create';
            this.service = {};
            this.loadServices();
        },
        saveService() {
            if (!this.service.name) {
                this.error.push('name');
                return;
            }
            if (!this.service.companyId) {
                this.error.push('company');
                return;
            }
            if (!this.service.productId) {
                this.error.push('product');
                return;
            }
            if (!this.service.description) {
                this.error.push('description');
                return;
            }
            const userId = JSON.parse(localStorage.__knowledge_user).id;
            const method = this.service.id ? 'put' : 'post';
            const id = this.service.id ? `/${this.service.id}` : `/${userId}/${this.service.companyId}/${this.service.productId}`;
            axios[method](`${baseApiUrl}/service${id}`, this.service)
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
        removeService(service) {
            this.service = { ...service };
            const id = this.service.id;
            axios.delete(`${baseApiUrl}/service/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess();
                    this.reset();
                })
                .catch(showError);
        },
        loadServicesFromTable(service) {
            delete service.company;
            this.service = { ...service };
        }
    },
    mounted() {
      this.loadCompany();
      this.loadServices();
    }
}
</script>

<style>
    table{
        background-color: #aec8f7;
    }
</style>