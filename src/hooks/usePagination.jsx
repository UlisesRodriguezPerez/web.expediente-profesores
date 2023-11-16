import { useEffect, useState } from "react";

const usePagination = (initialPage  = 1) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalItems, setTotalItems] = useState(0);



    // Logic to change  page and calculate total items
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };

    return {
        currentPage,
        setCurrentPage,
        totalItems,
        setTotalItems,
        handlePageChange,
    };
};

export default usePagination;
