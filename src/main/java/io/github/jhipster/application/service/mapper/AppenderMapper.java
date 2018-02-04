package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.AppenderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Appender and its DTO AppenderDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AppenderMapper extends EntityMapper<AppenderDTO, Appender> {



    default Appender fromId(Long id) {
        if (id == null) {
            return null;
        }
        Appender appender = new Appender();
        appender.setId(id);
        return appender;
    }
}
