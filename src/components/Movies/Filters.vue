<template>
  <b-row class="item-align-center">
    <b-col lg="4" class="mb-3 mb-lg-0">
      <b-input-group class="float-left w-auto">
        <b-input-group-prepend>
          <b-input-group-text>Sort by:</b-input-group-text>
        </b-input-group-prepend>
        <b-input-group-append>
          <b-dropdown :text="sortFieldTitle" variant="primary">
            <b-dropdown-item
              @click="setSortField(field.value, field.title)"
              v-for="(field, index) in sortFields"
              :key="index"
            >{{ field.title }}</b-dropdown-item>
          </b-dropdown>
        </b-input-group-append>
      </b-input-group>

      <b-button-group class="mx-2 float-left">
        <b-button
          :pressed="sortProps.direction === 'asc'"
          variant="primary"
          @click="setSortDirection('asc')"
        >
          <font-awesome-icon icon="caret-up"/>
        </b-button>
        <b-button
          :pressed="sortProps.direction === 'desc'"
          variant="primary"
          @click="setSortDirection('desc')"
        >
          <font-awesome-icon icon="caret-down"/>
        </b-button>
      </b-button-group>
    </b-col>
    <b-col lg="5" class="mb-3 mb-lg-0">
      <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text>Filter by:</b-input-group-text>
          <b-dropdown :text="filterFieldTitle" variant="primary">
            <b-dropdown-item
              @click="setFilter(field.value, field.title)"
              v-for="(field, index) in filterFields"
              :key="index"
            >{{ field.title }}</b-dropdown-item>
          </b-dropdown>
        </b-input-group-prepend>
        <b-form-input
          type="text"
          placeholder="Filter value"
          v-model="filterProps.searchText"
          @input="setFilterSearchText"
        />
        <b-input-group-append>
          <b-button
            variant="primary"
            @click="clearSearchText()"
            :disabled="!filterProps.searchText.length"
          >Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-col>
    <b-col class="text-lg-right">
      <div class="custom-control custom-checkbox mb-3 mt-1">
        <input
          @change="setOnlyFavoritesFilter()"
          class="custom-control-input"
          type="checkbox"
          value
          v-model="checkedProps.isFavorite"
          id="isFavoriteCheck"
        >
        <label class="custom-control-label" for="isFavoriteCheck">Show only favorite</label>
      </div>
    </b-col>
  </b-row>
</template>

<script>
const CHANGE_PROPS = "changeProps";

export default {
  name: "Filters",
  props: {
    filterFields: Array
  },
  data() {
    return {
      sortProps: {
        by: null,
        direction: "asc",
        desc: false
      },
      sortFields: [
        { title: "Default", value: null },
        { title: "Title", value: "title" },
        { title: "Year", value: "year" },
        { title: "Director", value: "director" }
      ],
      sortFieldTitle: "Default",
      filterProps: {
        by: "all",
        searchText: ""
      },
      filterFieldTitle: "All",
      checkedProps: {
        isFavorite: 0
      },
      onlyFavorite: false
    };
  },
  methods: {
    setSortField(field, title) {
      this.sortProps.by = field
      this.sortFieldTitle = title
      this.emitChangeProps();
    },
    setSortDirection(direction) {
      this.sortProps.direction = direction
      this.sortProps.desc = !this.sortProps.desc
      this.emitChangeProps()
    },
    setFilter(field, title) {
      this.filterProps.by = field
      this.filterFieldTitle = title
      this.emitChangeProps()
    },
    setFilterSearchText() {
      this.emitChangeProps()
    },
    clearSearchText() {
      this.filterProps.searchText = ""
      this.setFilterSearchText()
    },
    setOnlyFavoritesFilter() {
      this.emitChangeProps()
    },
    emitChangeProps() {
      this.$emit(CHANGE_PROPS, this.sortProps, this.filterProps, this.checkedProps)
    }
  },
  computed: {}
};
</script>


