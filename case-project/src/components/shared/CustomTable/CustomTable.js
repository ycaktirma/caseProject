import { useState } from 'react';
import './CustomTable.css'

import eyePng from "../../../img/icons/eye.png";

/* Custom table with the abilities of paging, filtering, searching, importing and exporting data. It uses json data, keys are column names.*/
export function CustomTable({data, onDeleteSuccess, config = {}, filterCallback}){

    //If the data is empty, render no data view
    if(data === null || data === undefined){
        return(<h5>{config.noDataText}</h5>);
    }

    if(data.length === 0){
        return(<h5>{config.noDataText}</h5>);
    }

    const handleDelete = (id) => {
        onDeleteSuccess(id)
    };
    
    //Searching filter. Pass filterCriteria like that.
    /*
        Example;
        filterCriteria = {
            filters : [
                {columnName:'id', operator: '>=' value:25, valueType='string'},
            ]
        }
     */
    

    //Get the keys
    let columnNames = config.columnNames;
    return(
        <>
        <table className="table">
        <thead>
            <tr>
                {
                    //Display column names
                    columnNames.map((column=>(
                        <th key={column} scope="col">{column.toUpperCase()}</th>
                    )))
                }
                { config.showDelete &&
                    <th>Actions</th>
                }                
            </tr>
        </thead>
        <tbody>
            {   
                //Display rows(can be dynamic in the future. Works for now.)
                data.map((row)=>(
                <tr key={row.id.toString()}>
                    {Object.keys(row).map((key) => (
                        <td key={key}>{row[key]}</td>
                    ))}
                    <td>
                    { config.showDelete &&
                        <a className='btn btn-outline-danger btn-icon mx-1' onClick={() => handleDelete(row.id)} >
                            Delete
                        </a>
                    }
                    </td>
                </tr>
            ))
            }
        </tbody>
        </table>        
       
        </>
    );

}