package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.LoggerService;
import io.github.jhipster.application.domain.Logger;
import io.github.jhipster.application.repository.LoggerRepository;
import io.github.jhipster.application.service.dto.LoggerDTO;
import io.github.jhipster.application.service.mapper.LoggerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Logger.
 */
@Service
@Transactional
public class LoggerServiceImpl implements LoggerService {

    private final Logger log = LoggerFactory.getLogger(LoggerServiceImpl.class);

    private final LoggerRepository loggerRepository;

    private final LoggerMapper loggerMapper;

    public LoggerServiceImpl(LoggerRepository loggerRepository, LoggerMapper loggerMapper) {
        this.loggerRepository = loggerRepository;
        this.loggerMapper = loggerMapper;
    }

    /**
     * Save a logger.
     *
     * @param loggerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public LoggerDTO save(LoggerDTO loggerDTO) {
        log.debug("Request to save Logger : {}", loggerDTO);
        Logger logger = loggerMapper.toEntity(loggerDTO);
        logger = loggerRepository.save(logger);
        return loggerMapper.toDto(logger);
    }

    /**
     * Get all the loggers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<LoggerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Loggers");
        return loggerRepository.findAll(pageable)
            .map(loggerMapper::toDto);
    }

    /**
     * Get one logger by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public LoggerDTO findOne(Long id) {
        log.debug("Request to get Logger : {}", id);
        Logger logger = loggerRepository.findOne(id);
        return loggerMapper.toDto(logger);
    }

    /**
     * Delete the logger by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Logger : {}", id);
        loggerRepository.delete(id);
    }
}
