package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Appender;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Appender entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AppenderRepository extends JpaRepository<Appender, Long> {

}
