import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <View style={styles.videoPlayerContainer}>
      <Video
        source={{ uri: videoUrl }}
        style={styles.videoPlayer}
        controls={true}
        resizeMode="contain"
      />
    </View>
  );
};

const VideoList = ({ videos, onVideoPress }) => {
  return (
    <View style={styles.videoListContainer}>
      {videos.map((video, index) => (
        <TouchableOpacity key={index} onPress={() => onVideoPress(video)}>
          <Text style={styles.videoListItem}>Sample {index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const AppTutorials = () => {
  const videos = [
    "https://storage.googleapis.com/vguard_staging_bucket/stimg/appVideos/003f94c2-41db-4e15-ba03-473a4c3a5fe4.mp4",
    "https://storage.googleapis.com/vguard_staging_bucket/stimg/appVideos/01f57299-fa89-4a4e-8ca3-0a3043d27828.mp4",
    // Add more video URLs as needed
  ];
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const handleVideoPress = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoPlayerContainer}>
        <VideoPlayer videoUrl={selectedVideo} />
      </View>
      <View style={styles.videoListContainer}>
        <VideoList videos={videos} onVideoPress={handleVideoPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
  },
  videoPlayerContainer: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: "black",
  },
  videoListContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  videoListItem: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
});

export default AppTutorials;
