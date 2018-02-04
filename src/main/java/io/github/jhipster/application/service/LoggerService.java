package io.github.jhipster.application.service;

import io.github.jhipster.application.service.dto.LoggerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Logger.
 */
public interface LoggerService {

    /**
     * Save a logger.
     *
     * @param loggerDTO the entity to save
     * @return the persisted entity
     */
    LoggerDTO save(LoggerDTO loggerDTO);

    /**
     * Get all the loggers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<LoggerDTO> findAll(Pageable pageable);

    /**
     * Get the "id" logger.
     *
     * @param id the id of the entity
     * @return the entity
     */
    LoggerDTO findOne(Long id);

    /**
     * Delete the "id" logger.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
