package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.AppenderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Appender.
 */
public interface AppenderService {

    /**
     * Save a appender.
     *
     * @param appenderDTO the entity to save
     * @return the persisted entity
     */
    AppenderDTO save(AppenderDTO appenderDTO);

    /**
     * Get all the appenders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AppenderDTO> findAll(Pageable pageable);

    /**
     * Get the "id" appender.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AppenderDTO findOne(Long id);

    /**
     * Delete the "id" appender.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
