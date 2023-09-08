import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FilterSort() {


    return (
        <>
            <form>
                <section>--FEATURE UNDER CONSTRUCTION--</section>
                <select>
                    <option>Date</option>
                    <option>Comment count</option>
                    <option>Votes</option>
                </select>
                <select>
                    <option>Descending</option>
                    <option>Ascending</option>
                </select>
                <button>Do!</button>
            </form>
        </>
    )
}

export default FilterSort;