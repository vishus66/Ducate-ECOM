import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import Breadcrum from "../../Breadcrum"
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'

import { deleteNewsletter, getNewsletter } from "../../../Store/ActionCreators/NewsletterActionCreators"
export default function Newsletter() {
    let [data, setData] = useState([])

    let dispatch = useDispatch()
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: true,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 110,
            sortable: false,
            renderCell: ({ row }) => <button className='btn btn-danger' onClick={() => deleteRecord(row.id)}><i className='fa fa-trash'></i></button>
        }
    ];
    function deleteRecord(id) {
        if (window.confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteNewsletter({id:id}))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length)
            setData(NewsletterStateData)
    }
    useEffect(() => {
        getAPIData()
    }, [NewsletterStateData.length])
    return (
        <>
            <Breadcrum title="Admin" />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Sidebar />
                    </div>
                    <div className="col-9">
                        <h5 className='bg-primary text-light text-center p-2'>Newsletter</h5>
                        <div className="table-responsive">
                            <DataGrid
                                rows={data}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5, 10, 50, 100]}
                                checkboxSelection={false}
                                disableRowSelectionOnClick
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
