package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.ScenarioService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.service.dto.ScenarioDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Scenario.
 */
@RestController
@RequestMapping("/api")
public class ScenarioResource {

    private final Logger log = LoggerFactory.getLogger(ScenarioResource.class);

    private static final String ENTITY_NAME = "scenario";

    private final ScenarioService scenarioService;

    public ScenarioResource(ScenarioService scenarioService) {
        this.scenarioService = scenarioService;
    }

    /**
     * POST  /scenarios : Create a new scenario.
     *
     * @param scenarioDTO the scenarioDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scenarioDTO, or with status 400 (Bad Request) if the scenario has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/scenarios")
    @Timed
    public ResponseEntity<ScenarioDTO> createScenario(@Valid @RequestBody ScenarioDTO scenarioDTO) throws URISyntaxException {
        log.debug("REST request to save Scenario : {}", scenarioDTO);
        if (scenarioDTO.getId() != null) {
            throw new BadRequestAlertException("A new scenario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScenarioDTO result = scenarioService.save(scenarioDTO);
        return ResponseEntity.created(new URI("/api/scenarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /scenarios : Updates an existing scenario.
     *
     * @param scenarioDTO the scenarioDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scenarioDTO,
     * or with status 400 (Bad Request) if the scenarioDTO is not valid,
     * or with status 500 (Internal Server Error) if the scenarioDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/scenarios")
    @Timed
    public ResponseEntity<ScenarioDTO> updateScenario(@Valid @RequestBody ScenarioDTO scenarioDTO) throws URISyntaxException {
        log.debug("REST request to update Scenario : {}", scenarioDTO);
        if (scenarioDTO.getId() == null) {
            return createScenario(scenarioDTO);
        }
        ScenarioDTO result = scenarioService.save(scenarioDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scenarioDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /scenarios : get all the scenarios.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scenarios in body
     */
    @GetMapping("/scenarios")
    @Timed
    public List<ScenarioDTO> getAllScenarios() {
        log.debug("REST request to get all Scenarios");
        return scenarioService.findAll();
        }

    /**
     * GET  /scenarios/:id : get the "id" scenario.
     *
     * @param id the id of the scenarioDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scenarioDTO, or with status 404 (Not Found)
     */
    @GetMapping("/scenarios/{id}")
    @Timed
    public ResponseEntity<ScenarioDTO> getScenario(@PathVariable Long id) {
        log.debug("REST request to get Scenario : {}", id);
        ScenarioDTO scenarioDTO = scenarioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scenarioDTO));
    }

    /**
     * DELETE  /scenarios/:id : delete the "id" scenario.
     *
     * @param id the id of the scenarioDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/scenarios/{id}")
    @Timed
    public ResponseEntity<Void> deleteScenario(@PathVariable Long id) {
        log.debug("REST request to delete Scenario : {}", id);
        scenarioService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
