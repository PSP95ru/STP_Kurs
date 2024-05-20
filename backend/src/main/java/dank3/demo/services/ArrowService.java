package dank3.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dank3.demo.entities.Arrow;
import dank3.demo.entities.Block;
import dank3.demo.entities.Point;
import dank3.demo.repositories.ArrowRepository;

@Service
public class ArrowService {
    @Autowired
    private ArrowRepository arrowRepository;

    public Long save(Arrow a) {
        return arrowRepository.save(a).getId();
    }

    public ArrayList<Arrow> findByBlock(Block b) {
        List<Arrow> returnArr = b.getListStartArrows();
        
        return new ArrayList<Arrow>(returnArr);
    }

    public Arrow findForPoint (Point p) {
        Arrow retVal = null;
        Arrow[] arrows = new Arrow[0];
        arrows = arrowRepository.findAll().toArray(arrows);
      for (Arrow arrow : arrows) {
        if (arrow.getListPoints().contains(p)) retVal = arrow;
      }
        return retVal;
    }

    public Optional<Arrow> findById(Long id) {
        return arrowRepository.findById(id);
    }

    public ArrayList<Arrow> findAll() {
        return  (ArrayList<Arrow>)arrowRepository.findAll();
      }
}
