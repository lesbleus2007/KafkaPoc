package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.ScenarioService;
import io.github.jhipster.application.domain.Scenario;
import io.github.jhipster.application.repository.ScenarioRepository;
import io.github.jhipster.application.service.dto.ScenarioDTO;
import io.github.jhipster.application.service.mapper.ScenarioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Scenario.
 */
@Service
@Transactional
public class ScenarioServiceImpl implements ScenarioService {

    private final Logger log = LoggerFactory.getLogger(ScenarioServiceImpl.class);

    private final ScenarioRepository scenarioRepository;

    private final ScenarioMapper scenarioMapper;

    public ScenarioServiceImpl(ScenarioRepository scenarioRepository, ScenarioMapper scenarioMapper) {
        this.scenarioRepository = scenarioRepository;
        this.scenarioMapper = scenarioMapper;
    }

    /**
     * Save a scenario.
     *
     * @param scenarioDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ScenarioDTO save(ScenarioDTO scenarioDTO) {
        log.debug("Request to save Scenario : {}", scenarioDTO);
        Scenario scenario = scenarioMapper.toEntity(scenarioDTO);
        scenario = scenarioRepository.save(scenario);
        return scenarioMapper.toDto(scenario);
    }

    /**
     * Get all the scenarios.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ScenarioDTO> findAll() {
        log.debug("Request to get all Scenarios");
        return scenarioRepository.findAll().stream()
            .map(scenarioMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one scenario by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ScenarioDTO findOne(Long id) {
        log.debug("Request to get Scenario : {}", id);
        Scenario scenario = scenarioRepository.findOne(id);
        return scenarioMapper.toDto(scenario);
    }

    /**
     * Delete the scenario by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Scenario : {}", id);
        scenarioRepository.delete(id);
    }
}
