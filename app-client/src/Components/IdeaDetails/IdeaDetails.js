import React, { Component } from 'react';
import './IdeaDetails.scss';
import { API } from "aws-amplify";
import UpvoteIcon from '../../Icons/UpvoteIcon';

export default class IdeaDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			idea: null,
			comment: ''
		};

		this.onCommentChange = this.onCommentChange.bind(this);
		this.onUpvoteChange = this.onUpvoteChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	async componentWillMount() {
		try {
			const idea = await this.getIdea();
			this.setState({ idea });
		} catch (e) {
			alert(e);
		}
	}

	getIdea() {
		return API.get("ideas", this.props.location.pathname);
	}

	render() {
		let commentLabel = 'There are no comments on this idea';
		const idea = this.state.idea;
		const title = idea ? idea.title : '';
		const body = idea ? idea.body : '';
		const upvotes = idea ? idea.upvotes : 0;

		let commentList = null
		if (idea && idea.comments && idea.comments.length) {
			commentList = idea.comments.map(comment => <div key={comment} className='idea-details__comment'>{comment}</div>);
			commentLabel = 'Comments'
		}

		return (
			<div className='idea-details'>
				<div className='idea-details__idea'>
					<div className='idea-details__title'>{title}</div>
					<div className='idea-details__body'>{body}</div>
					<div className='idea-details__upvotes'>
						<UpvoteIcon className='idea-details__upvote-icon' />
						<div className='idea-details__upvote-count'>{upvotes}</div>
					</div>
				</div>
				<div className='idea-details__comment-input'>
					<textarea className='idea-details__comment-textarea' placeholder='Type comment here...' value={this.state.comment} onChange={(e) => this.onCommentChange(e)} />
					<button className='idea-details__comment-submit' onClick={this.onSubmit} disabled={!this.state.comment}>Save Comment</button>
				</div>
				<div className='idea-details__comments'>
					<div className='idea-details__comment-label'>{commentLabel}</div>
					{commentList}
				</div>
			</div>
		);
	}

	onCommentChange(e) {
		this.setState({ comment: e.target.value });
	}

	onUpvoteChange(e) {
		this.setState({ upvotes: this.state.upvotes + 1 });
		let updated_idea = this.state.idea;
		updated_idea.upvotes = this.state.upvotes;
		API.patch("ideas", this.props.location.pathname, {
			body: updated_idea
		});
	}

	onSubmit() {
		let updated_idea = this.state.idea;
		updated_idea.comments.push(this.state.comment);

		API.patch("ideas", this.props.location.pathname, {
			body: updated_idea
		});
		this.setState({ idea: updated_idea, comment: '' });
	}
}
