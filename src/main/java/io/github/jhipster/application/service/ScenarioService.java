package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.ScenarioDTO;
import java.util.List;

/**
 * Service Interface for managing Scenario.
 */
public interface ScenarioService {

    /**
     * Save a scenario.
     *
     * @param scenarioDTO the entity to save
     * @return the persisted entity
     */
    ScenarioDTO save(ScenarioDTO scenarioDTO);

    /**
     * Get all the scenarios.
     *
     * @return the list of entities
     */
    List<ScenarioDTO> findAll();

    /**
     * Get the "id" scenario.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ScenarioDTO findOne(Long id);

    /**
     * Delete the "id" scenario.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
