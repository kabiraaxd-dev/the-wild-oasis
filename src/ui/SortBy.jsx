import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";
function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || options[0].value; // Default to the first option if no sort is set

    function handleSortChange(event) {
        const selectedSort = event.target.value;
        // Update the search parameters with the selected sort option

        searchParams.set("sortBy", selectedSort);
        setSearchParams(searchParams);
    }

    return (
        <Select options={options} type="white" value={sortBy} onChange={handleSortChange} />
    )
}

SortBy.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};


export default SortBy;