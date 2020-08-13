<template>
  <div class="admin-pages">
      <PageTitle 
            icon="fa fa-cogs"
            main="Administração"
            sub="Adicionar empresas, produtos e serviços"
        />
        <div class="admin-pages-tabs">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="Empresa" active>
                <Company />
              </b-tab>
              <b-tab title="Produto">
                <Product />
              </b-tab>
              <b-tab title="Serviço">
                <Service />
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
  </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle';
import Company from './Company';
import Product from './Product';
import Service from './Service';

export default {
    name: 'AdminPages',
    components: { PageTitle, Company, Product, Service }
}
</script>

<style>
  .nav-item a{
    color: #333;
    text-decoration: none;
  }

  .active{
    outline: none !important;
  }
</style>