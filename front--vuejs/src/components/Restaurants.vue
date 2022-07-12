<template>

    <div class="hello">
        <h1>Restaurants</h1>

        <li :key="index" v-for="(restaurant, index) in restaurants">
            {{ restaurant.Id }}
            {{ restaurant.name }} {{ restaurant.city }} <button
                v-on:click="supprimerResto(restaurant.Id)">Supprimer</button><br>

            <span :key="index" v-for="employe, index in employes">
                <p v-if="restaurant.Id === employe.restaurant_id"> {{ employe.first_name }} <button
                        v-on:click="supprimerEmploye(employe.Id)">Supprimer</button> </p>
            </span>
        </li>

    </div>
</template>

<script>
// Charger la bibliothèque axios
import axios from "axios";

export default {
    name: 'Restaurants',
    data() {
        return {
            restaurants: null,
            employes: null
        }
    },
    mounted() {
        this.update()

    },
    methods: {

        update() {
            axios.get("http://127.0.0.1:5000/restaurants")

                .then(res => this.restaurants = res.data)
                .catch(error => this.restaurants = [{ "name": "Erreur de chargement" }])

            axios.get("http://127.0.0.1:5000/employes")

                .then(res => this.employes = res.data)
                .catch(error => this.employes = [{ "name": "Erreur de chargement" }])
        },

        supprimerResto(id) {
            console.log(id);
            axios.delete("http://127.0.0.1:5000/restaurants/" + id);
            this.update();
        },
        supprimerEmploye(id_employe) {
            console.log(id_employe);
            axios.delete("http://127.0.0.1:5000/employe/" + id_employe);
            this.update();
        },
    }




}
</script>

<style>
</style>