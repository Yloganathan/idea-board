import React from 'react';
import { NavLink } from 'react-router-dom';
import './IdeaCard.scss';

import UpvoteIcon from '../../Icons/UpvoteIcon';
import CommentIcon from '../../Icons/CommentIcon';
import DeleteIcon from '../../Icons/DeleteIcon';



const IdeaCard = ({idea, onUpvote, onDelete}) => {
	const pathname = `/ideas/${idea.id}`;

	return (
		<NavLink className='idea-card' to={{pathname, selectedIdea: idea}}>
			<div className='idea-card__title-delete'>
				<div className='idea-card__title'>{idea.title}</div>
				<div className='idea-card__delete-icon-container' onClick={(e) => onDelete(e, idea)}>
					<DeleteIcon className='idea-card__delete-icon'/>
				</div>
			</div>
			<div className='idea-card__body'>{idea.body}</div>
			<div className='idea-card__stats'>
				<div className='idea-card__upvotes'>
					<div className='idea-card__upvote-icon-container' onClick={(e) => onUpvote(e, idea)}>
						<UpvoteIcon className='idea-card__upvote-icon' />
					</div>
					<div className='idea-card__upvote-count'>{idea.upvotes}</div>
				</div>
				<div className='idea-card__comments'>
					<CommentIcon className='idea-card__comment-icon' />
					<div className='idea-card__comment-count'>{idea.comments.length}</div>
				</div>
			</div>
		</NavLink>
	);
}

export default IdeaCard;