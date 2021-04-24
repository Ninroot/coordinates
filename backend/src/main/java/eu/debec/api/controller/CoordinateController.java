package eu.debec.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import eu.debec.api.model.Coordinate;
import eu.debec.api.service.CoordinateService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:3000")
public class CoordinateController {

    @Autowired
    private CoordinateService coordinateService;

    /**
     * Create - Add a new coordinate
     * @param coordinate An object coordinate
     * @return The coordinate object saved
     */
    @PostMapping("/coordinates")
    public Coordinate createCoordinate(@RequestBody Coordinate coordinate) {
        return coordinateService.saveCoordinate(coordinate);
    }

    /**
     * Read - Get one coordinate
     * @param id The id of the coordinate
     * @return An Coordinate object full filled
     */
    @GetMapping("/coordinates/{id}")
    public Coordinate getCoordinate(@PathVariable("id") final Long id) {
        Optional<Coordinate> coordinate = coordinateService.getCoordinate(id);
        return coordinate.orElse(null);
    }

    /**
     * Update - Update one coordinate
     * @param id The id of the coordinate to be updated
     * @param coordinate An Coordinate object full filled
     * @return An Coordinate object full filled
     */
    @PutMapping("/coordinates/{id}")
    public Coordinate updateCoordinate(@PathVariable("id") final Long id, @RequestBody Coordinate coordinate) {
        return coordinateService.updateCoordinate(id, coordinate);
    }

    /**
     * Read - Get all coordinates
     * @return - An Iterable object of Coordinate full filled
     */
    @GetMapping("/coordinates")
    public Iterable<Coordinate> getCoordinates() {
        return coordinateService.getCoordinates();
    }


    /**
     * Delete - Delete an coordinate
     * @param id - The id of the coordinate to delete
     */
    @DeleteMapping("/coordinates/{id}")
    public void deleteCoordinate(@PathVariable("id") final Long id) {
        coordinateService.deleteCoordinate(id);
    }

    @GetMapping("/coordinates/distance/{start_id}/{end_id}")
    public ResponseEntity getDistanceBetweenCoordinates(@PathVariable("start_id") final Long start_id,
                                             @PathVariable("end_id") final Long end_id) {
        Optional<Coordinate> coordinate_start = coordinateService.getCoordinate(start_id);
        Optional<Coordinate> coordinate_end = coordinateService.getCoordinate(end_id);
        if(coordinate_start.isPresent() && coordinate_end.isPresent()) {
            Double distance = coordinateService.calculateDistanceBetweenCoordinates(
                    coordinate_start.get(),
                    coordinate_end.get());
            return ResponseEntity.ok(distance);
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(null);
    }
}