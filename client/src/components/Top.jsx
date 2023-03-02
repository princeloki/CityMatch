import React from "react";
import { GiModernCity } from "react-icons/gi"

function Top(props){

    const pushDown = ()=>{ 
        console.log('clicked')
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }

    return(
        
        <section className="top">
            <div className={props.isAnimated ? "top-left-bar disappear" : "top-left-bar"}></div>
            <div className={props.isAnimated ? "top-right-bar disappear" : "top-right-bar"}></div>
            <div className="container">
                <div className={props.isAnimated ? 'top-cont disappear' : 'top-cont'}>
                    <GiModernCity className="main-icon"/>
                    <h1 className="title">CityMatch</h1>
                    <p className="about">
                        Moving to a new city? New Country? Is it hard finding a location that 
                        matches your budget? Your ideal lifestyle? Hopefully by using this website, you will
                        be able to zero in on your dream city in little to no time.
                    </p>
                    <div className="navigate">
                        <button onClick={pushDown} className="start" href="#">Start</button>
                        <button onClick={props.handlePop} className="start" href="#">Help</button>
                    </div>
                    <div className="anim">
                        <div className="cat"></div>
                        <div className="dog"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Top;