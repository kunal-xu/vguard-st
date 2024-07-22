/*import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { runOnJS, SharedValue, useSharedValue } from "react-native-reanimated";
import {Canvas, Image as CanvasImage, Path2D} from "react"

const IMG_WID = 300;
const IMG_HEI = 300;
const SCALE = 1 / 10;
const THUMB_WID = 35;

const getScratchedAreaFraction = (scratchedPath: SkPath) => {
  "worklet";
  let w = IMG_WID * SCALE;
  let h = IMG_HEI * SCALE;

  const surface = Skia.Surface.MakeOffscreen(w, h)!;
  const canvas = surface.getCanvas();
  canvas.scale(SCALE, SCALE);
  const paint = Skia.Paint();
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeWidth(THUMB_WID);
  paint.setColor(Skia.Color("white"));
  paint.setStrokeCap(StrokeCap.Round);
  paint.setStrokeJoin(StrokeJoin.Round);

  canvas.drawPath(scratchedPath, paint);
  surface.flush();
  let pixelsInfo = surface.makeImageSnapshot().readPixels();

  if (!pixelsInfo?.length) {
    return 0;
  }

  let rChannelSum = 0;

  for (let i = 0; i < pixelsInfo.length; i += 4) {
    rChannelSum += pixelsInfo[i];
  }

  let rChannleAvg = rChannelSum / (pixelsInfo.length / 4);

  let scratchedAreaFraction = rChannleAvg / 255;
  return scratchedAreaFraction;
};

export default function ScratchCard() {
  const scratchPath = useSharedValue(Skia.Path.Make());
  const strokeWidth = useSharedValue(THUMB_WID);
  const [revealed, setRevealed] = useState(false);
  const onReveal = () => {
    console.log("Revealed");
    setRevealed(true);
  };

  const onCloseReward = () => {
    console.log("Reward closed");
    setRevealed(false);
  };

  const scratchHandler = Gesture.Pan()
    .onBegin((e) => {
      scratchPath.value.moveTo(e.x, e.y);
      scratchPath.value.lineTo(e.x, e.y);
      notifyChange(scratchPath);
    })
    .onUpdate((e) => {
      scratchPath.value.lineTo(e.x, e.y);
      notifyChange(scratchPath);
    })
    .onFinalize(() => {
      const scratchedArea = getScratchedAreaFraction(scratchPath.value);
      if (scratchedArea > 0.4) {
        console.log("Scratched area exceeded 40%, revealing...");
        runOnJS(onReveal)();
      }
    });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={scratchHandler}>
        <Canvas style={{ width: IMG_WID, height: IMG_HEI }}>
          <RewardImage />
          {!revealed && (
            <CoverImage strokeWidth={strokeWidth} scratchPath={scratchPath} />
          )}
        </Canvas>
      </GestureDetector>
    </View>
  );
}

const CoverImage = ({ scratchPath }: { scratchPath: SharedValue<SkPath> }) => {
  const image = useImage(require("@/src/assets/images/scratch_foreground.png"));

  return (
    <Group layer>
      <Image
        image={image}
        x={0}
        y={0}
        width={IMG_WID}
        height={IMG_HEI}
        fit={"cover"}
      />
      <Path
        path={scratchPath}
        style={"stroke"}
        strokeJoin={"round"}
        strokeCap={"round"}
        strokeWidth={THUMB_WID}
        color={"white"}
        blendMode={"clear"}
      />
    </Group>
  );
};

const RewardImage = () => {
  const image = useImage(require("@/src/assets/images/ac_icon.png"));

  return (
    <Image
      image={image}
      x={0}
      y={0}
      width={IMG_WID}
      height={IMG_HEI}
      fit={"cover"}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
*/