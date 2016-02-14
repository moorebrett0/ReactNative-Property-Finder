/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

 var React = require('react-native');
 var SearchPage = require('./SearchPage');
 var styles = React.StyleSheet.create({
   text: {
     color: 'black',
     backgroundColor: 'white',
     fontSize: 30,
     margin: 80
   },
   container: {
   flex: 1
 }
 });
 class HelloWorld extends React.Component {
   render() {
     return (
       <React.NavigatorIOS
         style={styles.container}
         initialRoute={{
           title: 'Property Finder',
           component: SearchPage,
         }}/>
     );
   }

 }
    class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: SearchPage,
        }}/>
    );
  }
}

 React.AppRegistry.registerComponent('PropertyFinderApp', function() { return PropertyFinderApp });
 React.AppRegistry.registerComponent('HelloWorld', function() { return HelloWorld });
