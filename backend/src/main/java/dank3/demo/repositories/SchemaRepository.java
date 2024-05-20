package dank3.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dank3.demo.entities.FlowchartSchema;

@Repository
public interface SchemaRepository extends JpaRepository<FlowchartSchema, Long> {
    FlowchartSchema findByName(String s);
}
