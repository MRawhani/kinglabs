/**
 * make query params string for data table options
 */

function dataTableQuery({ page, itemsPerPage, search }) {
	return `query=${search.trim()}&page=${page}&itemsPerPage=${itemsPerPage}`;
}

export { dataTableQuery };
