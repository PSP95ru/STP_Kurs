package dank3.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dank3.demo.entities.Point;

@Repository
public interface PointRepository extends JpaRepository<Point, Long> {
}