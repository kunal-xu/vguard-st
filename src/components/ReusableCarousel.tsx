import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const ReusableCarousel = ({
  data,
  autoChangeInterval = 5000,
  carouselHeight = 300,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }) => (
    <View style={[styles.carouselItem, { height: carouselHeight }]}>
      <ImageBackground
        source={require("../assets/images/no_image.webp")}
        style={styles.carouselImage}
        resizeMode="stretch"
      >
        <Image
          source={item.imageUrl}
          style={styles.carouselImage}
          resizeMode="stretch"
        />
      </ImageBackground>
    </View>
  );

  const screenWidth = Dimensions.get("window").width;

  const changeImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  useEffect(() => {
    const timer = setInterval(changeImage, autoChangeInterval);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex]);

  return (
    <View style={{ height: carouselHeight }}>
      {/* <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        loop={true}
        onSnapToItem={(index) => setActiveIndex(index)}
        firstItem={activeIndex}
      /> */}
      {/* {data?.length > 0 && (
        <Pagination activeDotIndex={activeIndex} dotsLength={data.length} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
  },
});

export default ReusableCarousel;
