package eu.debec.api.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import eu.debec.api.model.Coordinate;

@Repository
public interface CoordinateRepository extends CrudRepository<Coordinate, Long> {

}