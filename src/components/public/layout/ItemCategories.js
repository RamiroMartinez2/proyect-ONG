import React from 'react'
import { NavLink as LinkRouterDom } from "react-router-dom";
import { useSelector } from 'react-redux';

const ItemCategories = () => {
    const {organization} = useSelector(state => ({ ...state }));

    return (
        <ul>
            {
            organization.activitiesData?.map(act => (
                <li key={act.id}><LinkRouterDom to={`/actividades/${act.id}`}>{act.name}</LinkRouterDom></li>
            ))
            }
        </ul>
    )
}

export default ItemCategories
