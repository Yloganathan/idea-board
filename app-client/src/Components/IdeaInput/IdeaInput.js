import React, { Component } from 'react';
import './IdeaInput.scss';


export default class IdeaInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: ''
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onBodyChange = this.onBodyChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	render() {
		return (
			<div className='idea-input'>
				<input className='idea-input__title' placeholder='Type idea title here...' value={this.state.title} onChange={(e) => this.onTitleChange(e)} />
				<textarea className='idea-input__body' placeholder='Type idea body here...' value={this.state.body} onChange={(e) => this.onBodyChange(e)} />
				<button className='idea-input__submit-btn' onClick={this.onSubmit} disabled={!this.state.title || !this.state.body}>Submit</button>
			</div>
		);
	}

	onTitleChange(e) {
		this.setState({ title: e.target.value });
	}

	onBodyChange(e) {
		this.setState({ body: e.target.value });
	}

	//TODO: Can we get the idea of the idea posted here and send it in the idea object argument for this.props.onSubmit(idea)
	onSubmit() {
		this.setState({title: '', body: ''});
		const idea = {
				title: this.state.title,
				body: this.state.body,
				upvotes: 0,
				comments: []
		}
		
		this.props.onSubmit(idea)
	}
}
