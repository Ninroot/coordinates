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