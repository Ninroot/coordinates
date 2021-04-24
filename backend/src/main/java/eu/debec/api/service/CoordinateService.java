package eu.debec.api.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import eu.debec.api.model.Coordinate;
import eu.debec.api.repository.CoordinateRepository;

import lombok.Data;

@Data
@Service
public class CoordinateService {

    @Autowired
    private CoordinateRepository coordinateRepository;

    public Optional<Coordinate> getCoordinate(final Long id) {
        return coordinateRepository.findById(id);
    }

    public Iterable<Coordinate> getCoordinates() {
        return coordinateRepository.findAll();
    }

    public void deleteCoordinate(final Long id) {
        coordinateRepository.deleteById(id);
    }

    public Coordinate saveCoordinate(Coordinate coordinate) {
        Coordinate savedCoordinate = coordinateRepository.save(coordinate);
        return savedCoordinate;
    }

    public Coordinate updateCoordinate(final Long id, Coordinate coordinate) {
        Optional<Coordinate> coordinateToBeUpdated = coordinateRepository.findById(id);
        if(coordinateToBeUpdated.isPresent()) {
            coordinateToBeUpdated.get().setLatitude(coordinate.getLatitude());
            coordinateToBeUpdated.get().setLongitude(coordinate.getLongitude());
            saveCoordinate(coordinateToBeUpdated.get());
            return coordinateToBeUpdated.get();
        }
        return null;
    }

    /**
     * Approximate distance between two points using the Haversine formula.
     * @param start coordinate An object coordinate
     * @param end coordinate An object coordinate
     * @return The approximate distance between two points in Km.
     */
    public double calculateDistanceBetweenCoordinates(Coordinate start, Coordinate end) {
        final int EARTH_RADIUS = 6371;

        double dLat  = Math.toRadians((end.getLatitude() - start.getLatitude()));
        double dLong = Math.toRadians((end.getLongitude() - start.getLongitude()));

        double startLat = Math.toRadians(start.getLatitude());
        double endLat   = Math.toRadians(end.getLatitude());

        double a = haversin(dLat) + Math.cos(startLat) * Math.cos(endLat) * haversin(dLong);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    public static double haversin(double val) {
        return Math.pow(Math.sin(val / 2), 2);
    }
}