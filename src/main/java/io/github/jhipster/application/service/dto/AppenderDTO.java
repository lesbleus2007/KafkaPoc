package io.github.jhipster.application.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Appender entity.
 */
public class AppenderDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private Boolean isAsync;

    @NotNull
    private String topic;

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

    public Boolean isIsAsync() {
        return isAsync;
    }

    public void setIsAsync(Boolean isAsync) {
        this.isAsync = isAsync;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AppenderDTO appenderDTO = (AppenderDTO) o;
        if(appenderDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appenderDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppenderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", isAsync='" + isIsAsync() + "'" +
            ", topic='" + getTopic() + "'" +
            "}";
    }
}
