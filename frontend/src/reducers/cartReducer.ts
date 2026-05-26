
interface cartItem {
    id: number, 
    title: string, 
    price: number,
    image: string,
    quantity: number
}

type CartAction = 
    | {
        type: "ADD_ITEM", 
        payload: Omit<cartItem , "quantity">; 
    }

    |{
        type: "REMOVE_ITEM", 
        pyload: number
    }

    |{
        type: "INCREASE", 
        pyload: number
    }

    |{
        type: "DECREASE", 
        pyload: number
    }

    |{
        type: "CLEAR_CART",
        payload: number
    };


export function cartReducer (state: cartItem[] , action: CartAction) {

    switch(action.type){

        case "ADD_ITEM": 
            const exists = state.find(
                item => item.id === action.payload.id
            )

            if(exists) {
                return state.map(item=> 
                    item.id === action.payload.id 
                    ? {...item, quantity: item.quantity + 1} 
                    : item
                ); 
            }

            return [
                ...state, 
                {
                    ...action.payload, 
                    quantity: 1
                }
            ]
        
        case "REMOVE_ITEM": 
            return state.filter(
                item => item.id !== action.pyload
            )
        
        case "CLEAR_CART": 
            return [];
       

        case "INCREASE": 
            return state.map(item =>
                item.id === action.pyload 
                ? {
                    ...item, 
                    quantity: item.quantity + 1
                }: 
                item
            )
        
        case "DECREASE": 
            return state.map(item => 
                item.id === action.pyload 
                ? {
                    ...item, 
                    quantity: item.quantity - 1 
                }: 
                item
            ).filter(
                item => item.quantity > 0
            )
    }

}