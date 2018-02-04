package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Logger;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Logger entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LoggerRepository extends JpaRepository<Logger, Long> {

}
