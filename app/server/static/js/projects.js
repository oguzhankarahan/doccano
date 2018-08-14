import Vue from 'vue';
import axios from 'axios';

const vm = new Vue({
  el: '#projects_root',
  delimiters: ['[[', ']]'],
  data: {
    items: [],
    selectedType: 'All',
    isActive: false,
  },

  methods: {
    get_projects() {
      const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
      axios.get(`${baseUrl}/api/projects`).then((response) => {
        this.items = response.data;
      });
    },

    updateSelectedType(type) {
      this.selectedType = type;
    },
  },

  computed: {
    uniqueProjectTypes() {
      const types = [];
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        types.push(item.project_type);
      }
      const uniqueTypes = Array.from(new Set(types));

      return uniqueTypes;
    },

    filteredProjects() {
      // filter projects
      const projects = [];
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        if ((this.selectedType === 'All') || (item.project_type === this.selectedType)) {
          projects.push(item);
        }
      }
      // create nested projects
      const nestedProjects = [];
      for (let i = 0; i < Math.ceil(projects.length / 3); i++) {
        const p = projects.slice(i * 3, (i + 1) * 3);
        nestedProjects.push(p);
      }
      return nestedProjects;
    },
  },

  created() {
    this.get_projects();
  },
});
