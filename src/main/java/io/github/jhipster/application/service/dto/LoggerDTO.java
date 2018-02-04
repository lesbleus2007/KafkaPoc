package io.github.jhipster.application.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Logger entity.
 */
public class LoggerDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Integer burstCount;

    private Integer burstFrequency;

    private Long scenarioId;

    private Long appenderId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getBurstCount() {
        return burstCount;
    }

    public void setBurstCount(Integer burstCount) {
        this.burstCount = burstCount;
    }

    public Integer getBurstFrequency() {
        return burstFrequency;
    }

    public void setBurstFrequency(Integer burstFrequency) {
        this.burstFrequency = burstFrequency;
    }

    public Long getScenarioId() {
        return scenarioId;
    }

    public void setScenarioId(Long scenarioId) {
        this.scenarioId = scenarioId;
    }

    public Long getAppenderId() {
        return appenderId;
    }

    public void setAppenderId(Long appenderId) {
        this.appenderId = appenderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LoggerDTO loggerDTO = (LoggerDTO) o;
        if(loggerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), loggerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LoggerDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", burstCount=" + getBurstCount() +
            ", burstFrequency=" + getBurstFrequency() +
            "}";
    }
}
