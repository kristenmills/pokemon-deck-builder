var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var bootstrap = require('react-bootstrap');
var Col = bootstrap.Col;
var Input = bootstrap.Input;
var Button = bootstrap.Button;
var Alert = bootstrap.Alert;

var PokemonAdd = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      quantity: 1,
      cards: '',
      alertVisible: false
    };
  },

  componentDidMount: function() {
    var sets = this.props.cards;
    var select = $(this.refs.select).selectize({
      options: sets.cardData,
      labelField: 'name',
      valueField: 'imageFile',
      searchField: ['name'],
      onChange: this.updateCard
    });

    this.setState({select: select[0].selectize});
  },

  componentDidUpdate: function() {
    this.state.select.addOption(this.props.cards.cardData);
  },

  render: function() {
    var alert;
    if (this.state.alertVisible) {
      alert =  (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          There was a problem with that pokemon.
        </Alert>
      );
    } else {
      alert = <span></span>;
    }
    return (
      <div>
        {alert}
        <form onSubmit={this.onSubmit}>
          <Col md={1} mdOffset={3}>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" className="form-control width-100" valueLink={this.linkState('quantity')} min="0" />
            </div>
          </Col>
          <Col md={3}>
            <div className="form-group">
              <label>Card</label>
              <select ref="select" placeholder="Pick a card...">

              </select>
            </div>
          </Col>
          <Col md={2} >
            <div className="form-group add-button">
              <Button type="submit">Add</Button>
            </div>
          </Col>
        </form>
        <br />
        <br />
        <br />
      </div>
    );
  },

  updateCard: function(value) {
    this.setState({card: value});
  },

  onSubmit: function(event) {
    event.preventDefault();
    if( parseInt(this.state.quantity) === 0 ||
        isNaN(parseInt(this.state.quantity)) ||
        this.state.set === "" ) {
      this.setState({alertVisible: true});
    } else {
      this.props.onAdd({
        quantity: parseInt(this.state.quantity),
        card: this.state.card
      });
      this.setState({card: '', quantity: 1});
      this.state.select.clear();
    }
  },

  handleAlertDismiss: function() {
    this.setState({alertVisible: false});
  }
});

module.exports = PokemonAdd;