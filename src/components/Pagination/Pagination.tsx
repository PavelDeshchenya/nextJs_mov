import { useEffect, useState } from "react";
import styles from "./Pagination.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SvgLeft from "./SvgArrow/SvgLeft";
import SvgRight from "./SvgArrow/SvgRight";
import { PaginationProps } from "../../types/types";

function Pagination({
  pagesCount,
  onPageChange,
  currentPage,
}: PaginationProps) {
  function CreatePageURL(pageNumber: number | string) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);
    pageNumber == "1"
      ? params.set("page", "1")
      : params.set("page", pageNumber.toString());

    return replace(`${pathname}?${params.toString()}`);
  }

  CreatePageURL(currentPage);

  const [visiblePages, setVisiblePages] = useState<number[]>([1, 2, 3]);

  useEffect(() => {
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + 2, pagesCount);
    const newVisiblePages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
    setVisiblePages(newVisiblePages);
  }, [currentPage, pagesCount]);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageItem}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <SvgLeft currentPage={currentPage} />
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={
            page === currentPage ? styles.pageItemActive : styles.pageItem
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pagesCount}
        className={styles.pageItem}
      >
        <SvgRight currentPage={currentPage} pagesCount={pagesCount} />
      </button>
    </div>
  );
}

export default Pagination;
