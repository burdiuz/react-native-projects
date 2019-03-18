import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { createCacheStorage, getCachedFactories } from './cache';

const { Provider, Consumer } = createContext();

export class ProjectsApiProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    cacheStorage: PropTypes.shape({}),
    onAvailable: PropTypes.func,
  };

  static defaultProps = { cacheStorage: createCacheStorage(), onAvailable: undefined };

  static getDerivedStateFromProps({ cacheStorage }, { storage } = {}) {
    if (cacheStorage === storage) {
      return null;
    }

    return {
      storage: cacheStorage,
      factories: getCachedFactories(),
    };
  }

  constructor(props) {
    super(props);

    this.state = ProjectsApiProvider.getDerivedStateFromProps(props);
  }

  componentDidMount() {
    const { onAvailable } = this.props;

    if (onAvailable) {
      onAvailable({ ...this.state });
    }
  }

  render() {
    const { children } = this.props;
    const { factories } = this.state;

    return <Provider value={factories}>{children}</Provider>;
  }
}

export const withProjectsApi = (ChildComponent, displayName = '') => {
  const Wrapper = (props) => (
    <Consumer>{(projectsApi) => <ChildComponent {...props} projectsApi={projectsApi} />}</Consumer>
  );

  Wrapper.displayName =
    displayName || `withProjectsApi(${Component.displayName || Component.name})`;

  return Wrapper;
};
