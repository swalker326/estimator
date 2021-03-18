const Reducer = (state, action) => {
  // console.log("action", action); // eslint-disable-line
  // console.log("state", state); // eslint-disable-line
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
    default: return state;
  };
};

export default Reducer;