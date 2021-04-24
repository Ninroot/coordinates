Vous devez créer une IHM sur le framework de votre choix (React, Angular ou Vue). Cette IHM doit contenir deux champs numériques permettant à l'utilisateur de saisir une position GPS sous forme de latitude / longitude (Exemple : Lat = 48.862725 et Long = 2.287592).
Ces deux valeurs doivent être envoyés à un webservice REST basé sur Java 11, Spring Boot (https://start.spring.io/) pour être sauvegardé dans une base de données de votre choix (MySQL, PostgresSQL, MongoDB etc.).
Les valeurs saisies doivent être visibles dans l'IHM dans un tableau et pour chaque entrée enregistrée il doit être possible de supprimer l'entrée.
Il faut ajouter une API REST qui permet de donner la distance en km entre deux positions GPS enregistrées en base de données. Pour cette fonctionnalité, il n'est pas demandé de mettre en place d'interface.

# Coordinate

The coordinate component is in charge of managing the addition or deletion of GPS coordinates as well as providing operations. It relies on:

- A [backend](./backend/README.md)
- A [fronted](./frontend/README.md)

# TODO

1. Successfull POST new coordinate returns 200 status code. It should return 201.
1. Add swagger to describe backend API.
1. Very precise coordinate entries are rounded (ex: "123456789.123456789")
1. Wrapp applications into Dockerfiles.
1. Parameterize CORS.