import React from 'react'

function PaginationPanel({currentPage, prevPage, totalPages, nextPage, goToPage}: {
    currentPage: number,
    prevPage: () => void, totalPages: number, nextPage: () => void, goToPage: (page: number) => void
}) {
  return (
    <div>
        <div style={{ marginTop: 20 }}>
          <button disabled={currentPage === 1} onClick={prevPage}>
            Prev
          </button>

          <span style={{ margin: "0 10px" }}>
            Page {currentPage} / {totalPages}
          </span>

          <button disabled={currentPage === totalPages} onClick={nextPage}>
            Next
          </button>
        </div>

        <div style={{ marginTop: 10 }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              style={{
                margin: 4,
                background: currentPage === i + 1 ? "#333" : "#eee",
                color: currentPage === i + 1 ? "#fff" : "#000",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
  )
}

export default PaginationPanel