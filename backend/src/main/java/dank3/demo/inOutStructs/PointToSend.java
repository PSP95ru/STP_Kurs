package dank3.demo.inOutStructs;
import org.springframework.stereotype.Component;

import dank3.demo.entities.Arrow;
import dank3.demo.entities.Point;
import dank3.demo.services.ArrowService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class PointToSend {
    private Long id;

    private Long arrowId;

    private Integer order;
    private Double x;
    private Double y;

    public PointToSend(Point point, ArrowService arrowService) {
        this.id = point.getId();
        Arrow arrow = arrowService.findForPoint(point);
        this.arrowId = arrow.getId();
        this.order = point.getOrderInArrow();
        this.x = point.getX();
        this.y = point.getY();
    }
}
