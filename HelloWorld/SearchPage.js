'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;
var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#f7931d',
  borderColor: '#f7931d',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#f7931d',
  borderRadius: 8,
  color: '#f7931d'
}
});
function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
};
class SearchPage extends Component {
  constructor(props) {
  super(props);
  this.state = {
    searchString: '',
    isLoading: false,
    message: ''
  };
}
onSearchTextChanged(event) {
  console.log('onSearchTextChanged');
  this.setState({ searchString: event.nativeEvent.text });
  console.log(this.state.searchString);
}
_executeQuery(query) {
  console.log(query);
  this.setState({ isLoading: true });
  fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
}
onSearchPressed() {
  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
  this._executeQuery(query);
}
_handleResponse(response) {
  this.setState({ isLoading: false , message: '' });
  if (response.application_response_code.substr(0, 1) === '1') {
    this.props.navigator.push({
  title: 'Results',
  component: SearchResults,
  passProps: {listings: response.listings}
});
  } else {
    this.setState({ message: 'Location not recognized; please try again.'});
  }
}
  render() {
    console.log('SearchPage.render');
    var spinner = this.state.isLoading ?
( <ActivityIndicatorIOS
    hidden='true'
    size='large'/> ) :
( <View/>);
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        <View style={styles.flowRight}>
        <TextInput
        style={styles.searchInput}
        value={this.state.searchString}
        onChange={this.onSearchTextChanged.bind(this)}
        placeholder='Search via name or postcode'/>
  <TouchableHighlight style={styles.button}
      underlayColor='#f7931d'>

    <Text style={styles.buttonText} onPress={this.onSearchPressed.bind(this)}>Go</Text>
  </TouchableHighlight>
</View>
<TouchableHighlight style={styles.button}
    underlayColor='#f7931d'>
  <Text style={styles.buttonText}>Location</Text>
</TouchableHighlight>
<Image source={require('image!house')} style={styles.image}/>
{spinner}
<Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }
}
module.exports = SearchPage;
