package dank3.demo.controllers;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dank3.demo.entities.Arrow;
import dank3.demo.entities.Block;
import dank3.demo.entities.Point;
import dank3.demo.entities.FlowchartSchema;
import dank3.demo.inOutStructs.ArrowToSend;
import dank3.demo.inOutStructs.BlockToSend;
import dank3.demo.inOutStructs.PointToSend;
import dank3.demo.misc.BigStruct;
import dank3.demo.services.ArrowService;
import dank3.demo.services.BlockService;
import dank3.demo.services.PointService;
import dank3.demo.services.SchemaService;
import lombok.AllArgsConstructor;


@RestController
@AllArgsConstructor
public class MockupRestController {
    private final SchemaService schemaService;
    private final BlockService blockService;
    private final ArrowService arrowService;
    private final PointService pointService;

    @CrossOrigin
    @GetMapping("/getSchema/{name}")
    public Object getSchema(Model model, @PathVariable("name") String name) {
        HashMap<String, Object> response = new HashMap<String, Object>();
        response.put("blocks", null);
        response.put("arrows", null);
        response.put("points", null);
        try {
            FlowchartSchema found = schemaService.findByName(name);
            if (found != null) {
                ArrayList<Block> blocks = blockService.findBySchema(found);
                ArrayList<BlockToSend> blocksToSend = new ArrayList<BlockToSend>();
                ArrayList<Arrow> arrows = new ArrayList<Arrow>();
                ArrayList<ArrowToSend> arrrowsToSend = new ArrayList<ArrowToSend>();
                ArrayList<Point> points = new ArrayList<Point>();
                ArrayList<PointToSend> pointsToSend = new ArrayList<PointToSend>();
                System.out.println("Blocks:" + blockService.findAll().size() + "\n, Arrows: " + arrowService.findAll().size() + "\n, Points: " + pointService.findAll().size());
                for (Block block : blocks) {
                    blocksToSend.add(new BlockToSend(block));
                    arrows.addAll(arrowService.findByBlock(block));
                }
                for (Arrow arrow : arrows) {
                    arrrowsToSend.add(new ArrowToSend(arrow, blockService));
                    points.addAll(pointService.findByArrow(arrow));
                }
                for (Point point : points) {
                    pointsToSend.add(new PointToSend(point, arrowService));
                }
                response.put("blocks", blocksToSend);
                response.put("arrows", arrrowsToSend);
                response.put("points", pointsToSend);
            }
        } finally {}
        return response;
    }
    @CrossOrigin
    @PostMapping("/saveSchema/{name}")
    public Integer createNewSurvey(Model model, @PathVariable("name") String name, @RequestBody BigStruct schemaJSON) {
        Integer returnValue = -1;
        try {
            FlowchartSchema found = schemaService.findByName(name);
            if (found != null) {
                schemaService.remove(found);
            }
            FlowchartSchema newSchema = new FlowchartSchema();
            newSchema.setName(name);
            schemaService.save(newSchema);
            BlockToSend[] blocks = schemaJSON.getBlocks();
            ArrowToSend[] arrows = schemaJSON.getArrows();
            PointToSend[] points = schemaJSON.getPoints();
            Long [] blockIds = new Long[blocks.length];
            Long [] blockIds2 = new Long[blocks.length];
            Long [] arrowIds = new Long[arrows.length];
            Long [] arrowIds2 = new Long[arrows.length];
            for (int i = 0; i < blocks.length; i++) {
                BlockToSend curBlock = blocks[i];
                blockIds[i] = curBlock.getId();
                Block newBlock = new Block();
                newBlock.setCenterX(curBlock.getCenterX());
                newBlock.setCenterY(curBlock.getCenterY());
                newBlock.setSizeX(curBlock.getSizeX());
                newBlock.setSizeY(curBlock.getSizeY());
                newBlock.setType(curBlock.getType());
                newBlock.setText(curBlock.getText());
                newSchema.getListBlocks().add(newBlock);
                blockIds2[i] = blockService.save(newBlock);
            }
            for (int i = 0; i < arrows.length; i++) {
                ArrowToSend curArrow = arrows[i];
                arrowIds[i] = curArrow.getId();
                Arrow newArrow = new Arrow();
                newArrow.setAngleEnd(curArrow.getAngleEnd());
                newArrow.setAngleStart(curArrow.getAngleStart());
                Long startId = 0l;
                Long endId = 0l;
                for (int j = 0; j < blockIds.length; j++) {
                    if (blockIds[j] == curArrow.getIdStart()) startId = (long)j;
                    if (blockIds[j] == curArrow.getIdEnd()) endId = (long)j;
                }
                startId = blockIds2[startId.intValue()];
                endId = blockIds2[endId.intValue()];
                blockService.findById(startId).get().getListStartArrows().add(newArrow);
                blockService.findById(endId).get().getListEndArrows().add(newArrow);
                arrowIds2[i] = arrowService.save(newArrow);
            }
            for (int i = 0; i < points.length; i++) {
                PointToSend curPoint = points[i];
                Point newPoint = new Point();
                newPoint.setOrderInArrow(curPoint.getOrder());
                newPoint.setX(curPoint.getX());
                newPoint.setY(curPoint.getY());
                Long startId = 0l;
                for (int j = 0; j < arrowIds.length; j++) {
                    if (arrowIds[j] == curPoint.getArrowId()) startId = (long)j;
                }
                startId = arrowIds2[startId.intValue()];
                arrowService.findById(startId).get().getListPoints().add(newPoint);
                pointService.save(newPoint);
            }
            returnValue = 1;
        } finally {}
        return returnValue;
    }

}