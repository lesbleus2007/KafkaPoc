package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Logger.
 */
@Entity
@Table(name = "logger")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Logger implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "burst_count")
    private Integer burstCount;

    @Column(name = "burst_frequency")
    private Integer burstFrequency;

    @ManyToOne
    private Scenario scenario;

    @OneToOne
    @JoinColumn(unique = true)
    private Appender appender;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Logger name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBurstCount() {
        return burstCount;
    }

    public Logger burstCount(Integer burstCount) {
        this.burstCount = burstCount;
        return this;
    }

    public void setBurstCount(Integer burstCount) {
        this.burstCount = burstCount;
    }

    public Integer getBurstFrequency() {
        return burstFrequency;
    }

    public Logger burstFrequency(Integer burstFrequency) {
        this.burstFrequency = burstFrequency;
        return this;
    }

    public void setBurstFrequency(Integer burstFrequency) {
        this.burstFrequency = burstFrequency;
    }

    public Scenario getScenario() {
        return scenario;
    }

    public Logger scenario(Scenario scenario) {
        this.scenario = scenario;
        return this;
    }

    public void setScenario(Scenario scenario) {
        this.scenario = scenario;
    }

    public Appender getAppender() {
        return appender;
    }

    public Logger appender(Appender appender) {
        this.appender = appender;
        return this;
    }

    public void setAppender(Appender appender) {
        this.appender = appender;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Logger logger = (Logger) o;
        if (logger.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), logger.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Logger{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", burstCount=" + getBurstCount() +
            ", burstFrequency=" + getBurstFrequency() +
            "}";
    }
}
