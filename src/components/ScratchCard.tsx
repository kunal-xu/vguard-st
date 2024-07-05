import * as React from 'react'
import { Image, StyleSheet, View, Text } from 'react-native'
import { ScratchCard } from 'rn-scratch-card'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Something went wrong.</Text>
        </View>
      )
    }

    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <Image source={require('@/src/assets/images/scratch_foreground.png')} style={styles.background_view} />
        <ScratchCard
          source={require('@/src/assets/images/ic_rewards_gift.png')}
          brushWidth={50}
          onScratch={handleScratch}
          style={styles.scratch_card}
        />
      </View>
    </ErrorBoundary>
  )

  function handleScratch(scratchPercentage) {
    console.log(scratchPercentage)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  background_view: {
    position: 'absolute',
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 16,
  },
  scratch_card: {
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
})
