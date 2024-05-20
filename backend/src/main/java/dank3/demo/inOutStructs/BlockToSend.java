package dank3.demo.inOutStructs;
import org.springframework.stereotype.Component;

import dank3.demo.entities.Block;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class BlockToSend {
    private Long id;

    private Integer type;
    private Double centerX;
    private Double centerY;
    private Double sizeX;
    private Double sizeY;
    private String text;

    public BlockToSend(Block block) {
        this.id = block.getId();
        this.type = block.getType();
        this.centerX = block.getCenterX();
        this.centerY = block.getCenterY();
        this.sizeX = block.getSizeX();
        this.sizeY = block.getSizeY();
        this.text = block.getText();
    }
}
