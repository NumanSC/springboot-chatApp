// export const productReducers = (state, action) => {
//   switch (action.type) {
//     case "ADD_PRODUCT":
//       console.log("giriş");

//       console.log(state.top);
//       const checkbasket = state.top.find((item) => item.id === action.payload.id);
//       if (checkbasket) {
//         console.log(checkbasket);
//         console.log(state.top);
//         console.log("numan");

//         localStorage.setItem(checkbasket.id, checkbasket.adet);
//         localStorage.setItem("urunler", state);
//         checkbasket.adet += 1;

//         return { top: [...state.top.filter((item) => item.id !== action.payload.id), checkbasket] };
//       } else {
//         console.log(state.top);

//         return { top: [...state.top, { id: action.payload.id, adet: 1, img: action.payload.img, title: action.payload.title, price: action.payload.price }] };
//       }
//     // return  { ...state,

//     //  top : [{ id:action.payload.id, adet : state.top.adet }]
//     // }
//     // case "FILTER_PRODUCT" :
//     // const filterBasket = state.urunler.find(item => item.action.payload.kindFilter === action.payload.urun );
//     // return {filterProducts : [urunler : filterBasket] }

//     case "GET_PRODUCT":
//       console.log(state.top);
//       return state;
//     default:
//       return state;
//   }
// };
