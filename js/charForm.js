const apiUrl = 'http://localhost:3000/v1/characters';

const form = new Vue({
  el:'#charForm',
  data:{
    errors:[],
    name: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
  },
  methods:{
    checkForm:function(e) {
      e.preventDefault();
      this.errors = [];
      if(this.name === '') {
        this.errors.push("Name is Required.");
      } else {
        fetch(`${apiUrl}?character[name]=${this.name}
          &character[strength]=${this.strength}
          &character[dexterity]=${this.dexterity}
          &character[constitution]=${this.constitution}
          &character[intelligence]=${this.intelligence}
          &character[wisdom]=${this.wisdom}
          &character[charisma]=${this.charisma}`, { method: "POST" })
        .then(res => res.json())
        .then(res => {
          if(res.errors) {
            this.errors.push(res.errors);
          } else {
            window.location.replace("index.html");
          }
        });
      }
    }
  }
})
