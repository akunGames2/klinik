/**
 * Swiper
 * Renders a swipable set of screens passed as children,
 * pagination indicators and a button to swipe through screens
 * or to get out of the flow when the last screen is reached
 */

 import React, { Component } from 'react'
 import {
   Dimensions, // Detects screen dimensions
   Platform, // Detects platform running the app
   ScrollView, // Handles navigation between screens
   StyleSheet, // CSS-like styles
   View, // Container component
   Button,
 } from 'react-native'
 
 // Detect screen width and height
 const { width, height } = Dimensions.get('window')
 
 export default class OnBoardingPanel extends Component {
   // Props for ScrollView component
   static defaultProps = {
     // Arrange screens horizontally
     horizontal: true,
     // Scroll exactly to the next screen, instead of continous scrolling
     pagingEnabled: true,
     // Hide all scroll indicators
     showsHorizontalScrollIndicator: false,
     showsVerticalScrollIndicator: false,
     // Do not bounce when the end is reached
     bounces: false,
     // Do not scroll to top when the status bar is tapped
     scrollsToTop: false,
     // Remove offscreen child views
     removeClippedSubviews: true,
     // Do not adjust content behind nav-, tab- or toolbars automatically
     automaticallyAdjustContentInsets: false,
     // Fisrt is screen is active
     index: 0,
   }
 
   state = this.initState(this.props)
 
   /**
    * Initialize the state
    */
   initState(props) {
     // Get the total number of slides passed as children
     const total = props.children ? props.children.length || 1 : 0
 
     // Current index
     const index = total > 1 ? Math.min(props.index, total - 1) : 0
     // Current offset
     const offset = width * index
 
     const state = {
       total,
       index,
       offset,
       width,
       height,
     }
 
     // Component internals as a class property,
     // and not state to avoid component re-renders when updated
     this.internals = {
       isScrolling: false,
       offset,
     }
 
     return state
   }
 
   /**
    * Scroll begin handler
    * @param {object} e native event
    */
   onScrollBegin = () => {
     // Update internal isScrolling state
     this.internals.isScrolling = true
   }
 
   /**
    * Scroll end handler
    * @param {object} e native event
    */
   onScrollEnd = (e) => {
     const { width: w } = this.state
     // Update internal isScrolling state
     this.internals.isScrolling = false
 
     // Update index
     this.updateIndex(
       e.nativeEvent.contentOffset ? e.nativeEvent.contentOffset.x : e.nativeEvent.position * w
     )
   }
 
   /*
    * Drag end handler
    * @param {object} e native event
    */
   onScrollEndDrag = (e) => {
     const {
       contentOffset: { x: newOffset },
     } = e.nativeEvent
     const { children } = this.props
     const { index } = this.state
     const { offset } = this.internals
 
     // Update internal isScrolling state
     // if swiped right on the last slide
     // or left on the first one
     if (offset === newOffset && (index === 0 || index === children.length - 1)) {
       this.internals.isScrolling = false
     }
   }
 
   /**
    * Update index after scroll
    * @param {object} offset content offset
    */
   updateIndex = (offset) => {
     const { state } = this
     const diff = offset - this.internals.offset
     const step = state.width
     let { index } = state
 
     // Do nothing if offset didn't change
     if (!diff) {
       return
     }
 
     // Make sure index is always an integer
     index = parseInt(index + Math.round(diff / step), 10)
 
     // Update internal offset
     this.internals.offset = offset
     // Update index in the state
     this.setState({
       index,
     })
   }
 
   /**
    * Swipe one slide forward
    */
   swipe = () => {
     const { total, index } = this.state
     // Ignore if already scrolling or if there is less than 2 slides
     if (this.internals.isScrolling || total < 2) {
       return
     }
 
     const { state } = this
     const diff = index + 1
     const x = diff * state.width
     const y = 0
 
     // Call scrollTo on scrollView component to perform the swipe
     if (this.scrollView) {
       this.scrollView.scrollTo({ x, y, animated: true })
     }
 
     // Update internal scroll state
     this.internals.isScrolling = true
 
     // Trigger onScrollEnd manually on android
     if (Platform.OS === 'android') {
       setImmediate(() => {
         this.onScrollEnd({
           nativeEvent: {
             position: diff,
           },
         })
       })
     }
   }
 
   /**
    * Render ScrollView component
    * @param {array} slides to swipe through
    */
   renderScrollView = (pages) => {
     const { style } = this.props
     return (
       <ScrollView
         ref={(component) => {
           this.scrollView = component
         }}
         {...this.props}
         contentContainerStyle={[styles.wrapper, style]}
         onScrollBeginDrag={this.onScrollBegin}
         onMomentumScrollEnd={this.onScrollEnd}
         onScrollEndDrag={this.onScrollEndDrag}
       >
         {pages.map((page, i) => (
           // Render each slide inside a View
           <View style={[styles.fullScreen, styles.slide]} key={i}>
             {page}
           </View>
         ))}
       </ScrollView>
     )
   }
 
   /**
    * Render pagination indicators
    */
   renderPagination = () => {
     const { total, index } = this.state
     if (total <= 1) {
       return null
     }
 
     const ActiveDot = <View style={[styles.dot, styles.activeDot]} />
     const Dot = <View style={styles.dot} />
 
     const dots = []
 
     for (let key = 0; key < total; key += 1) {
       dots.push(
         key === index ? React.cloneElement(ActiveDot, { key }) : React.cloneElement(Dot, { key })
       )
     }
     return (
       <View pointerEvents="none" style={[styles.pagination, styles.fullScreen]}>
         {dots}
       </View>
     )
   }
 
   /**
    * Render Continue or Done button
    */
   renderButton = () => {
     const { onSkip } = this.props
     return (
       // const lastScreen = this.state.index === this.state.total - 1
       <View pointerEvents="box-none" style={[styles.buttonWrapper, styles.fullScreen]}>
         <Button color="#6C63FF" title="Skip >" onPress={onSkip} />
       </View>
     )
   }
 
   /**
    * Render the component
    */
   render = ({ children } = this.props) => {
     return (    
     <View style={[styles.container, styles.fullScreen]}>
       {/* Render screens */}
       {this.renderScrollView(children)}
       {/* Render pagination */}
       {this.renderPagination()}
       {/* Render Continue or Done button */}
       {this.renderButton()}
     </View>
   )}
 }
 
 const styles = StyleSheet.create({
   // Set width and height to the screen size
   fullScreen: {
     width,
     height,
   },
   // Main container
   container: {
     backgroundColor: 'transparent',
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   // Slide
   slide: {
     backgroundColor: 'transparent',
   },
   // Pagination indicators
   pagination: {
     position: 'absolute',
     bottom: 50,
     left: 0,
     right: 0,
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'flex-end',
     backgroundColor: 'transparent',
   },
   // Pagination dot
   dot: {
     // backgroundColor: 'black',
     backgroundColor: '#6C63FF',
     // borderColor: '#FFFFFF',
     // borderWidth: Dimens.borderThin,
     width: 8,
     height: 6,
     borderRadius: 4,
     marginLeft: 3,
     marginRight: 3,
     marginTop: 3,
     marginBottom: 3,
   },
   // Active dot
   activeDot: {
     width: 24,
     backgroundColor: '#6C63FF',
   },
   // Button wrapper
   buttonWrapper: {
     backgroundColor: 'transparent',
     // position: 'absolute',
     // bottom: Dimens.buttonHeight,    
     // flex: 1,
     // bottom: 0,    
     // justifyContent: 'flex-end',
     // alignItems: 'stretch',    
     // width: '100%',
     // height: 50,    
     justifyContent: 'flex-end',
     alignItems: 'stretch',
     position: 'absolute', //Here is the trick
     bottom: 0, //Here is the trick
     borderRadius: 0
   },
 })
 