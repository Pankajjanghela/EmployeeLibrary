import {
  useEffect,
  useMemo,
  useState
} from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AddBook from "./AddBook";
import BookList from "./BookList";
import SearchBook from "./SearchBook";
import IssueBook from "./IssueBook";
import ReturnBook from "./ReturnBook";
import Statistics from "./Statistics";
import Footer from "./Footer";

import "../CSS/Dashboard.css";


const defaultBooks = [
  {
    id: "B101",
    title: "Java Programming",
    author: "James Gosling",
    category: "Programming",
    quantity: 5,
    available: 5,
    status: "Available",
    issuedTo: "",
    employeeId: "",
    issueDate: ""
  },
  {
    id: "B102",
    title: "React JS",
    author: "Jordan Walke",
    category: "Frontend",
    quantity: 4,
    available: 4,
    status: "Available",
    issuedTo: "",
    employeeId: "",
    issueDate: ""
  },
  {
    id: "B103",
    title: "Node JS",
    author: "Ryan Dahl",
    category: "Backend",
    quantity: 3,
    available: 3,
    status: "Available",
    issuedTo: "",
    employeeId: "",
    issueDate: ""
  }
];


function Dashboard({ setIsLoggedIn }) {

  const [books, setBooks] = useState(() => {

    const savedBooks =
      localStorage.getItem("libraryBooks");

    if (savedBooks) {
      return JSON.parse(savedBooks);
    }

    return defaultBooks;

  });


  const [activePage, setActivePage] =
    useState("dashboard");


  const [searchTerm, setSearchTerm] =
    useState("");


  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);


  useEffect(() => {

    localStorage.setItem(
      "libraryBooks",
      JSON.stringify(books)
    );

  }, [books]);


  const filteredBooks = useMemo(() => {

    const term =
      searchTerm.trim().toLowerCase();

    if (!term) {
      return books;
    }

    return books.filter((book) =>

      book.id.toLowerCase().includes(term) ||

      book.title.toLowerCase().includes(term) ||

      book.author.toLowerCase().includes(term) ||

      book.category.toLowerCase().includes(term) ||

      (book.issuedTo || "")
        .toLowerCase()
        .includes(term)

    );

  }, [books, searchTerm]);


  const handleLogout = () => {

    localStorage.removeItem(
      "libraryLoggedIn"
    );

    localStorage.removeItem(
      "libraryUser"
    );

    setIsLoggedIn(false);

  };


  const userName =
    localStorage.getItem("libraryUser") ||
    "Admin";


  const pageTitles = {

    dashboard: "Dashboard",

    add: "Add Book",

    books: "Book List",

    issue: "Issue Book",

    return: "Return Book",

    statistics: "Statistics"

  };


  const renderPage = () => {

    switch (activePage) {

      case "add":

        return (
          <AddBook
            books={books}
            setBooks={setBooks}
          />
        );


      case "books":

        return (
          <>
            <SearchBook
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resultCount={filteredBooks.length}
            />

            <BookList
              books={filteredBooks}
              setBooks={setBooks}
            />
          </>
        );


      case "issue":

        return (
          <IssueBook
            books={books}
            setBooks={setBooks}
          />
        );


      case "return":

        return (
          <ReturnBook
            books={books}
            setBooks={setBooks}
          />
        );


      case "statistics":

        return (
          <Statistics
            books={books}
          />
        );


      case "dashboard":

      default:

        return (
          <>
            <Statistics
              books={books}
            />

            <SearchBook
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              resultCount={filteredBooks.length}
            />

            <BookList
              books={filteredBooks}
              setBooks={setBooks}
            />
          </>
        );

    }

  };


  return (

    <div className="app-shell">

      <Navbar
        userName={userName}
        onLogout={handleLogout}
        onMenuClick={() =>
          setIsSidebarOpen(true)
        }
      />


      <div className="layout">

        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          isOpen={isSidebarOpen}
          onClose={() =>
            setIsSidebarOpen(false)
          }
        />


        {isSidebarOpen && (

          <div
            className="sidebar-overlay"
            onClick={() =>
              setIsSidebarOpen(false)
            }
          />

        )}


        <main className="dashboard-content">

          <div className="page-heading">

            <div>

              <div className="breadcrumb">

                Employee Library
                {" / "}
                {pageTitles[activePage]}

              </div>

              <h1>
                {pageTitles[activePage]}
              </h1>

            </div>


            {activePage === "dashboard" && (

              <button
                className="primary-btn"
                onClick={() =>
                  setActivePage("add")
                }
              >
                + Add Book
              </button>

            )}

          </div>


          {renderPage()}

        </main>

      </div>


      <Footer />

    </div>

  );

}


export default Dashboard;