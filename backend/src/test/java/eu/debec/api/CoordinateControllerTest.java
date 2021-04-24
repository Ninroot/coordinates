package eu.debec.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.io.UnsupportedEncodingException;


@SpringBootTest
@AutoConfigureMockMvc
public class CoordinateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    public ResultActions addCoordinate(Double longitude, Double latitude) throws Exception {
        return mockMvc.perform(post("/api/v1/coordinates")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"longitude\": " + longitude + ", \"latitude\": " + latitude + "}"));
    }

    public String getCoordinateIdFromMvcResult(MvcResult mvcResult) throws UnsupportedEncodingException {
        String jsonString = mvcResult.getResponse().getContentAsString();
        Object dataObject = JsonPath.parse(jsonString).read("$.id");
        return dataObject.toString();
    }

    @Test
    public void testGetCoordinates() throws Exception {
        addCoordinate(42.42, 42.42);
        mockMvc.perform(get("/api/v1/coordinates"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.[0].longitude").value("42.42"));
    }

    @Test
    public void testGetCoordinate() throws Exception {
        MvcResult result = addCoordinate(43.43, 43.43).andExpect(status().isOk()).andReturn();
        String id = getCoordinateIdFromMvcResult(result);

        mockMvc.perform(get("/api/v1/coordinates/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.longitude").value("43.43"));
    }

    @Test
    public void testAddCoordinate() throws Exception {
        addCoordinate(12345678.12345678, 12345678.12345678)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.longitude").value("12345678.12345678"));
    }

    @Test
    public void testDeleteCoordinate() throws Exception {
        MvcResult result = addCoordinate(43.43, 43.43).andExpect(status().isOk()).andReturn();
        String id = getCoordinateIdFromMvcResult(result);

        mockMvc.perform(delete("/api/v1/coordinates/" + id))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetDistance() throws Exception {
        MvcResult result = addCoordinate(43.43, 43.43).andExpect(status().isOk()).andReturn();
        String id_start = getCoordinateIdFromMvcResult(result);
        result = addCoordinate(43.43, 43.43).andExpect(status().isOk()).andReturn();
        String id_end = getCoordinateIdFromMvcResult(result);

        mockMvc.perform(get("/api/v1/coordinates/distance/" + id_start + "/" + id_end))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetDistanceFromNonExistingCoordinate() throws Exception {
        mockMvc.perform(get("/api/v1/coordinates/distance/0/-1"))
                .andExpect(status().is4xxClientError());
    }
}