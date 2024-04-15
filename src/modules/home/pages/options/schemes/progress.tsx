import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";

const Progress = () => {
  let dataPoints = [
    { points: "0", multi: "1.0X" },
    { points: "1000", multi: "1.25X" },
    { points: "2000", multi: "1.3X" },
    { points: "4000", multi: "1.38X" },
    { points: "6000", multi: "1.5X" },
    { points: "10000", multi: "1.5X" },
  ];
  const [totalPoints, setTotalPoints] = useState(2450);

  useEffect(() => {
    // let timeIntervalId;
    // if (totalPoints < 3000) {
    //   intervalId = setInterval(() => {
    //     setTotalPoints((prevCounter) => prevCounter + 1);
    //   }, 1); // Set the interval to run every second (1000 milliseconds)
    // }
    // return () => clearInterval(timeIntervalId);
  }, [totalPoints]);

  const ProgressBar = ({ element = {}, dataIndex }) => {
    let status = 0;
    status = (element?.points / totalPoints) * 100;
    let showPoints = false;
    let pointsHeight = 0;
    if (dataIndex > 0) {
      let d1 = element?.points - dataPoints[dataIndex - 1].points;
      let d2 = totalPoints - dataPoints[dataIndex - 1].points;
      status = (d2 / d1) * 100;
    }

    if (
      dataPoints?.[dataIndex]?.points > totalPoints &&
      dataPoints?.[dataIndex - 1]?.points < totalPoints
    ) {
      showPoints = true;
    }

    status = status > 99 ? 100 : status < 0 ? 0 : status; // status(progress percentage) cannot be more than 100 or lesser than 0
    pointsHeight = status > 90 ? 80 : status - 10;
    console.log(">>>>>>>", status);
    return (
      <>
        <View style={{ height: 70, width: 7, backgroundColor: "#D9D9D9" }}>
          <View
            style={{
              height: status ? `${status}%` : "0%",
              width: "100%",
              backgroundColor: status ? "#EFC300" : "black",
            }}
          ></View>
        </View>
        {showPoints && (
          <Text
            style={[
              styles.totalPoints,
              {
                marginTop: pointsHeight
                  ? `${pointsHeight + pointsHeight}%`
                  : "0%",
              },
            ]}
          >
            {totalPoints}
          </Text>
        )}
      </>
    );
  };

  const getStatusFlag = (element) => {
    if (Number(element?.points) <= totalPoints) return true;
    else return false;
  };

  return (
    <View style={styles.scroller}>
       <ScrollView >
      <View style={styles.ScreenWrapper}>
        <View style={{ margin: 30 }}>
          <Text style={{ color: "#696969", fontSize: 17, fontWeight: 600 }}>
            Slab Based Scheme
          </Text>
        </View>
        <View style={styles.progressWrapper}>
          {dataPoints.length > 0 &&
            dataPoints?.map((ele, dataIndex) => (
              <View style={styles.stepWrapper1}>
                <View
                  style={[
                    dataIndex != 0 && styles.stepWrapper,
                    getStatusFlag(ele) ? styles.checkFill:styles.blankFill,
                    styles.containerWidth,
                    styles.borderRadius,
                  ]}
                >
                  <Text style={[styles.fontAlign]}>{ele?.points}</Text>
                </View>
                <View style={[styles.containerWidth]}>
                  <View
                    style={[
                      dataIndex !== 0
                        ? styles.progressLine
                        : styles.hideProgress,
                    ]}
                  >
                    <ProgressBar
                      element={ele}
                      totalPoints={totalPoints}
                      dataIndex={dataIndex}
                    />
                  </View>
                  {getStatusFlag(ele) === false && (
                    <Image
                      style={[
                        styles.ImageUrlCheck,
                        dataIndex === 0 && styles.firstImage,
                      ]}
                      source={require("../../../../../assets/images/blank.png")}
                    />
                  )}
                  {getStatusFlag(ele) === true && (
                    <Image
                      style={[
                        styles.ImageUrlCheck,
                        dataIndex === 0 && styles.firstImage,
                      ]}
                      source={require("../../../../../assets/images/checkfilled.png")}
                    />
                  )}
                </View>
                <View
                  style={[
                    dataIndex !== 0 && styles.stepWrapper,
                    getStatusFlag(ele) ? styles.checkFill:styles.blankFill,
                    styles.containerWidth,
                    styles.borderRadius,
                  ]}
                >
                  <Text style={styles.fontAlign}>{ele?.multi}</Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
    </View>
   
  );
};

const styles = StyleSheet.create({
  scroller: { flex:1,
    backgroundColor: "white"},
  ScreenWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom:'50%'
  },
  stepWrapper: {
    marginTop: 63,
  },
  checkFill: {
    backgroundColor: "#EFC300",
  },
  blankFill:{
    backgroundColor:"#D9D9D9"
  },
  containerWidth: {
    width: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  borderRadius: {
    borderRadius: 20,
  },
  fontAlign: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#404040",
    fontWeight: 800,
  },
  progressWrapper: {
    height: "80%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
  },
  ImageUrlCheck: {
    width: 27,
    height: 27,
  },
  stepWrapper1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -6,
  },
  text: {
    color: "black",
  },
  totalPoints: {
    color: "#b0b0b0",
    fontWeight: 800,
    fontSize: 10,
    marginLeft: 5,
  },
  stepperWrapper: {
    height: "100%",
    width: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
  },
  stepper: {
    backgroundColor: "white",
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
  progressLine: {
    left: 10,
    flexDirection: "row",
    top: 0,
  },
  hideProgress: {
    display: "none",
  },
  firstImage: {
    marginTop: 7,
  },
});
export default Progress;

{
  /* <View style={{height:100,width:20,borderColor:"white",borderWidth:2,borderRadius:10,}}>
<View style={{backgroundColor:"white",width:"100%",height:"80%",borderRadius:10}}></View>
</View> */
}
