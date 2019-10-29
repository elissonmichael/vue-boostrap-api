const app = new Vue({
    el: "#charactersTable",
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
      },
      createCharacter() {
        fetch("http://localhost:3000/v1/characters/new", {
          body: JSON.stringify(character),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        <template v-if="editCharacter === character.id">
          <td colspan="2"><input class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.name" /></td>
          <td><input type='number' class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.strength" /></td>
          <td><input type='number' class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.dexterity" /></td>
          <td><input type='number' class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.constitution" /></td>
          <td><input type='number' class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.intelligence" /></td>
          <td><input type='number' class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.wisdom" /></td>
          <td><input type='number' class="form-control" v-on:keyup.13="updateCharacter(character)" v-model="character.charisma" /></td>
          <td>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <button class="btn btn-outline-info" v-on:click="updateCharacter(character)">Save</button>
            </div>
          </td>
        </template>
        <template v-else>
          <td colspan="2">{{character.name}}</td>
          <td>{{character.strength}}</td>
          <td>{{character.dexterity}}</td>
          <td>{{character.constitution}}</td>
          <td>{{character.intelligence}}</td>
          <td>{{character.wisdom}}</td>
          <td>{{character.charisma}}</td>
          <td>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <button class="btn btn-outline-primary" v-on:click="editCharacter = character.id">Edit</button>
              <button class="btn btn-outline-danger" v-on:click="deleteCharacter(character.id, i)">Delete</button>
            </div>
          </td>
        </template>
      </tr>
    </tbody>
    `,
});
