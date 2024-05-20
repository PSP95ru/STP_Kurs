package dank3.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dank3.demo.entities.Arrow;
import dank3.demo.entities.Block;
import dank3.demo.entities.FlowchartSchema;
import dank3.demo.repositories.BlockRepository;

@Service
public class BlockService {
    @Autowired
    private BlockRepository blockRepository;
    
    public Long save(Block b) {
        return (blockRepository.save(b)).getId();
    }

    public ArrayList<Block> findBySchema(FlowchartSchema s) {
        List<Block> returnArr = s.getListBlocks();
        return new ArrayList<Block>(returnArr);
    }

    public Block findStartBlock (Arrow a) {
        Block retVal = null;
        Block[] blocks = new Block[0];
        blocks = blockRepository.findAll().toArray(blocks);
      for (Block block : blocks) {
        if (block.getListStartArrows().contains(a)) retVal = block;
      }
        return retVal;
    }

    public Block findEndBlock (Arrow a) {
        Block retVal = null;
        Block[] blocks = new Block[0];
        blocks = blockRepository.findAll().toArray(blocks);
      for (Block block : blocks) {
        if (block.getListEndArrows().contains(a)) retVal = block;
      }
        return retVal;
    }

    public Optional<Block> findById(Long id){
        return blockRepository.findById(id);
    }

    public ArrayList<Block> findAll() {
      return  (ArrayList<Block>)blockRepository.findAll();
    }

}
