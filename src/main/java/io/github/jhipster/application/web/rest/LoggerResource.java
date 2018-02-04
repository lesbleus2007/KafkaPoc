package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.LoggerService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.LoggerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Logger.
 */
@RestController
@RequestMapping("/api")
public class LoggerResource {

    private final Logger log = LoggerFactory.getLogger(LoggerResource.class);

    private static final String ENTITY_NAME = "logger";

    private final LoggerService loggerService;

    public LoggerResource(LoggerService loggerService) {
        this.loggerService = loggerService;
    }

    /**
     * POST  /loggers : Create a new logger.
     *
     * @param loggerDTO the loggerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new loggerDTO, or with status 400 (Bad Request) if the logger has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/loggers")
    @Timed
    public ResponseEntity<LoggerDTO> createLogger(@Valid @RequestBody LoggerDTO loggerDTO) throws URISyntaxException {
        log.debug("REST request to save Logger : {}", loggerDTO);
        if (loggerDTO.getId() != null) {
            throw new BadRequestAlertException("A new logger cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LoggerDTO result = loggerService.save(loggerDTO);
        return ResponseEntity.created(new URI("/api/loggers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /loggers : Updates an existing logger.
     *
     * @param loggerDTO the loggerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated loggerDTO,
     * or with status 400 (Bad Request) if the loggerDTO is not valid,
     * or with status 500 (Internal Server Error) if the loggerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/loggers")
    @Timed
    public ResponseEntity<LoggerDTO> updateLogger(@Valid @RequestBody LoggerDTO loggerDTO) throws URISyntaxException {
        log.debug("REST request to update Logger : {}", loggerDTO);
        if (loggerDTO.getId() == null) {
            return createLogger(loggerDTO);
        }
        LoggerDTO result = loggerService.save(loggerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, loggerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /loggers : get all the loggers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of loggers in body
     */
    @GetMapping("/loggers")
    @Timed
    public ResponseEntity<List<LoggerDTO>> getAllLoggers(Pageable pageable) {
        log.debug("REST request to get a page of Loggers");
        Page<LoggerDTO> page = loggerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/loggers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /loggers/:id : get the "id" logger.
     *
     * @param id the id of the loggerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the loggerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/loggers/{id}")
    @Timed
    public ResponseEntity<LoggerDTO> getLogger(@PathVariable Long id) {
        log.debug("REST request to get Logger : {}", id);
        LoggerDTO loggerDTO = loggerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(loggerDTO));
    }

    /**
     * DELETE  /loggers/:id : delete the "id" logger.
     *
     * @param id the id of the loggerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/loggers/{id}")
    @Timed
    public ResponseEntity<Void> deleteLogger(@PathVariable Long id) {
        log.debug("REST request to delete Logger : {}", id);
        loggerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
