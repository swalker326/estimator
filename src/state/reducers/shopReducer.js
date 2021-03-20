const Reducer = (state, action) => {
  switch(action.type){
    case 'SET_SHOP':
      return{
        ...state,
        shopId: action.shopId,
        shopData: action.shopData,
      };
    case 'SET_REQUEST':
      return {
        ...state,
        currentRequest: action.currentRequest
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    case 'SET_ERROR':
      return {
        ...state,
        loginError: action.loginError
      };
    case 'SET_AUTH':
      return {
        ...state,
        auth: action.auth
      };
    default: return state;
  };
};

export default Reducer;