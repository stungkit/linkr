import Link from 'react-router/lib/Link';
import range from 'range';
import React from 'react';

import context from '../util/context';
import Logo from './logo';

export default class Header extends React.Component {
  static propTypes = {
    selectIndex: React.PropTypes.number
  };
  static defaultProps = {
    selectIndex: -1
  };

  constructor(props) {
    super(props);

    this.state = {isMenuOpen: false};
  }

  renderMenuIcon() {
    return (
      <div
        className={`menu-icon ${this.state.isMenuOpen ? 'open' : ''}`}
        style={{
          marginLeft: 'auto',
          marginRight: 0
        }}
        onClick={() => {
          this.setState({
            isMenuOpen: !this.state.isMenuOpen
          });
        }}
      >
        <span />
        <span />
        <span />
      </div>
    );
  }

  render() {
    const {selectIndex} = this.props;
    const linkItems = [
      {
        name: 'SHORTEN',
        url: context.uris.HomeURI
      },
      {
        name: 'ADMIN',
        url: context.uris.AdminURI
      },
      {
        name: 'API',
        url: context.uris.APIDocumentationURI
      },
      {
        name: 'LOGIN',
        url: context.uris.LoginURI
      }
    ];

    return (
      <div className={`header container ${this.state.isMenuOpen ? 'expanded' : ''}`}>
        <div style={{
          display: 'table',
          width: '100%'
        }}>
          <div style={{
            display: 'table-cell'
          }}>
            <Logo />
          </div>

          <div style={{
            display: 'table-cell',
            verticalAlign: 'bottom'
          }}>
            {this.renderMenuIcon()}
          </div>
        </div>

        <div className="sans-serif bold iota text-primary margin--top transition" style={{
          opacity: this.state.isMenuOpen ? 1 : 0
        }}>
          {
            range.range(0, linkItems.length).map((idx) => {
              const link = linkItems[idx];
              return (
                <Link
                  key={`link_${idx}`}
                  className={`header-link-item ${idx === selectIndex ? 'link-selected' : ''} margin--right`}
                  to={link.url}
                >
                  {link.name}
                </Link>
              );
            })
          }
        </div>
      </div>
    );
  }
}
