import store, {RootState} from '../redux/store';

export const customFetch = (uri: string, options: any) => {
  let state: RootState = store.getState()
  let refreshingPromise: any = null;
  let initialRequest = fetch(uri, options)

  return initialRequest.then((response) => {
    return(response.json())
  }).then((json) => {
    if (json && json.errors && json.errors[0] && json.errors[0].message === 'Invalid token specified') {
      if (!refreshingPromise) {

        let refresh_token = 'some_refresh_token' //state.refresh_token;
        let client_id = 'some client id';  // Config.REACT_APP_CLIENT_ID
        let address = `http://localhost:4004/o/token/?grant_type=refresh_token&
           refresh_token=${refresh_token}&client_id=${client_id}`;

        refreshingPromise = fetch(address, { method: 'POST' })
          .then((refresh_token_repsonse) => {
            if(refresh_token_repsonse.ok){
              return refresh_token_repsonse.json().then((refreshJSON) => {
                // Save the new refresh token to your store or wherever you are keeping it
                // saveRefreshToken(refreshJSON.refresh_token)
                // Return the new access token as a result of the promise
                return refreshJSON.access_token
              })
            }else{
              // If the re-authorization request fails, handle it here
              // You can log user out, or display some sort of session has ended alert
              // logUserOut()
            }
          })
      }
      return refreshingPromise.then((newAccessToken: any) => {
        refreshingPromise = null;
        options.headers.Authorization = `Bearer ${newAccessToken}`
        return fetch(uri, options);
      })
    }

    // If there were no errors in the initialRequest, we need to
    let result: any = {}
    result.ok = true
    result.json = () => new Promise(function(resolve, reject) {
      resolve(json);
    })
    return result
  })
}
