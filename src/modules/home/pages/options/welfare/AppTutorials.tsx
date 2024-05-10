import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ videoUrl }) => {
  const [currentVideo, setCurrentVideo] = useState(videoUrl);

  return (
    <View style={styles.videoPlayerContainer}>
      <Video
        source={{ uri: currentVideo }}
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
          <Text style={styles.videoListItem}>Video {index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const AppTutorials = () => {
  const videos = [
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
    // Add more video URLs as needed
  ];
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  const handleVideoPress = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <View style={styles.container}>
      <VideoPlayer videoUrl={selectedVideo} />
      <VideoList videos={videos} onVideoPress={handleVideoPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  videoPlayerContainer: {
    flex: 1,
  },
  videoPlayer: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  videoListItem: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default AppTutorials;
