package dank3.demo.misc;

import dank3.demo.inOutStructs.ArrowToSend;
import dank3.demo.inOutStructs.BlockToSend;
import dank3.demo.inOutStructs.PointToSend;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class BigStruct {
    BlockToSend[] blocks;
    ArrowToSend[] arrows;
    PointToSend[] points;
}
