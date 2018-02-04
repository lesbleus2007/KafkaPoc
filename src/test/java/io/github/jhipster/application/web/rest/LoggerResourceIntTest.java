package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.KafkaPocApp;

import io.github.jhipster.application.domain.Logger;
import io.github.jhipster.application.repository.LoggerRepository;
import io.github.jhipster.application.service.LoggerService;
import io.github.jhipster.application.service.dto.LoggerDTO;
import io.github.jhipster.application.service.mapper.LoggerMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LoggerResource REST controller.
 *
 * @see LoggerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KafkaPocApp.class)
public class LoggerResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_BURST_COUNT = 1;
    private static final Integer UPDATED_BURST_COUNT = 2;

    private static final Integer DEFAULT_BURST_FREQUENCY = 1;
    private static final Integer UPDATED_BURST_FREQUENCY = 2;

    @Autowired
    private LoggerRepository loggerRepository;

    @Autowired
    private LoggerMapper loggerMapper;

    @Autowired
    private LoggerService loggerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLoggerMockMvc;

    private Logger logger;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LoggerResource loggerResource = new LoggerResource(loggerService);
        this.restLoggerMockMvc = MockMvcBuilders.standaloneSetup(loggerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Logger createEntity(EntityManager em) {
        Logger logger = new Logger()
            .name(DEFAULT_NAME)
            .burstCount(DEFAULT_BURST_COUNT)
            .burstFrequency(DEFAULT_BURST_FREQUENCY);
        return logger;
    }

    @Before
    public void initTest() {
        logger = createEntity(em);
    }

    @Test
    @Transactional
    public void createLogger() throws Exception {
        int databaseSizeBeforeCreate = loggerRepository.findAll().size();

        // Create the Logger
        LoggerDTO loggerDTO = loggerMapper.toDto(logger);
        restLoggerMockMvc.perform(post("/api/loggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loggerDTO)))
            .andExpect(status().isCreated());

        // Validate the Logger in the database
        List<Logger> loggerList = loggerRepository.findAll();
        assertThat(loggerList).hasSize(databaseSizeBeforeCreate + 1);
        Logger testLogger = loggerList.get(loggerList.size() - 1);
        assertThat(testLogger.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLogger.getBurstCount()).isEqualTo(DEFAULT_BURST_COUNT);
        assertThat(testLogger.getBurstFrequency()).isEqualTo(DEFAULT_BURST_FREQUENCY);
    }

    @Test
    @Transactional
    public void createLoggerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = loggerRepository.findAll().size();

        // Create the Logger with an existing ID
        logger.setId(1L);
        LoggerDTO loggerDTO = loggerMapper.toDto(logger);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLoggerMockMvc.perform(post("/api/loggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loggerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Logger in the database
        List<Logger> loggerList = loggerRepository.findAll();
        assertThat(loggerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = loggerRepository.findAll().size();
        // set the field null
        logger.setName(null);

        // Create the Logger, which fails.
        LoggerDTO loggerDTO = loggerMapper.toDto(logger);

        restLoggerMockMvc.perform(post("/api/loggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loggerDTO)))
            .andExpect(status().isBadRequest());

        List<Logger> loggerList = loggerRepository.findAll();
        assertThat(loggerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLoggers() throws Exception {
        // Initialize the database
        loggerRepository.saveAndFlush(logger);

        // Get all the loggerList
        restLoggerMockMvc.perform(get("/api/loggers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(logger.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].burstCount").value(hasItem(DEFAULT_BURST_COUNT)))
            .andExpect(jsonPath("$.[*].burstFrequency").value(hasItem(DEFAULT_BURST_FREQUENCY)));
    }

    @Test
    @Transactional
    public void getLogger() throws Exception {
        // Initialize the database
        loggerRepository.saveAndFlush(logger);

        // Get the logger
        restLoggerMockMvc.perform(get("/api/loggers/{id}", logger.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(logger.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.burstCount").value(DEFAULT_BURST_COUNT))
            .andExpect(jsonPath("$.burstFrequency").value(DEFAULT_BURST_FREQUENCY));
    }

    @Test
    @Transactional
    public void getNonExistingLogger() throws Exception {
        // Get the logger
        restLoggerMockMvc.perform(get("/api/loggers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLogger() throws Exception {
        // Initialize the database
        loggerRepository.saveAndFlush(logger);
        int databaseSizeBeforeUpdate = loggerRepository.findAll().size();

        // Update the logger
        Logger updatedLogger = loggerRepository.findOne(logger.getId());
        // Disconnect from session so that the updates on updatedLogger are not directly saved in db
        em.detach(updatedLogger);
        updatedLogger
            .name(UPDATED_NAME)
            .burstCount(UPDATED_BURST_COUNT)
            .burstFrequency(UPDATED_BURST_FREQUENCY);
        LoggerDTO loggerDTO = loggerMapper.toDto(updatedLogger);

        restLoggerMockMvc.perform(put("/api/loggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loggerDTO)))
            .andExpect(status().isOk());

        // Validate the Logger in the database
        List<Logger> loggerList = loggerRepository.findAll();
        assertThat(loggerList).hasSize(databaseSizeBeforeUpdate);
        Logger testLogger = loggerList.get(loggerList.size() - 1);
        assertThat(testLogger.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLogger.getBurstCount()).isEqualTo(UPDATED_BURST_COUNT);
        assertThat(testLogger.getBurstFrequency()).isEqualTo(UPDATED_BURST_FREQUENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingLogger() throws Exception {
        int databaseSizeBeforeUpdate = loggerRepository.findAll().size();

        // Create the Logger
        LoggerDTO loggerDTO = loggerMapper.toDto(logger);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLoggerMockMvc.perform(put("/api/loggers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loggerDTO)))
            .andExpect(status().isCreated());

        // Validate the Logger in the database
        List<Logger> loggerList = loggerRepository.findAll();
        assertThat(loggerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLogger() throws Exception {
        // Initialize the database
        loggerRepository.saveAndFlush(logger);
        int databaseSizeBeforeDelete = loggerRepository.findAll().size();

        // Get the logger
        restLoggerMockMvc.perform(delete("/api/loggers/{id}", logger.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Logger> loggerList = loggerRepository.findAll();
        assertThat(loggerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Logger.class);
        Logger logger1 = new Logger();
        logger1.setId(1L);
        Logger logger2 = new Logger();
        logger2.setId(logger1.getId());
        assertThat(logger1).isEqualTo(logger2);
        logger2.setId(2L);
        assertThat(logger1).isNotEqualTo(logger2);
        logger1.setId(null);
        assertThat(logger1).isNotEqualTo(logger2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LoggerDTO.class);
        LoggerDTO loggerDTO1 = new LoggerDTO();
        loggerDTO1.setId(1L);
        LoggerDTO loggerDTO2 = new LoggerDTO();
        assertThat(loggerDTO1).isNotEqualTo(loggerDTO2);
        loggerDTO2.setId(loggerDTO1.getId());
        assertThat(loggerDTO1).isEqualTo(loggerDTO2);
        loggerDTO2.setId(2L);
        assertThat(loggerDTO1).isNotEqualTo(loggerDTO2);
        loggerDTO1.setId(null);
        assertThat(loggerDTO1).isNotEqualTo(loggerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(loggerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(loggerMapper.fromId(null)).isNull();
    }
}
