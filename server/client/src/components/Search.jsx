

import React,{useState, useEffect} from 'react';

function Search(props){
    const [items, setItems] = useState(null)

    useEffect(() =>{
        if(props.searchData!=null){
            const newItems = props.searchData.map((data,index)=>{
                return(
                    <a href={`https://www.google.com/search?q=${data.Country},${data.City}`}  target="_blank" key={index} className='show-p'>{`${data.Country},`} <span className='wrap'>{data.City}</span> {`| COL - $${data.Col} | Rent - $${data.Rent} | QOL - ${data.QOL}`}</a>
                )
            })
            setItems(newItems.splice(0,5))
        }
    },[props.searchData]);

    function turnOff(){
        props.handleSecPop()
        setItems(null)
    }
    return(
      <div className={props.secPop? "search-box cover" : "search-box"}>
        {!items? <div className="lds-ring">
            <div></div><div></div><div></div><div></div>
        </div>
        : <div className='show'>{items}</div>}
        <button onClick={turnOff} className='pop-button'>Back</button>
    </div>
    )
}

export default Search;
