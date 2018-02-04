package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.LoggerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Logger and its DTO LoggerDTO.
 */
@Mapper(componentModel = "spring", uses = {ScenarioMapper.class, AppenderMapper.class})
public interface LoggerMapper extends EntityMapper<LoggerDTO, Logger> {

    @Mapping(source = "scenario.id", target = "scenarioId")
    @Mapping(source = "appender.id", target = "appenderId")
    LoggerDTO toDto(Logger logger);

    @Mapping(source = "scenarioId", target = "scenario")
    @Mapping(source = "appenderId", target = "appender")
    Logger toEntity(LoggerDTO loggerDTO);

    default Logger fromId(Long id) {
        if (id == null) {
            return null;
        }
        Logger logger = new Logger();
        logger.setId(id);
        return logger;
    }
}
