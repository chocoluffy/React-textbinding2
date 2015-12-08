var cat = React.createClass({
	getInitialState: function(){
		return {name: null}
	},

	render() {
		return (
			<div>
				<p> you are saying: {this.state.name} </p>
				<input type='text' onChange={this.updateName} />
			</div>
		);
	}, 

	updateName: function(event){
		this.setState({name: event.target.value});
	}
});

React.render(<cat/>, document.getElementById('cat'));