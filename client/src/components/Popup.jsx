import React from 'react';

function Popup(props){
    return(
        <div className={props.popActive ? 'pop-up cover' : 'pop-up'}>
            <p>
               <span className="small-sen">
                The data delivered is based on crowd sourced information from thousands of expats 
                living across the world.  
                </span>
                <br/>
                <span className="warning bigger"><br></br>Note:</span>  As cost-of-living tends to not vary much from city to city 
                within the same country, results may not be as accurate nor as satisfactory as you would like. For more 
                accurate results, it is <span className="warning">recommended</span> to instead search without inputting a specific country 
                unless you alread have a destination country in mind. 
                <br />
                <br />
                <span className="small-sen">Currency is rated in USD until currency features get implemented.</span>
                <br />
                <span className="small-sen">Quality of Life is measured on a scale of 0-100 in accordance with UN QOL regulations.</span>
            </p>
            <button className="pop-button1" onClick={props.handlePop}>Back</button>
        </div>
    )
}

export default Popup;