# General

<div>
    <Table
    :fields="fields"  Los nombres de las columnas
    :inputs="inputs" El formulario para los filtros
    :searchable="true" Indicamos si es una tabla con filtros
    :url="Routes.ROLES.INDEX" La url donde aplicara los filtros
    >
    <template v-slot:age="{data}">
      <div>
          {{ data.value }} hehe
      </div>
    </template>
    </Table>
  </div>

# Para celdas custom
NOTA IMPORTA: Usar prefijos para celdas y para filtros
<Table>
    <template v-slot:cell(nombre1)="{data}">
      <div>
          {{ data.value }}
      </div>
    </template>
    <template v-slot:cell(apellido2)="{data}">
      <div>
          {{ data.value }}
      </div>
    </template>
    <template v-slot:filter(apellido)="{data}">
      <div>
          <input placeholder="filtro custom" >
      </div>
    </template>
</Table>

# Loader

<Table>
    <template #table-busy>
        Aca manejo el loader
    </template>
</Table>