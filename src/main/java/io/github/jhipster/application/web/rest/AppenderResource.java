package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.service.AppenderService;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.application.service.dto.AppenderDTO;
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
 * REST controller for managing Appender.
 */
@RestController
@RequestMapping("/api")
public class AppenderResource {

    private final Logger log = LoggerFactory.getLogger(AppenderResource.class);

    private static final String ENTITY_NAME = "appender";

    private final AppenderService appenderService;

    public AppenderResource(AppenderService appenderService) {
        this.appenderService = appenderService;
    }

    /**
     * POST  /appenders : Create a new appender.
     *
     * @param appenderDTO the appenderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new appenderDTO, or with status 400 (Bad Request) if the appender has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/appenders")
    @Timed
    public ResponseEntity<AppenderDTO> createAppender(@Valid @RequestBody AppenderDTO appenderDTO) throws URISyntaxException {
        log.debug("REST request to save Appender : {}", appenderDTO);
        if (appenderDTO.getId() != null) {
            throw new BadRequestAlertException("A new appender cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AppenderDTO result = appenderService.save(appenderDTO);
        return ResponseEntity.created(new URI("/api/appenders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /appenders : Updates an existing appender.
     *
     * @param appenderDTO the appenderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated appenderDTO,
     * or with status 400 (Bad Request) if the appenderDTO is not valid,
     * or with status 500 (Internal Server Error) if the appenderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/appenders")
    @Timed
    public ResponseEntity<AppenderDTO> updateAppender(@Valid @RequestBody AppenderDTO appenderDTO) throws URISyntaxException {
        log.debug("REST request to update Appender : {}", appenderDTO);
        if (appenderDTO.getId() == null) {
            return createAppender(appenderDTO);
        }
        AppenderDTO result = appenderService.save(appenderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, appenderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /appenders : get all the appenders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of appenders in body
     */
    @GetMapping("/appenders")
    @Timed
    public ResponseEntity<List<AppenderDTO>> getAllAppenders(Pageable pageable) {
        log.debug("REST request to get a page of Appenders");
        Page<AppenderDTO> page = appenderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/appenders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /appenders/:id : get the "id" appender.
     *
     * @param id the id of the appenderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the appenderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/appenders/{id}")
    @Timed
    public ResponseEntity<AppenderDTO> getAppender(@PathVariable Long id) {
        log.debug("REST request to get Appender : {}", id);
        AppenderDTO appenderDTO = appenderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(appenderDTO));
    }

    /**
     * DELETE  /appenders/:id : delete the "id" appender.
     *
     * @param id the id of the appenderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/appenders/{id}")
    @Timed
    public ResponseEntity<Void> deleteAppender(@PathVariable Long id) {
        log.debug("REST request to delete Appender : {}", id);
        appenderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
