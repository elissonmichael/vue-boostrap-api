const app = new Vue({
    el: "#app",
    data: {
      editCharacter: null,
      characters: [],
    },
    methods: {
      deleteCharacter(id, i) {
        fetch("http://localhost:3000/v1/characters/" + id, {
          method: "DELETE"
        })
        .then(() => {
          this.characters.splice(i, 1);
        })
      },
      updateCharacter(character) {
        fetch("http://localhost:3000/v1/characters/" + character.id, {
          body: JSON.stringify(character),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.editCharacter = null;
        })
      }
    },
    mounted() {
      fetch("http://localhost:3000/v1/characters")
        .then(response => response.json())
        .then((data) => {
          this.characters = data;
        })
    },
    template: `
    <tbody>
      <tr v-for="character, i in characters">
        <td>{{character.id}}</td>
        <td>{{character.name}}</td>
        <td>{{character.strength}}</td>
        <td>{{character.dexterity}}</td>
        <td>{{character.constitution}}</td>
        <td>{{character.intelligence}}</td>
        <td>{{character.wisdom}}</td>
        <td>{{character.charisma}}</td>
        <td>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <button class="btn btn-outline-danger" v-on:click="deleteCharacter(character.id, i)">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
    `,
});
