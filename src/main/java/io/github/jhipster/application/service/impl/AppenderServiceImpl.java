package io.github.jhipster.application.service.impl;

import io.github.jhipster.application.service.AppenderService;
import io.github.jhipster.application.domain.Appender;
import io.github.jhipster.application.repository.AppenderRepository;
import io.github.jhipster.application.service.dto.AppenderDTO;
import io.github.jhipster.application.service.mapper.AppenderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Appender.
 */
@Service
@Transactional
public class AppenderServiceImpl implements AppenderService {

    private final Logger log = LoggerFactory.getLogger(AppenderServiceImpl.class);

    private final AppenderRepository appenderRepository;

    private final AppenderMapper appenderMapper;

    public AppenderServiceImpl(AppenderRepository appenderRepository, AppenderMapper appenderMapper) {
        this.appenderRepository = appenderRepository;
        this.appenderMapper = appenderMapper;
    }

    /**
     * Save a appender.
     *
     * @param appenderDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AppenderDTO save(AppenderDTO appenderDTO) {
        log.debug("Request to save Appender : {}", appenderDTO);
        Appender appender = appenderMapper.toEntity(appenderDTO);
        appender = appenderRepository.save(appender);
        return appenderMapper.toDto(appender);
    }

    /**
     * Get all the appenders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AppenderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Appenders");
        return appenderRepository.findAll(pageable)
            .map(appenderMapper::toDto);
    }

    /**
     * Get one appender by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AppenderDTO findOne(Long id) {
        log.debug("Request to get Appender : {}", id);
        Appender appender = appenderRepository.findOne(id);
        return appenderMapper.toDto(appender);
    }

    /**
     * Delete the appender by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Appender : {}", id);
        appenderRepository.delete(id);
    }
}
