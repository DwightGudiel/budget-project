import { useState, useEffect } from "react";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import ListExpenses from "./components/ListExpenses";
import FilterExpense from "./components/FilterExpenses";
import { Button } from "react-bootstrap";
import { object } from "prop-types";
import { generateId } from "./helpers";

function App() {
  // State
  const [budget, setBudget] = useState(
    Number(localStorage.getItem("budget")) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [expensesArray, setExpensesArray] = useState(
    localStorage.getItem("expensesArray")
      ? JSON.parse(localStorage.getItem("expensesArray"))
      : []
  );

  const [updatedExpenseObj, setUpdatedExpenseObj] = useState({});
  const [filter, setFilter] = useState("");
  const [filteredExpensesArray, setFilteredExpensesArray] = useState([]);

  // Guardar en el Local Storage
  useEffect(() => {
    localStorage.setItem("budget", budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expensesArray", JSON.stringify(expensesArray));
  }, [expensesArray]);

  /* Comprueba si el presupuesto está en el LS. Si lo está, muestra el componente ExpensePanel*/
  useEffect(() => {
    if (localStorage.getItem("budget") > 0) {
      setIsValidBudget(true);
    }
  }, []);

  /* Filtra los Gastos */
  useEffect(() => {
    if (filter) {
      // Retorna un areglo con gastos filtrados
      const filteredExpenses = expensesArray.filter(
        (expense) => expense.categories === filter
      );

      // Actualizar State
      setFilteredExpensesArray(filteredExpenses);
    }
  }, [filter]);

  // Abrir Modal
  const handleShow = () => {
    // Abrir Modal
    setOpenModal(true);
  };

  // Guardar los gastos introducidos por el usuario
  const saveExpenses = (expenseObj) => {
    if (Object.keys(expenseObj).length > 0) {
      // Editando un registro
      if (updatedExpenseObj.id) {
        const updatedExpensesArray = expensesArray.map((expense) =>
          expense.id === updatedExpenseObj.id ? expenseObj : expense
        );

        // Añadir Fecha
        expenseObj.date = Date.now();

        // Guardar gasto actualizado
        setExpensesArray(updatedExpensesArray);

        // Cerrar Modal
        setOpenModal(false);

        // Reinicar state
        setUpdatedExpenseObj({});
      } else {
        /* Añadiendo un nuevo registro */

        // Añadir id
        expenseObj.id = generateId();
        // Añadir Fecha
        expenseObj.date = Date.now();

        // Guardar nuevo gasto
        setExpensesArray([...expensesArray, expenseObj]);

        // Cerrar Modal
        setOpenModal(false);
      }
    }
  };

  // Eliminar un Gasto
  const deleteExpenses = (id) => {
    setExpensesArray(expensesArray.filter((expense) => expense.id !== id));
  };

  return (
    <>
      <Header
        // Props
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        setExpensesArray={setExpensesArray}
        expensesArray={expensesArray}
      />
      {isValidBudget && (
        <main>
          <FilterExpense
            // Props
            filter={filter}
            setFilter={setFilter}
          />

          <ListExpenses
            // Props
            expensesArray={expensesArray}
            setUpdatedExpenseObj={setUpdatedExpenseObj}
            setOpenModal={setOpenModal}
            deleteExpenses={deleteExpenses}
            filteredExpensesArray={filteredExpensesArray}
            filter={filter}
          />
          <Button
            onClick={handleShow}
            className="floating-button fs-5"
            variant="primary"
          >
            Añadir Nuevo Gasto
          </Button>
        </main>
      )}

      {openModal && (
        <ModalForm
          // Props
          setOpenModal={setOpenModal}
          openModal={openModal}
          saveExpenses={saveExpenses}
          updatedExpenseObj={updatedExpenseObj}
        />
      )}
    </>
  );
}

export default App;
