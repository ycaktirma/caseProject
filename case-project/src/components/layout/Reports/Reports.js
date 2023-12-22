import { CustomTable } from '../../shared/CustomTable/CustomTable';
import { TitleWithTextCentered } from '../../shared/TitleWithText/TitleWithTextCentered';
import React, { useState, useEffect } from 'react';
import { httpGet } from "../../../services/HttpService";
import { exportToExcel } from "../../../services/ExcelService";
export function Report(){
    //Product data
    const [reports, setReports] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);

    const [searchInputValue, setSearchInputValue] = useState('');

    const reportsTableConfig = {
        noDataText: "Rapor bulunamadı.",
        columnNames: [ 'id', 'customer','product','monthly_consumption', 'monthly_cost'],
        showDelete: false,
        filteringEnabled: true
    }
/*
    const filterItems = (filters)=>{
        const filteredData = filters.reduce((d, f) => d.filter(f) , data)
        return filteredData;
    };
*/
    const filterDataByCustomer = ()=>{
        if(searchInputValue == ""){
            setFilteredReports(reports);
            return;
        }

        setFilteredReports(reports.filter((report)=> {return report.customer == searchInputValue } ))
    }

    const exportExcel = () => {
        let exportData = [] 
        // Extract values for each object
        const propertyValues = filteredReports.map(obj => Object.values(obj));

        // Combine property names and values
        exportData = [reportsTableConfig.columnNames, ...propertyValues];
        
        exportToExcel(exportData, "Reports")
    }

    const handleInputChange = (event) => {
        setSearchInputValue(event.target.value);
      };

    useEffect(() => {
        // Fetch customers when the component mounts
        httpGet('http://localhost:8002/reports/').then(response=>{
            setReports(response.data);
            setFilteredReports(response.data);
        }).catch(error=>{
            console.log("Error fetching reports", error);
        })
    }, []);

    return(
        <>
        <div className='container products'>
            <TitleWithTextCentered title={"Raporlar"} text={"Raporları görüntüleyin."}></TitleWithTextCentered>
            <div className='d-flex flex-row-reverse my-1'>
                <a className='btn btn-primary mx-1' onClick={exportExcel}>Export</a>
                <a className='btn btn-primary mx-1' onClick={filterDataByCustomer}>Ara</a>
                <input className='form-control mx-1' value={searchInputValue} onChange={handleInputChange} type="text" placeholder='Ada göre ara.'></input>
            </div>
            <CustomTable data={filteredReports} config={reportsTableConfig}></CustomTable>
        </div>
        </>
    );
}