import React from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

class App extends React.Component{
	constructor(){
		super()
		this.state = {
			Robots: [],
			searchfield: ''
		}
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> {
				return response.json();
			})
			.then(users => {
				this.setState({Robots: users});
			})
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});
		}
		// console.log(filteredRobots); 
		// (x.target.value) will let console.log express waht you typed
	

	render() {
		const filteredRobots = this.state.Robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		if (this.state.Robots.length === 0) {
			return <h1 className='tc'>Loading</h1>
		} else{
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<Searchbox searchChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList Robots={filteredRobots} />
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}
	}	
}


// const App = () => {
// 	return (
// 		<div className='tc'>
// 			<h1>RoboFriends</h1>
// 			<Searchbox />
// 			<CardList Robots={Robots} />
// 		</div>
// 	);
// }

export default App;