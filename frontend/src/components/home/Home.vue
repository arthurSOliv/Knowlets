<template>
    <div class="home">
        <PageTitle 
            icon="fa fa-home"
            main="Dashboard"
            sub="Lista das empresas, produtos e serviços"
        />
        <List />
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle';
import List from './List';

export default {
    name: 'Home',
    components: {PageTitle, List}
}
</script>

<style>

</style>