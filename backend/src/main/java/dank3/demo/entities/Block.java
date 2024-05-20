package dank3.demo.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Block {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schema_id", nullable=false)
    private FlowchartSchema schema;
    */

    private Integer type;
    private Double centerX;
    private Double centerY;
    private Double sizeX;
    private Double sizeY;
    private String text;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "startblock_id")
    private List<Arrow> listStartArrows = new ArrayList<Arrow>();
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "endblock_id")
    private List<Arrow> listEndArrows = new ArrayList<Arrow>();;
}
