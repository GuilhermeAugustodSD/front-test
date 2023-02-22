import React, { useEffect, useState } from 'react';
import { api } from "../../services/api";
import { Link } from 'react-router-dom';

import './index.css'
import { type } from '@testing-library/user-event/dist/type';

export function Form() {
  

  const [sectors, setSectors] = useState();
  const [term, setTerm] = useState();
  const [select, setSelect] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    async function fetchBuscaPorData() {
      const response = await api.get(`/sectors`);
      return setSectors(response.data);
    }

    fetchBuscaPorData();
    
  },[])
  
  console.log(select);
  async function handleSaveData(){
    
    if(!term) {
      return alert("Term compliance is mandatory!");
    }

    await api.post("/", {
      name,
      sectors: select,
      term
    });

    setName()
    setSelect()
    setTerm()
  }

  function handleSaveSelect(e){
    setSelect(e.target.value)
  }

  return (
    <>
        <div className="container-total">
          <div className='container'>
            <form onSubmit={handleSaveData}>
                <div className='label-div'>
                  <label htmlFor="nome">Name:</label>
                  <input type="text" id="nome" name="name"  onChange={(e) => setName(e.target.value)} />
                </div>

                <div className='label-div'>
                  <label htmlFor="sectors">Sectors:</label>
                  <select id="sectors" name="sectors" onChange={(e) => handleSaveSelect(e)}>
                    {
                      sectors &&
                      sectors[0]?.map((optgroup, index) => (
                        <optgroup label={optgroup.text} key={optgroup.id}>
                          {
                            sectors[1]?.map((option) => (
                              <>
                                { optgroup.id === option.optgroups_id ?
                                  <option value={option.value}>{option.text}</option>
                                  : ""
                                }
                              </>
                            ))
                          }
                        </optgroup>
                      ))
                    }
                  </select>
                </div>
                
                <div className='term'>
                  <input type="checkbox" id="termos" name="termos" onChange={(e) => setTerm(e.target.value)}/>
                  <label htmlFor="termos">I agree to terms and conditions</label>
                </div>

                <button type="submit" value="submit">Enviar</button>
            </form>
            <Link to="/editform">Edit your answer</Link>
          </div>
        </div>
    </>
  );
};


