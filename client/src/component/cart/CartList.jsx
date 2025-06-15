import { useEffect } from 'react';
import CartSkeleton from '../../skeleton/CartSkeleton';
import CartSubmitButton from './CartSubmitButton';
import CartStore from '../../store/CartStore';

const CartList = () => {
    const {CartList,CartCount,CartTotal,CartTotalVAT,CartPayable,CartListRequest,CreateInvoiceRequest,RemoveCartListRequest}=CartStore()
    useEffect(()=>{
        (async()=>{
            console.log("aabbb")
            await CartListRequest();
        })()
    },[])
    const remove=async(id)=>{
        await RemoveCartListRequest(id)
        await CartListRequest()

    }


    if(CartList===null){
       return( <CartSkeleton></CartSkeleton>)
    }
    else if(CartList.length===0){
        return(<div className='container'>
            <div className='row mt-5'>
                <img src="https://cdn.pixabay.com/photo/2024/01/29/04/17/shoping-8538767_1280.png"alt="no item in the Cart"style={{ width: "450px", height: "450px", objectFit: "cover" }} className="d-block mx-auto"  />
            </div>
        </div>
        )
    }else{
        return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                <div className="card p-4">
                    <ul className="list-group list-group-flush">
                         { CartList.map((item,i)=>{
                            let price = item['product']['price']
                            if(item['product']['discount']){
                                price= item['product']['discountPrice'];
                            }
                    return(<li key={i} className="list group-item d-flex justify-content-between align-items-start">
                    <img className="rounded-1" width="90" height="auto" src={item['product']['image']} />
                    <div className="ms-2 me-auto">
                    <p className="fw-lighter m-0">{item['product']['title']}</p>
                    <p className="fw-lighter my-1">Unit Price: {price},Qty: {item['qty']}, Size: {item['size']},Color: {item['color']}</p>
                    <p className=" h6 fw-bold m-0 text-dark">Total <i className="bi bi-currency-dollar"></i>
                    {parseInt(price)*parseInt(item['qty'])} </p>
                    </div>
                    <button onClick={()=>remove(item['product']['_id'])} className="btn btn-sm btn-outline-danger"> <i className="bi bi-trash"></i>
                    </button>
                    </li> ) }) } </ul>
                    <div className="my-4">
                        <ul className="list-group bg-transparent  list-group-flush">
                            <li className="list-group-item bg-transparent h6 m-0 text-dark">
                            <span className="float-end">Total: <i className="bi bi-currency-dollar" />{CartTotal} </span>
                            </li>
                            <li className="list-group-item bg-transparent h6 m-0 text-dark">
                            <span className="float-end"> Vat(5%): <i className="bi bi-currency-dollar" />{CartTotalVAT} 
                            </span>
                            </li>
                            <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                <span className="float-end"> Payable: <i className="bi bi-currency-dollar" />{CartPayable} 
                                </span>
                            </li>
                            <li className="list-group-item bg-transparent ">
                                <span className="float-end">
                                    <CartSubmitButton text="Check Out " onClick={async ()=> {await CreateInvoiceRequest()}} 
                                    className="btn px-5 mt-2 btn-success"/>
                                </span>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }

    
};

export default CartList;