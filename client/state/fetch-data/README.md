fetch-data
==========

This is a utility that fetches data from an API and caches it in redux state.
It allows use of fetched data from multiple React components and will
automatically fetch the data the first time a component receives props.

#### How it works:

`fetch-data` keeps track of `fetch` objects to cache their data and fetch from
their APIs when needed. React components can then use a Higher Order Component (HOC)
to add the fetched data to themselves as a property.

##### The `fetch` object.

A `fetch` object is defined as such:

```js
{
  service: 'my-api',
  key: '/my/api/endpoint?query=abc',
  defaultValue: [],
  shouldUpdate: ( fetch, fetchStatus ) => {  },
  action: ( state ) => fetchAction( service, key, url, params ),
}
```

* `service` is a unique string identifier for the api (e.g. 'wp-api')
* `key` is a unique string identifier for the fetched data (must include anything that could change the data, e.g. query parameters)
* `defaultValue` is the value given to props when the fetch data isn't available
* `shouldUpdate` is a `function( fetch, data )` that returns true if the fetch should be updated
* `action` is a `function( state )` that returns a redux action. `fetchAction` should be used to create this action.
This will handle both successful and error results from the fetch, and update the `fetch-data` cache state in redux accordingly.

The following `updateWhen` helper functions are available for `shouldUpdate`. See below for an example.
* `notFetched( timeout )` - Simply checks if the fetch data is available or not, and accepts a timeout to preventing rapid fire requests.

#### How to use:

1. Create a function that returns a `fetch` object. This can be done in your own
API file to keep all the `fetch` objects together.

Note: The `params` of `fetchAction` match the `init` params of the [HTTP fetch
interface](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)

```js
import { fetchAction, updateWhen } from 'fetch-data';

function fetchApiData( queryString ) {
  const baseUrl = 'http://my.api';
  const endpoint = '/my/api/endpoint/';
  const fullUrl = baseUrl + endpoint + queryString;
  const params = {
    method: 'GET',
    headers: new Headers( { x-custom-value: 'true' } );
  };

  const service = 'my-api';
  const key = endpoint + queryString;

  return {
    service,
    key,
    defaultValue: [],
    shouldUpdate: updateWhen.notFetched( 20000 ),
    action: ( state ) => fetchAction( service, key, fullUrl, params );
  };
}
```

2. From your React Component, use `mapFetchProps` and `fetchConnect` to create a Higher Order Component to use the `fetch` you've created.

```js
import fetchConnect from 'fetch-data/fetch-connect';
import { fetchApiData } from 'fetch-data-enabled-api';

function myReactComponent( props ) {
  return (
    <div>
      { myApiData }
    </div>
  );
}

function mapFetchProps( props ) {
  const { apiQuery } = props;

  return {
    myApiData: fetchApiData( apiQuery ),
  };
}

export default fetchConnect( mapFetchProps )( myReactComponent );
```

By doing this, the react component will gain a property called `myApiData` that
will be set to the current cached state of the fetched data, or to `defaultValue`
if the fetched data is not available. When the data becomes fetched, this component
will update with the new value in its props.

3. If you want to display or use status information about the fetch,
the `fetchConnect` component provides `getFetchStatus()` as a convenience function.

Example:
```js
render() {
  const { lastFetchTime, lastSuccessTime } = this.props.getFetchStatus( 'myApiData' );
  const fetchSeconds = ( lastSuccessTime - lastFetchTime ) / 1000;

  return (
    <span>Fetch took { fetchSeconds || '?' } seconds.</span>
  );
}
```

4. If you don't want to use the `fetchConnect` higher order component, you can also use
the selector functions directly:

Example:
```js
import { getFetchData, getFetchStatus } from 'fetch-data';
import { fetchApiData } from 'fetch-data-enabled-api';

// Do this when setting up your fetch.
const fetch = fetchApiData( 'api_query' );
const dataSelector = selectFetchData( fetch );
const statusSelector = selectFetchStatus( fetch );

// Do this for rendering
const apiData = dataSelector( reduxState );
const fetchStatus = dataSelector( reduxState );

```

In this example, the entire redux state is passed in and the selector will
retrieve the fetch state data from the appropriate part of the redux state tree.

