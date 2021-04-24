package eu.debec.api;


import eu.debec.api.model.Coordinate;
import eu.debec.api.service.CoordinateService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class CoordinateServiceTest {

    @Autowired
    private CoordinateService coordinateService;

    @Test
    public void testCalculateDistanceBetweenCoordinates() {
        Coordinate start = new Coordinate();
        start.setLongitude(0.0);
        start.setLatitude(0.0);
        Coordinate end = new Coordinate();
        end.setLongitude(42.42);
        end.setLatitude(42.42);
        Double distance = coordinateService.calculateDistanceBetweenCoordinates(start, end);
        int approximateDistance = 6335;
        Boolean isGoodApproximation = distance > approximateDistance * 0.99 && distance < approximateDistance * 1.01;
        Assertions.assertTrue(isGoodApproximation, "Expected");
    }
}
