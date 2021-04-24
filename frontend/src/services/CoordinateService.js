import axios from 'axios';

const COORDINATE_API_BASE_URL = "http://localhost:8080/api/v1/coordinates";

class CoordinateService {

    getCoordinates(){
        return axios.get(COORDINATE_API_BASE_URL);
    }

    createCoordinate(coordinate){
        return axios.post(COORDINATE_API_BASE_URL, coordinate);
    }

    getCoordinateById(coordinateId){
        return axios.get(COORDINATE_API_BASE_URL + '/' + coordinateId);
    }

    updateCoordinate(coordinate, coordinateId){
        return axios.put(COORDINATE_API_BASE_URL + '/' + coordinateId, coordinate);
    }

    deleteCoordinate(coordinateId){
        return axios.delete(COORDINATE_API_BASE_URL + '/' + coordinateId);
    }
}

export default new CoordinateService()