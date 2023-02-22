import React, { useEffect, useState } from 'react';
import { api } from "../../services/api";

import './index.css'

export function Form() {
  

  const [sectors, setSectors] = useState();

  useEffect(() => {
    async function fetchBuscaPorData() {
      const response = await api.get(`/sectors`);
      return setSectors(response.data);
    }

    fetchBuscaPorData();
    
  },[])

  async function handleSaveData(){
    await api.post("/");
  }

  return (
    <>
        <div className="container-total">
          <div className='container'>
            <form onSubmit={handleSaveData}>
                <div className='label-div'>
                  <label htmlFor="nome">Name:</label>
                  <input type="text" id="nome" name="name"  />
                </div>

                <div className='label-div'>
                  <label htmlFor="sectors">Sectors:</label>
                  <select id="sectors" name="sectors" >
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
                  <input type="checkbox" id="termos" name="termos" />
                  <label htmlFor="termos">Aceitar termos</label>
                </div>

                <button type="submit" value="submit">Enviar</button>
            </form>
            <a href="">Edit your answer</a>
          </div>
        </div>
    </>
  );
};


