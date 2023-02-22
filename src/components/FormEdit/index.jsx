import './index.css'
import { api } from "../../services/api"
import { useEffect, useState } from 'react';
import { FiSave } from "react-icons/fi"
import { logDOM } from '@testing-library/react';
export function FormEdit(props) {

  const [name, setName] = useState();
  const [text, setText] = useState();
  const [sectorsBanco, setSectorsBanco] = useState();
  const [sectorsBancoUpdate, setSectorsBancoUpdate] = useState();

  async function handleSubmit(id){
    await api.put(`/${id}`, {
      name,
      sectors: sectorsBancoUpdate,
    });
  }

  useEffect(() => {
    async function handleSelect(){
      const response = await api.get(`/sectors/${props.sectors}`);
      setText(response.data.text);
    }

    handleSelect();
  },[props.sectors])

  useEffect(() => {
    async function fetchBuscaPorData() {
      const response = await api.get(`/sectors`);
      return setSectorsBanco(response.data);
    }

    fetchBuscaPorData();
    
  },[])

  console.log(text);
  
  return (
    <>
      <form className="row" onSubmit={handleSubmit(props.id)}>
        <div className="content">
          <div className="labels">
            <small>Name: {props.name}</small>
          </div>
          
          <div className="labels">
            <small>Sector: {text}</small>
          </div>
        </div>
        <div className="content-update">
          <input type="text" placeholder={props.name} onChange={(e) => setName(e.target.value)}/>

          <select name="sectors2" id="sectors2" onChange={(e) => setSectorsBancoUpdate(e.target.value)}>

            {
              sectorsBanco &&
              sectorsBanco[0]?.map((optgroup, index) => (
                <optgroup label={optgroup.text} key={optgroup.id}>
                  {
                    sectorsBanco[1]?.map((option) => (
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

          <button type="submit" value="submit" id='buttonEdit'>
            <FiSave />
          </button>
        </div>
      </form>
    </>
  );
};


