package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.KafkaPocApp;

import io.github.jhipster.application.domain.Appender;
import io.github.jhipster.application.repository.AppenderRepository;
import io.github.jhipster.application.service.AppenderService;
import io.github.jhipster.application.service.dto.AppenderDTO;
import io.github.jhipster.application.service.mapper.AppenderMapper;
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
 * Test class for the AppenderResource REST controller.
 *
 * @see AppenderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = KafkaPocApp.class)
public class AppenderResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ASYNC = false;
    private static final Boolean UPDATED_IS_ASYNC = true;

    private static final String DEFAULT_TOPIC = "AAAAAAAAAA";
    private static final String UPDATED_TOPIC = "BBBBBBBBBB";

    @Autowired
    private AppenderRepository appenderRepository;

    @Autowired
    private AppenderMapper appenderMapper;

    @Autowired
    private AppenderService appenderService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAppenderMockMvc;

    private Appender appender;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AppenderResource appenderResource = new AppenderResource(appenderService);
        this.restAppenderMockMvc = MockMvcBuilders.standaloneSetup(appenderResource)
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
    public static Appender createEntity(EntityManager em) {
        Appender appender = new Appender()
            .name(DEFAULT_NAME)
            .isAsync(DEFAULT_IS_ASYNC)
            .topic(DEFAULT_TOPIC);
        return appender;
    }

    @Before
    public void initTest() {
        appender = createEntity(em);
    }

    @Test
    @Transactional
    public void createAppender() throws Exception {
        int databaseSizeBeforeCreate = appenderRepository.findAll().size();

        // Create the Appender
        AppenderDTO appenderDTO = appenderMapper.toDto(appender);
        restAppenderMockMvc.perform(post("/api/appenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appenderDTO)))
            .andExpect(status().isCreated());

        // Validate the Appender in the database
        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeCreate + 1);
        Appender testAppender = appenderList.get(appenderList.size() - 1);
        assertThat(testAppender.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAppender.isIsAsync()).isEqualTo(DEFAULT_IS_ASYNC);
        assertThat(testAppender.getTopic()).isEqualTo(DEFAULT_TOPIC);
    }

    @Test
    @Transactional
    public void createAppenderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = appenderRepository.findAll().size();

        // Create the Appender with an existing ID
        appender.setId(1L);
        AppenderDTO appenderDTO = appenderMapper.toDto(appender);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAppenderMockMvc.perform(post("/api/appenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appenderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Appender in the database
        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = appenderRepository.findAll().size();
        // set the field null
        appender.setName(null);

        // Create the Appender, which fails.
        AppenderDTO appenderDTO = appenderMapper.toDto(appender);

        restAppenderMockMvc.perform(post("/api/appenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appenderDTO)))
            .andExpect(status().isBadRequest());

        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTopicIsRequired() throws Exception {
        int databaseSizeBeforeTest = appenderRepository.findAll().size();
        // set the field null
        appender.setTopic(null);

        // Create the Appender, which fails.
        AppenderDTO appenderDTO = appenderMapper.toDto(appender);

        restAppenderMockMvc.perform(post("/api/appenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appenderDTO)))
            .andExpect(status().isBadRequest());

        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAppenders() throws Exception {
        // Initialize the database
        appenderRepository.saveAndFlush(appender);

        // Get all the appenderList
        restAppenderMockMvc.perform(get("/api/appenders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(appender.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].isAsync").value(hasItem(DEFAULT_IS_ASYNC.booleanValue())))
            .andExpect(jsonPath("$.[*].topic").value(hasItem(DEFAULT_TOPIC.toString())));
    }

    @Test
    @Transactional
    public void getAppender() throws Exception {
        // Initialize the database
        appenderRepository.saveAndFlush(appender);

        // Get the appender
        restAppenderMockMvc.perform(get("/api/appenders/{id}", appender.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(appender.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.isAsync").value(DEFAULT_IS_ASYNC.booleanValue()))
            .andExpect(jsonPath("$.topic").value(DEFAULT_TOPIC.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAppender() throws Exception {
        // Get the appender
        restAppenderMockMvc.perform(get("/api/appenders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAppender() throws Exception {
        // Initialize the database
        appenderRepository.saveAndFlush(appender);
        int databaseSizeBeforeUpdate = appenderRepository.findAll().size();

        // Update the appender
        Appender updatedAppender = appenderRepository.findOne(appender.getId());
        // Disconnect from session so that the updates on updatedAppender are not directly saved in db
        em.detach(updatedAppender);
        updatedAppender
            .name(UPDATED_NAME)
            .isAsync(UPDATED_IS_ASYNC)
            .topic(UPDATED_TOPIC);
        AppenderDTO appenderDTO = appenderMapper.toDto(updatedAppender);

        restAppenderMockMvc.perform(put("/api/appenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appenderDTO)))
            .andExpect(status().isOk());

        // Validate the Appender in the database
        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeUpdate);
        Appender testAppender = appenderList.get(appenderList.size() - 1);
        assertThat(testAppender.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAppender.isIsAsync()).isEqualTo(UPDATED_IS_ASYNC);
        assertThat(testAppender.getTopic()).isEqualTo(UPDATED_TOPIC);
    }

    @Test
    @Transactional
    public void updateNonExistingAppender() throws Exception {
        int databaseSizeBeforeUpdate = appenderRepository.findAll().size();

        // Create the Appender
        AppenderDTO appenderDTO = appenderMapper.toDto(appender);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAppenderMockMvc.perform(put("/api/appenders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(appenderDTO)))
            .andExpect(status().isCreated());

        // Validate the Appender in the database
        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAppender() throws Exception {
        // Initialize the database
        appenderRepository.saveAndFlush(appender);
        int databaseSizeBeforeDelete = appenderRepository.findAll().size();

        // Get the appender
        restAppenderMockMvc.perform(delete("/api/appenders/{id}", appender.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Appender> appenderList = appenderRepository.findAll();
        assertThat(appenderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Appender.class);
        Appender appender1 = new Appender();
        appender1.setId(1L);
        Appender appender2 = new Appender();
        appender2.setId(appender1.getId());
        assertThat(appender1).isEqualTo(appender2);
        appender2.setId(2L);
        assertThat(appender1).isNotEqualTo(appender2);
        appender1.setId(null);
        assertThat(appender1).isNotEqualTo(appender2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AppenderDTO.class);
        AppenderDTO appenderDTO1 = new AppenderDTO();
        appenderDTO1.setId(1L);
        AppenderDTO appenderDTO2 = new AppenderDTO();
        assertThat(appenderDTO1).isNotEqualTo(appenderDTO2);
        appenderDTO2.setId(appenderDTO1.getId());
        assertThat(appenderDTO1).isEqualTo(appenderDTO2);
        appenderDTO2.setId(2L);
        assertThat(appenderDTO1).isNotEqualTo(appenderDTO2);
        appenderDTO1.setId(null);
        assertThat(appenderDTO1).isNotEqualTo(appenderDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(appenderMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(appenderMapper.fromId(null)).isNull();
    }
}
