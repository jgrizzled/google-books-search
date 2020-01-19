import React from 'react';
import styled from 'styled-components';

const Li = styled.li`
  display: flex;
  flex-direction: column;
  margin: 2rem 0.5rem;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem -0.125rem rgba(10, 10, 10, 0.1);
  background: ${props => props.theme.color.surface};
  color: ${props => props.theme.color.onSurface};
  img {
    margin-right: 1rem;
  }
  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
  a {
    font-weight: 700;
  }
`;

const TopContainer = styled.div`
  display: flex;
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSize.small};
  padding: 0.5rem;
  line-height: 1rem;
`;

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
  render() {
    return (
      <Li onClick={this.toggleExpand}>
        <TopContainer>
          {this.props.book.imageLink && (
            <a
              href={this.props.book.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={this.props.book.imageLink} alt="thumbnail" />
            </a>
          )}
          <span>
            <p>
              <a
                href={this.props.book.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.book.title}
              </a>
            </p>
            <p>
              Authors:&nbsp;
              {this.props.book.authors.join(', ')}
            </p>
            <p>
              Year:&nbsp;
              {this.props.book.yearPublished}
            </p>
            <p>
              Price:{' '}
              {Number(this.props.book.price) > 0 &&
                ' $' + this.props.book.price}
            </p>
            <p>{this.props.book.saleability}</p>
          </span>
        </TopContainer>
        {this.state.expanded ? (
          <div>
            <Description>{this.props.book.description}</Description>
          </div>
        ) : (
          this.props.book.description && '...'
        )}
      </Li>
    );
  }
}
