package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.ScenarioDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Scenario and its DTO ScenarioDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ScenarioMapper extends EntityMapper<ScenarioDTO, Scenario> {


    @Mapping(target = "loggers", ignore = true)
    Scenario toEntity(ScenarioDTO scenarioDTO);

    default Scenario fromId(Long id) {
        if (id == null) {
            return null;
        }
        Scenario scenario = new Scenario();
        scenario.setId(id);
        return scenario;
    }
}
