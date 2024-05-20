package dank3.demo.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Point {
    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    private Long id;
    /*
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "arrow_id", nullable=false)
    private Arrow arrow;
    */

    private Integer orderInArrow;
    private Double x;
    private Double y;
}
