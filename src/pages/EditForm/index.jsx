import "./index.css";
import { useEffect, useState } from "react";
import { api } from "../../services/api"
import { FormEdit } from "../../components/FormEdit";
import { Link } from "react-router-dom";

export function EditForm() {

    const [forms, setForms] = useState();
    const [sectors, setSectors] = useState();

    useEffect(() => {
        async function fetchBuscaPorData() {
          const response = await api.get(`/`);
          return (
            setForms(response.data)
          );
        }
        fetchBuscaPorData();
        
    },[])

    console.log(forms);

  return (
    <>
        <div className="editform">
            <Link to="/">Voltar</Link>

            <div className="formsEdit">
                {
                    forms &&
                    forms?.map((form) => (
                        <FormEdit
                            key={form.id}
                            id={form.id}
                            name={form.name}
                            sectors={form.sectors}
                        />
                    ))
                }
            </div>
        </div>
    </>
  );
}

