

import React, { useState, useEffect, useRef } from 'react';
import { BiUpArrowCircle } from 'react-icons/bi'
import { axiosInstance } from '../config';
import axios from 'axios'

const Center = (props) => {
  const formRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          props.setIsAnimated(true);
        } else{
            props.setIsAnimated(false);
        }
      });
    }, options);

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const [error, setError] = useState("Enter")
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState({
    total: '',
    rent: '',
    country: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const { total, rent } = formData;
    if (!total) {
      showError("ENTER YOUR TOTAL BUDGET!");
      return;
    }
    if (!rent) {
      showError("ENTER YOUR RENT!");
      return;
    }
    if(isNaN(parseInt(total))){
      showError("COST MUST BE A NUMBER");
      return;
    }

    if(isNaN(parseInt(rent))){
      showError("RENT MUST BE A NUMBER");
      return;
    }

    
    props.handleSecPop();
    axios
      .post("/cities", formData)
      .then(handleSuccess)
      .catch(handleError);
  
    function handleSuccess(data) {
      if (data.data.message === "Success") {
        setError("");
        setShowError(false);
        props.setSearchData(data.data.data);
      } else {
        setShowError(true)
        showError(data.data.message);
      }
    }
  
    function handleError(err) {
      console.error(err);
      showError("OOPS! (check country)");
    }
  
    function showError(error) {
      setShowError(true);
      setError(error);
    }
  }

  const pushUp = ()=>{ 
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
  }


  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className='center'>
      <div className='container' ref={formRef}>
        {showError && <h3 className='error'>{error}</h3>}
        <h2 className='title2'>Find Your Ideal City</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='total'>Cost ($)</label>
          <input
            id='total'
            name='total'
            value={formData.total}
            onChange={(e) => handleChange(e)}
            type='text'
            placeholder='...Enter cost of living budget'
          />
          <label htmlFor='qol'>Rent($)</label>
          <input
            id='rent'
            name='rent'
            value={formData.rent}
            onChange={(e) => handleChange(e)}
            type='text'
            placeholder='...Enter Budget for rent'
          />
          <label htmlFor='country'>Country <span id="optional">(optional)</span></label>
          <input
            id='country'
            name='country'
            value={formData.country}
            onChange={(e) => handleChange(e)}
            type='text'
            placeholder='...Concentrate on a specific country'
          />
          <button className="submit-button" type='submit'>Search</button>
        </form>
        <BiUpArrowCircle onClick={pushUp} className='up-arr'/>
      </div>
      <div className={props.isAnimated ? 'bottom-bar animated-sec' : 'bottom-bar'}></div>
    </div>
  );
};

export default Center;
