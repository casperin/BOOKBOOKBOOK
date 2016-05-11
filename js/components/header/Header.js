import React from 'react';
import {connect} from 'react-redux';
import Navigation from './Navigation';

const Header = ({location, children, error, loading}) => {
  return (<div className='header-component'>
    <Navigation location={location} />

    <div className='header-sub-container'>
      {children}
    </div>

    {loading
      ? <div className='loading-container'>{loading}</div>
      : null}

    {error
      ? <div className='error-container'>{error}</div>
      : null}
  </div>);
}

const mapStateToProps = state => {
  return {
    error: state.components.header.error,
    loading: state.components.header.loading
  };
};

export default connect(mapStateToProps)(Header);
