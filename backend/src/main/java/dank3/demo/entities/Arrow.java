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
public class Arrow {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_startarrows", nullable=false)
    private Block startBlock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "block_endarrows", nullable=false)
    private Block endBlock;
    */
    private Double angleStart;
    private Double angleEnd;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "arrow_id")
    private List<Point> listPoints = new ArrayList<Point>();
}
