<template>
    <section class="container-fluid">
        <div>
            <div class="row">
                <Nvar />
            </div>
            <div class="row">
                <div class="col-6 p-4">
                    <CategoriaComponent :categoriasEntrantes="categorias" @agregar-categoria="abrirAgregarCategoria"
                        @informacion-categoria="abrirInformacionCategoria" @editar-categoria="abrirEditarCategoria"
                        @eliminar-categoria="eliminarCategoria" />
                </div>
                <div class="col-6 p-4">
                    <SubcategoriaComponent :subcategoriasEntrantes="subcategorias"
                        @agregar-subcategoria="abrirAgregarSubcategoria"
                        @informacion-subcategoria="abrirInformacionSubcategoria"
                        @editar-subcategoria="abrirEditarSubcategoria" @eliminar-subcategoria="eliminarSubcategoria" />
                </div>
            </div>
        </div>

    </section>
    <FormularioCategoria @guardar-categoria="agregarCategoria" ref="AgregarCategoria" />
    <FormularioSubcategoria @guardar-subcategoria="agregarSubcategoria" ref="AgregarSubcategoria" />
    <EditarCategoria :edicion="edicionCategoria" @editar-categoria="editarCategoria" ref="EditarCategoria" />
    <EditarSubcategoria :edicion="edicionSubcategoria" :categorias="categorias"
        @editar-subcategoria="editarSubcategoria" ref="EditarSubcategoria" />
</template>

<script>
import Nvar from '@/components/Nvar.vue';
import PrincipalCategoriasScript from './PrincipalCategoriasScript';
import CategoriaComponent from '@/components/Categoria/CategoriaComponent.vue';
import FormularioCategoria from '@/components/Categoria/FormularioCategoria.vue';
import EditarCategoria from '@/components/Categoria/EditarCategoria.vue';
import SubcategoriaComponent from '@/components/Subcategoria/SubcategoriaComponent.vue';
import FormularioSubcategoria from '@/components/Subcategoria/FormularioSubcategoria.vue';
import EditarSubcategoria from '@/components/Subcategoria/EditarSubcategoria.vue';

export default {
    ...PrincipalCategoriasScript,
    components: {
        Nvar,
        CategoriaComponent,
        FormularioCategoria,
        SubcategoriaComponent,
        FormularioSubcategoria,
        EditarCategoria,
        EditarSubcategoria,
    }
};
</script>