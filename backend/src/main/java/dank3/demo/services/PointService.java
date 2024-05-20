package dank3.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dank3.demo.entities.Arrow;
import dank3.demo.entities.Point;
import dank3.demo.repositories.PointRepository;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    public Long save(Point p) {
        return pointRepository.save(p).getId();
    }

    public ArrayList<Point> findByArrow(Arrow a) {
        List<Point> returnArr = a.getListPoints();
        return new ArrayList<Point>(returnArr);
    }

    public Optional<Point> findById(Long id){
        return pointRepository.findById(id);
    }
    public ArrayList<Point> findAll() {
      return  (ArrayList<Point>)pointRepository.findAll();
    }
}
