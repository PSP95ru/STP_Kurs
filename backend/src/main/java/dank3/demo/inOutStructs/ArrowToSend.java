package dank3.demo.inOutStructs;

import org.springframework.stereotype.Component;

import dank3.demo.entities.Arrow;
import dank3.demo.entities.Block;
import dank3.demo.services.BlockService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ArrowToSend {
    private Long id;
    
    private Long idStart;
    private Long idEnd;

    private Double angleStart;
    private Double angleEnd;

    public ArrowToSend(Arrow arrow, BlockService blockService) {
        this.id = arrow.getId();
        Block startBlock = blockService.findStartBlock(arrow);
        Block endBlock = blockService.findEndBlock(arrow);
        this.idStart = startBlock.getId();
        this.idEnd = endBlock.getId();
        this.angleEnd = arrow.getAngleEnd();
        this.angleStart = arrow.getAngleStart();
    }
}
